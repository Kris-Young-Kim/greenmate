"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-store"
import { useToastStore } from "@/lib/toast-store"
import { cn } from "@/lib/utils"
import type { ProductOption } from "@/lib/db/schema"

interface Props {
  productId: number
  productName: string
  options: ProductOption[]
}

export function ProductOptionSelector({ productId, productName, options }: Props) {
  const [selected, setSelected] = useState<ProductOption | null>(null)
  const addItem = useCart((s) => s.addItem)
  const addToast = useToastStore((s) => s.addToast)

  function handleAdd() {
    if (!selected) return
    addItem({
      productId,
      name: `${productName} ${selected.label}`,
      price: selected.price,
      emoji: "",
    })
    addToast(`${productName} ${selected.label} 장바구니에 담겼어요!`)
  }

  return (
    <div className="mt-6">
      <p className="mb-3 text-base font-semibold text-foreground">수량 선택</p>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => (
          <button
            key={opt.label}
            onClick={() => setSelected(opt)}
            className={cn(
              "flex flex-col items-start rounded-2xl border-2 px-5 py-3.5 text-left transition-all",
              selected?.label === opt.label
                ? "border-primary bg-primary/5 text-primary"
                : "border-border bg-background text-foreground hover:border-primary/50",
            )}
          >
            <span className="text-base font-bold">{opt.label}</span>
            <span className="text-sm font-semibold text-primary mt-0.5">
              {opt.price.toLocaleString()}원
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <p className="mt-3 text-sm text-muted-foreground">
          선택: {selected.label} · {selected.price.toLocaleString()}원
        </p>
      )}

      <Button
        size="lg"
        className="mt-5 h-14 w-full gap-2 text-base"
        disabled={!selected}
        onClick={handleAdd}
      >
        <ShoppingCart className="size-5" />
        {selected ? `${selected.label} 담기` : "수량을 선택해주세요"}
      </Button>
    </div>
  )
}
