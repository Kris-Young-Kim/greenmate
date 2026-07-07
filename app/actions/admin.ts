"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { ProductOption } from "@/lib/db/schema"

export type { ProductOption }

export type ProductFormData = {
  name: string
  description: string
  price: number
  category: string
  emoji: string
  stock: number
  sortOrder: number
  options: ProductOption[]
}

async function assertAdmin() {
  const { userId } = await auth()
  if (!userId || userId !== process.env.ADMIN_USER_ID) {
    throw new Error("Unauthorized")
  }
}

function toDbValues(data: ProductFormData) {
  return {
    name: data.name,
    description: data.description,
    price: data.price,
    category: data.category,
    emoji: data.emoji,
    stock: data.stock,
    sortOrder: data.sortOrder,
    options: data.options.length > 0 ? data.options : null,
  }
}

export async function createProduct(data: ProductFormData) {
  await assertAdmin()
  await db.insert(products).values(toDbValues(data))
  revalidatePath("/shop")
  revalidatePath("/admin")
  redirect("/admin")
}

export async function updateProduct(id: number, data: ProductFormData) {
  await assertAdmin()
  await db.update(products).set(toDbValues(data)).where(eq(products.id, id))
  revalidatePath("/shop")
  revalidatePath(`/shop/${id}`)
  revalidatePath("/admin")
  redirect("/admin")
}

export async function deleteProduct(id: number) {
  await assertAdmin()
  await db.delete(products).where(eq(products.id, id))
  revalidatePath("/shop")
  revalidatePath("/admin")
}
