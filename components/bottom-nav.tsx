"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, ShoppingBag, Sprout, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/",           label: "홈",      icon: Home },
  { href: "/guide",      label: "가이드",   icon: BookOpen },
  { href: "/shop",       label: "그린마트", icon: ShoppingBag },
  { href: "/dashboard",  label: "내텃밭",   icon: Sprout },
  { href: "/my/orders",  label: "주문내역", icon: ClipboardList },
] as const

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/96 backdrop-blur sm:hidden"
      aria-label="하단 메뉴"
    >
      <div className="flex items-stretch">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href + "?")
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs font-semibold transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className={cn("size-6", isActive && "stroke-[2.5]")} />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
      {/* iOS safe area */}
      <div className="h-[env(safe-area-inset-bottom)] bg-background" />
    </nav>
  )
}
