import Link from "next/link"
import { Sprout, ArrowRight, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { HeroAnimationWrapper } from "@/components/hero-animation-wrapper"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-5xl px-4 pb-24 pt-16 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy + CTA */}
          <div className="flex flex-col items-start gap-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Sprout className="size-4" />
              AI 식물 케어
            </span>

            <h1 className="font-serif text-4xl font-semibold text-foreground text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
              내 식물,<br />이젠 안 죽어
            </h1>

            <p className="max-w-md text-lg text-muted-foreground text-pretty leading-relaxed">
              AI 식물 전문가가 24시간 곁에 있어요. 물 주기부터 병충해 진단까지,
              GreenMate가 챙겨드립니다.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                size="lg"
                className="h-12 gap-2 px-7 text-base shadow-md"
                nativeButton={false}
                render={<Link href="/sign-up" />}
              >
                무료로 시작하기
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base"
                nativeButton={false}
                render={<Link href="/sign-in" />}
              >
                로그인
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              광고 없음 · 무료 시작 · 언제든 해지 가능
            </p>
          </div>

          {/* Right: Remotion animation */}
          <div className="w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-border/60">
            <HeroAnimationWrapper />
          </div>
        </div>
      </section>

      {/* ── Problem → Solution ───────────────────────────────────────────── */}
      <section className="bg-secondary/30 px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-foreground text-balance sm:text-4xl">
            식물 키우다 포기한 적 있으신가요?
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty leading-relaxed">
            바쁜 일상에 물 주기를 깜빡하고, 잎이 노래지는 이유를 몰라 답답하셨죠.
            GreenMate는 그 모든 고민을 대신 해결합니다.
          </p>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl text-foreground sm:text-4xl">
            GreenMate 하나로 전부 해결
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-2xl">
                  {f.emoji}
                </span>
                <h3 className="font-serif text-lg text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-primary px-4 py-24 text-center text-primary-foreground">
        <Leaf className="mx-auto mb-6 size-10 opacity-70" />
        <h2 className="font-serif text-3xl font-semibold text-balance sm:text-4xl">
          오늘부터 식물과 더 가까워지세요
        </h2>
        <p className="mt-4 text-primary-foreground/70">
          무료로 시작하고, 언제든 해지 가능합니다.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="mt-8 h-12 gap-2 px-8 text-base"
          nativeButton={false}
          render={<Link href="/sign-up" />}
        >
          무료로 시작하기
          <ArrowRight className="size-4" />
        </Button>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/70 bg-background px-4 py-8 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <Sprout className="size-4 text-primary" />
          <span className="font-serif font-semibold text-foreground">GreenMate</span>
        </div>
        <p className="mt-2">© 2025 GreenMate. 대한민국 서버 운영 · 개인정보 보호</p>
      </footer>
    </div>
  )
}

const FEATURES = [
  {
    emoji: "🌱",
    title: "식물 등록 & 성장 일지",
    desc: "키우는 식물을 등록하고, 성장 과정을 날짜별로 기록해보세요.",
  },
  {
    emoji: "💧",
    title: "스마트 물 주기 알림",
    desc: "식물 종류별 최적 주기를 계산해, 딱 맞는 타이밍에 알림을 보내드려요.",
  },
  {
    emoji: "🤖",
    title: "AI 식물 상담 채팅",
    desc: "잎색 변화, 벌레, 과습 등 무엇이든 AI 전문가에게 바로 물어보세요.",
  },
]
