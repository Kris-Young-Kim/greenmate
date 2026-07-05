import { cn } from "@/lib/utils"
import { calcPromo } from "@/lib/promo"
import type { ProductOption } from "@/lib/db/schema"

type Size = "sm" | "md" | "lg"

const SALE_CLASS: Record<Size, string> = {
  sm: "text-lg font-bold",
  md: "text-2xl font-black text-primary",
  lg: "text-3xl font-black text-primary",
}
const ORIG_CLASS: Record<Size, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
}
const BADGE_CLASS: Record<Size, string> = {
  sm: "text-[9px] px-1.5 py-0.5",
  md: "text-xs px-2 py-0.5",
  lg: "text-sm px-2.5 py-0.5",
}

export function PriceTag({ price, size = "md" }: { price: number; size?: Size }) {
  const { original, sale, rate } = calcPromo(price)
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className={cn("text-muted-foreground line-through", ORIG_CLASS[size])}>
          {original.toLocaleString()}원
        </span>
        <span className={cn("rounded-full bg-red-500 font-bold text-white", BADGE_CLASS[size])}>
          {rate}% 할인
        </span>
      </div>
      <span className={SALE_CLASS[size]}>{sale.toLocaleString()}원</span>
    </div>
  )
}

export function OptionPriceTag({ options, size = "md" }: { options: ProductOption[]; size?: Size }) {
  const { rate } = calcPromo(Math.min(...options.map((o) => o.price)))
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center gap-1.5">
        <span className={cn("rounded-full bg-red-500 font-bold text-white", BADGE_CLASS[size])}>
          최대 {rate}% 할인
        </span>
      </div>
      <span className={cn("text-muted-foreground", size === "sm" ? "text-sm" : "text-base")}>
        {options.map((o) => o.price.toLocaleString() + "원").join(" / ")}
      </span>
    </div>
  )
}
