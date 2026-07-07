"use client"

import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductPlaceholder } from "@/components/product-placeholder"
import { SiteHeader } from "@/components/site-header"
import { useCart } from "@/lib/cart-store"
import { useToastStore } from "@/lib/toast-store"
import { SHIPPING_FEE } from "@/lib/constants"

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalAmount } = useCart()
  const addToast = useToastStore((s) => s.addToast)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <p className="mb-4 text-6xl">🛒</p>
          <h2 className="text-2xl font-semibold">장바구니가 비어 있어요</h2>
          <p className="mt-2 text-muted-foreground">마음에 드는 상품을 담아보세요!</p>
          <Button
            className="mt-8 h-14 px-8 text-base"
            nativeButton={false}
            render={<Link href="/shop" />}
          >
            그린마트 둘러보기
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="mb-6 text-2xl font-bold">장바구니</h1>

        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5"
            >
              <ProductPlaceholder size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-semibold">{item.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {item.price.toLocaleString()}원
                </p>
              </div>

              {/* Quantity controls — large touch targets */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-lg font-bold hover:bg-secondary active:scale-95 transition-transform"
                  aria-label="수량 줄이기"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-8 text-center text-base font-bold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="flex size-11 items-center justify-center rounded-xl border border-border bg-background text-lg font-bold hover:bg-secondary active:scale-95 transition-transform"
                  aria-label="수량 늘리기"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <p className="w-24 text-right text-base font-bold">
                {(item.price * item.quantity).toLocaleString()}원
              </p>

              <button
                onClick={() => {
                  removeItem(item.productId)
                  addToast(`${item.name} 삭제됐어요.`)
                }}
                className="flex size-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label={`${item.name} 삭제`}
              >
                <Trash2 className="size-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>상품금액</span>
              <span>{totalAmount().toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>배송비</span>
              <span>{SHIPPING_FEE.toLocaleString()}원</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xl font-bold">
            <span>합계</span>
            <span>{(totalAmount() + SHIPPING_FEE).toLocaleString()}원</span>
          </div>
          <Button
            className="mt-5 h-14 w-full text-base"
            size="lg"
            nativeButton={false}
            render={<Link href="/shop/checkout" />}
          >
            결제하기
          </Button>
          <Button
            variant="outline"
            className="mt-2 h-12 w-full text-base"
            nativeButton={false}
            render={<Link href="/shop" />}
          >
            쇼핑 계속하기
          </Button>
        </div>
      </main>
    </div>
  )
}
