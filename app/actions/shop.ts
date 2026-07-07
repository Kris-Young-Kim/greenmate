"use server"

import { db } from "@/lib/db"
import { products, orders, orderItems } from "@/lib/db/schema"
import { eq, desc, asc } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import type { CartItem } from "@/lib/cart-store"
import type { ShippingAddress } from "@/lib/db/schema"
import { SHIPPING_FEE } from "@/lib/constants"

export async function getProducts(category?: string) {
  const rows = await db.select().from(products).orderBy(asc(products.sortOrder), asc(products.id))
  if (category && category !== "전체") {
    return rows.filter((p) => p.category === category)
  }
  return rows
}

export async function getProduct(id: number) {
  const [product] = await db.select().from(products).where(eq(products.id, id)).limit(1)
  return product ?? null
}

export async function createOrder(cartItems: CartItem[], shippingAddress: ShippingAddress) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const tossOrderId = crypto.randomUUID()
  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0) + SHIPPING_FEE

  const [order] = await db
    .insert(orders)
    .values({ userId, totalAmount: total, tossOrderId, status: "pending", shippingAddress })
    .returning()

  await db.insert(orderItems).values(
    cartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      productName: item.name,
    })),
  )

  return order
}

export async function confirmPaymentWithToss(
  paymentKey: string,
  tossOrderId: string,
  amount: number,
) {
  const res = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.TOSS_SECRET_KEY}:`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ paymentKey, orderId: tossOrderId, amount }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as any).message ?? "결제 확인에 실패했습니다")
  }

  await db
    .update(orders)
    .set({ status: "paid", paymentKey })
    .where(eq(orders.tossOrderId, tossOrderId))
}

export async function getOrderByTossId(tossOrderId: string) {
  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.tossOrderId, tossOrderId))
    .limit(1)
  return order ?? null
}

export async function getMyOrders() {
  const { userId } = await auth()
  if (!userId) return []

  return db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt))
}
