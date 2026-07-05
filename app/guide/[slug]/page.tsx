import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, BookOpen } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { GuideBody } from "@/components/guide-body"
import { guides } from "@/.velite"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) return {}
  return {
    title: `${guide.title} — GreenMate 가이드`,
    description: guide.description,
  }
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params
  const guide = guides.find((g) => g.slug === slug)
  if (!guide) notFound()

  const publishedDate = new Date(guide.publishedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
        {/* Back button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/guide" />}
            className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="size-4" />
            가이드 목록
          </Button>
        </div>

        {/* Article header */}
        <header className="mb-10 pb-8 border-b border-border/70">
          <span className="text-5xl mb-5 block">{guide.emoji}</span>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <BookOpen className="size-3.5" />
              {guide.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <CalendarDays className="size-3.5" />
              {publishedDate}
            </span>
          </div>

          <h1 className="font-serif text-3xl text-foreground sm:text-4xl leading-tight">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {guide.description}
          </p>
        </header>

        {/* Article body */}
        <GuideBody content={guide.body} />

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl bg-primary/5 border border-primary/20 p-8 text-center">
          <p className="font-serif text-lg text-foreground mb-2">
            직접 키워보고 싶으신가요?
          </p>
          <p className="text-sm text-muted-foreground mb-5">
            GreenMate에서 식물을 등록하고 AI 전문가에게 물어보세요.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/sign-up" />}
            className="gap-2"
          >
            무료로 시작하기
          </Button>
        </div>

        {/* Bottom navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/guide" />}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            가이드 목록으로
          </Button>
        </div>
      </main>
    </div>
  )
}
