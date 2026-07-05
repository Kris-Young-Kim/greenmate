import Link from "next/link"
import { BookOpen, ArrowRight } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { guides } from "@/.velite"

export const metadata = {
  title: "가드닝 가이드 — GreenMate",
  description: "홈 가드닝 실전 가이드. 식물별 재배법부터 병충해 대처까지 전문가 정보를 무료로 읽어보세요.",
}

const CATEGORIES = ["전체", "초보자", "식물별", "계절별", "물주기", "병충해"] as const
type Category = (typeof CATEGORIES)[number]

const CATEGORY_COLORS: Record<string, string> = {
  초보자: "bg-green-100 text-green-800",
  식물별: "bg-lime-100 text-lime-800",
  계절별: "bg-sky-100 text-sky-800",
  물주기: "bg-blue-100 text-blue-800",
  병충해: "bg-orange-100 text-orange-800",
}

export default async function GuidePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const activeCategory: Category =
    CATEGORIES.includes(category as Category) ? (category as Category) : "전체"

  const filtered =
    activeCategory === "전체"
      ? guides
      : guides.filter((g) => g.category === activeCategory)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-primary font-medium mb-3">
            <BookOpen className="size-4" />
            가드닝 가이드
          </div>
          <h1 className="font-serif text-3xl text-foreground sm:text-4xl">
            홈 가드닝 완전 정복
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            식물 재배법부터 병충해 대처까지, 전문가의 실전 노하우를 무료로 읽어보세요.
          </p>
        </div>

        {/* Category filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={cat === "전체" ? "/guide" : `/guide?category=${cat}`}
              className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Guide grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">
            해당 카테고리의 가이드가 없어요.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((guide) => (
              <Link
                key={guide.slug}
                href={guide.url}
                className="group flex flex-col gap-3 rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="text-3xl">{guide.emoji}</span>

                <div className="flex-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 ${
                      CATEGORY_COLORS[guide.category] ?? "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {guide.category}
                  </span>
                  <h2 className="font-serif text-lg text-foreground leading-snug group-hover:text-primary transition-colors">
                    {guide.title}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {guide.description}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-medium text-primary">
                  읽기
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
