import Link from "next/link"
import { cn } from "@/lib/utils"

interface SnbProps {
  items: { label: string; href: string }[]
  activeHref: string
  title?: string
}

export function Snb({ items, activeHref, title }: SnbProps) {
  return (
    <aside className="hidden lg:block w-44 shrink-0" aria-label="카테고리 메뉴">
      {title && (
        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {title}
        </p>
      )}
      <nav className="flex flex-col gap-0.5">
        {items.map((item) => {
          const isActive = activeHref === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-xl px-3 py-2.5 text-base font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
