"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-store"
import { useToastStore } from "@/lib/toast-store"
import type { Product } from "@/lib/db/schema"

export function AddToCartButton({
  product,
  size = "sm",
}: {
  product: Product
  size?: "sm" | "default" | "lg"
}) {
  const addItem = useCart((s) => s.addItem)
  const addToast = useToastStore((s) => s.addToast)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
    })
    setAdded(true)
    addToast(`${product.name} 장바구니에 담겼어요!`)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Button size={size} onClick={handleAdd} variant={added ? "secondary" : "default"}>
      {added ? (
        <>
          <Check className="mr-1 size-4" />
          담김
        </>
      ) : (
        <>
          <ShoppingCart className="mr-1 size-4" />
          담기
        </>
      )}
    </Button>
  )
}
