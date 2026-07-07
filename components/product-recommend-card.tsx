import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export type RecommendProduct = {
  id: number
  name: string
  description: string
  emoji: string
  lowestPrice: number
}

export function ProductRecommendCard({ product }: { product: RecommendProduct }) {
  return (
    <Link
      href={`/shop/${product.id}`}
      className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 shadow-sm transition-all hover:shadow-md hover:border-primary/40 hover:bg-primary/10"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-xl">
        {product.emoji}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-foreground">{product.name}</p>
        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          {product.description}
        </p>
        <p className="mt-1 text-sm font-bold text-primary">
          {product.lowestPrice.toLocaleString()}원~
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-bold text-primary-foreground">
        <ShoppingCart className="size-3" />
        구매
      </div>
    </Link>
  )
}
