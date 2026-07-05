import Link from "next/link"
import { Sprout } from "lucide-react"

const FOOTER_LINKS = [
  {
    title: "서비스",
    links: [
      { label: "홈", href: "/" },
      { label: "가드닝 가이드", href: "/guide" },
      { label: "그린마트", href: "/shop" },
      { label: "내 텃밭", href: "/dashboard" },
      { label: "주문 내역", href: "/my/orders" },
      { label: "AI 식물 상담", href: "/chat" },
    ],
  },
  {
    title: "가드닝 가이드",
    links: [
      { label: "초보자 가이드", href: "/guide?category=초보자" },
      { label: "모종 키우기", href: "/guide?category=모종" },
      { label: "식물별 재배법", href: "/guide?category=식물별" },
      { label: "계절별 가드닝", href: "/guide?category=계절별" },
      { label: "물주기 완전정복", href: "/guide?category=물주기" },
      { label: "병충해 대처법", href: "/guide?category=병충해" },
    ],
  },
  {
    title: "그린마트",
    links: [
      { label: "농산물", href: "/shop?category=농산물" },
      { label: "모종", href: "/shop?category=모종" },
      { label: "씨앗", href: "/shop?category=씨앗" },
      { label: "농기구", href: "/shop?category=농기구" },
      { label: "농자재", href: "/shop?category=농자재" },
      { label: "비료", href: "/shop?category=비료" },
    ],
  },
  {
    title: "고객지원",
    links: [
      { label: "공지사항", href: "/" },
      { label: "자주 묻는 질문", href: "/" },
      { label: "개인정보처리방침", href: "/" },
      { label: "이용약관", href: "/" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-bold text-foreground tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-border/60 pt-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sprout className="size-4" />
            </span>
            <span className="font-serif font-semibold text-foreground">GreenMate</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            © 2025 GreenMate. 대한민국 서버 운영 · 개인정보 보호
          </p>
        </div>
      </div>
    </footer>
  )
}
