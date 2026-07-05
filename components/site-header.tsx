"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sprout, BookOpen, ShoppingBag, ChevronDown, ClipboardList } from "lucide-react"
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs"
import { useState, useRef } from "react"

import { Button } from "@/components/ui/button"
import { CartCount } from "@/components/cart-count"
import { cn } from "@/lib/utils"

const GUIDE_LNB = [
  { label: "전체 가이드",  href: "/guide" },
  { label: "모종 키우기",  href: "/guide?category=모종" },
  { label: "초보자 가이드", href: "/guide?category=초보자" },
  { label: "식물별 재배법", href: "/guide?category=식물별" },
  { label: "계절별 가드닝", href: "/guide?category=계절별" },
  { label: "물주기 완전정복", href: "/guide?category=물주기" },
  { label: "병충해 대처법", href: "/guide?category=병충해" },
]

const SHOP_LNB = [
  { label: "전체 상품", href: "/shop" },
  { label: "농산물",   href: "/shop?category=농산물" },
  { label: "모종",     href: "/shop?category=모종" },
  { label: "씨앗",     href: "/shop?category=씨앗" },
  { label: "농기구",   href: "/shop?category=농기구" },
  { label: "농자재",   href: "/shop?category=농자재" },
  { label: "비료",     href: "/shop?category=비료" },
]

function NavItemWithLNB({
  href,
  label,
  icon: Icon,
  lnb,
  isActive,
}: {
  href: string
  label: string
  icon: React.ElementType
  lnb: { label: string; href: string }[]
  isActive: boolean
}) {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(true)
  }
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <Link
        href={href}
        className={cn(
          "flex items-center gap-1.5 rounded-xl px-4 py-2 text-base font-medium transition-colors",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        )}
      >
        <Icon className="size-4" />
        {label}
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </Link>

      {/* LNB dropdown */}
      {open && (
        <div
          className="absolute left-0 top-full z-50 mt-1 min-w-44 rounded-2xl border border-border bg-card p-2 shadow-xl"
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          {lnb.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div
        className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 sm:px-6"
        style={{ height: "4.5rem" }}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sprout className="size-5" />
          </span>
          <span className="font-serif text-xl font-semibold text-foreground">GreenMate</span>
        </Link>

        {/* GNB + LNB */}
        <nav className="hidden items-center gap-1 sm:flex" aria-label="주요 메뉴">
          <NavItemWithLNB
            href="/guide"
            label="가드닝 가이드"
            icon={BookOpen}
            lnb={GUIDE_LNB}
            isActive={pathname.startsWith("/guide")}
          />
          <NavItemWithLNB
            href="/shop"
            label="그린마트"
            icon={ShoppingBag}
            lnb={SHOP_LNB}
            isActive={pathname.startsWith("/shop")}
          />
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <CartCount />

          <Show when="signed-out">
            <SignInButton>
              <Button variant="ghost" size="default" className="hidden text-base sm:inline-flex">
                로그인
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button size="default" className="hidden text-base sm:inline-flex">
                회원가입
              </Button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/my/orders"
              className={cn(
                "hidden items-center gap-1.5 rounded-xl px-4 py-2 text-base font-medium transition-colors sm:flex",
                pathname.startsWith("/my/orders")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <ClipboardList className="size-4" />
              주문 내역
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                "hidden items-center gap-1.5 rounded-xl px-4 py-2 text-base font-medium transition-colors sm:flex",
                pathname.startsWith("/dashboard")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <Sprout className="size-4" />
              내 텃밭
            </Link>
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  )
}
