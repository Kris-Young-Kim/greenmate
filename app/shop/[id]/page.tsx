import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ChevronLeft, MapPin, Leaf, Flame, Clock, Star,
  Truck, ShieldCheck, CheckCircle2, Sprout, Wheat,
} from "lucide-react"
import { getProduct } from "@/app/actions/shop"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductOptionSelector } from "@/components/product-option-selector"
import { ProductPlaceholder } from "@/components/product-placeholder"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

// ── 강원도찰옥수수 전용 상세 페이지 ──────────────────────────────────────
function CornDetailPage({ product }: { product: NonNullable<Awaited<ReturnType<typeof getProduct>>> }) {
  const hasOptions = product.options && product.options.length > 0

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 space-y-4">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          상품 목록
        </Link>

        {/* ① 히어로 */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          {/* 그라디언트 배경 */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a4a1a] via-[#2d6a2d] to-[#4a8a1a]" />
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(ellipse at 10% 90%, #f59e0b55, transparent 60%), radial-gradient(ellipse at 90% 10%, #84cc1655, transparent 60%)" }} />

          <div className="relative flex flex-col items-center px-8 py-10 text-center sm:flex-row sm:text-left sm:gap-8">
            {/* 이모지 + 반짝 */}
            <div className="relative shrink-0">
              <div className="flex size-36 items-center justify-center rounded-[2rem] bg-white/10 backdrop-blur-sm shadow-inner text-8xl select-none sm:size-44 sm:text-9xl">
                🌽
              </div>
              <span className="absolute -top-2 -right-2 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black text-amber-900 shadow">
                SUPER FOOD
              </span>
            </div>

            <div className="mt-6 sm:mt-0">
              <span className="inline-block rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold text-white/80 backdrop-blur-sm">
                농산물 · 미백2호 품종
              </span>
              <h1 className="mt-2 text-3xl font-black text-white leading-tight">
                강원도찰옥수수<br className="sm:hidden" />
                <span className="text-amber-300"> 미백2호</span>
              </h1>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                해발 700m 강원도 청정 고랭지에서<br />당일 수확 후 바로 발송합니다.
              </p>

              {/* 맛 5종 태그 */}
              <div className="mt-4 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                {["고소", "촉촉", "찰", "쫄깃", "달달"].map((t) => (
                  <span key={t}
                    className="rounded-full border border-amber-300/50 bg-amber-400/20 px-3 py-0.5 text-xs font-bold text-amber-200">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ② 원산지·품종 4 카드 */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: MapPin,   label: "원산지",   value: "강원도 고랭지",    sub: "해발 700m+" },
            { icon: Star,     label: "품종",     value: "미백2호",          sub: "순백의 찰옥수수" },
            { icon: Leaf,     label: "재배",     value: "친환경 농법",      sub: "GAP 인증" },
            { icon: Clock,    label: "발송",     value: "당일 수확 발송",   sub: "오전 수확 → 오후 출고" },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label}
              className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-card p-4 text-center shadow-sm">
              <Icon className="size-5 text-primary" />
              <span className="text-[10px] text-muted-foreground">{label}</span>
              <span className="text-sm font-bold leading-tight">{value}</span>
              <span className="text-[10px] text-muted-foreground">{sub}</span>
            </div>
          ))}
        </div>

        {/* ③ 상품 소개 */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-bold">상품 소개</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">강원도찰옥수수 미백2호</strong>는 순백의 껍질과
            쫄깃하고 달콤한 찰진 식감으로 사랑받는 프리미엄 품종입니다. 일교차가 크고 일조량이
            풍부한 강원도 청정 고랭지에서 재배해 당도가 자연스럽게 높으며, 수분이 풍부해 식감이
            촉촉합니다.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            식이섬유가 풍부해 소화 건강에도 좋고, 비타민 B군·철분·마그네슘 등 다양한 영양소를
            함유한 <em className="not-italic font-semibold text-green-600">슈퍼푸드</em>로
            주목받고 있습니다. 수확 당일 선별·포장하여 발송하므로 산지의 신선함이 그대로
            식탁에 전달됩니다.
          </p>
        </div>

        {/* ④ 맛 특징 — 5가지 */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
          <h2 className="text-base font-bold text-amber-900">미백2호만의 맛</h2>
          <div className="mt-4 grid grid-cols-5 gap-2 text-center">
            {[
              { emoji: "🥜", word: "고소", desc: "구수한 향" },
              { emoji: "💧", word: "촉촉", desc: "풍부한 수분" },
              { emoji: "🍡", word: "찰", desc: "차진 식감" },
              { emoji: "🦷", word: "쫄깃", desc: "탄력 있는 알" },
              { emoji: "🍯", word: "달달", desc: "자연 당도" },
            ].map(({ emoji, word, desc }) => (
              <div key={word} className="flex flex-col items-center gap-1">
                <span className="text-2xl">{emoji}</span>
                <span className="text-sm font-black text-amber-800">{word}</span>
                <span className="text-[10px] text-amber-700/70">{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ⑤ 2단계 선별 과정 */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-bold">2단계 철저한 선별 과정</h2>
          <p className="mt-1 text-xs text-muted-foreground">높은 품질 기준을 통과한 옥수수만 출하합니다</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { emoji: "💧", step: "1차", title: "수분 체크",    desc: "최적 수분 함량 확인" },
              { emoji: "🌿", step: "1차", title: "영양제 관리",  desc: "균형 잡힌 영양 공급" },
              { emoji: "🛡️", step: "2차", title: "병충해 점검",  desc: "꼼꼼한 외관 검수" },
              { emoji: "⚖️", step: "2차", title: "크기·중량",    desc: "규격 미달품 제거" },
            ].map(({ emoji, step, title, desc }) => (
              <div key={title} className="rounded-xl bg-secondary/50 p-3 text-center">
                <span className="text-2xl">{emoji}</span>
                <p className="mt-1 text-[10px] font-semibold text-primary">{step} 선별</p>
                <p className="text-xs font-bold">{title}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ⑥ 슈퍼푸드·영양 정보 */}
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Sprout className="size-5 text-green-600" />
            <h2 className="text-base font-bold text-green-800">슈퍼푸드 영양 정보</h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { icon: Wheat,         label: "식이섬유",      value: "풍부",       note: "장 건강·소화 촉진" },
              { icon: Star,          label: "비타민 B군",    value: "함유",       note: "에너지 대사 지원" },
              { icon: CheckCircle2,  label: "철분·마그네슘", value: "함유",       note: "빈혈 예방·근육 건강" },
              { icon: Leaf,          label: "칼로리",        value: "낮음",       note: "다이어트 식품" },
              { icon: Flame,         label: "항산화",        value: "루테인",     note: "눈 건강·노화 방지" },
              { icon: Sprout,        label: "글루텐",        value: "FREE",       note: "글루텐 불내증 안전" },
            ].map(({ icon: Icon, label, value, note }) => (
              <div key={label} className="flex items-start gap-2 rounded-xl bg-white/60 p-3">
                <Icon className="mt-0.5 size-4 shrink-0 text-green-600" />
                <div>
                  <p className="text-xs font-bold text-green-900">{label}</p>
                  <p className="text-sm font-black text-green-700">{value}</p>
                  <p className="text-[10px] text-green-600/80">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ⑦ 조리 가이드 */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-base font-bold">이렇게 즐기세요</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { emoji: "🍳", method: "삶기",    tip: "끓는 물에 소금+설탕 약간\n20~25분" },
              { emoji: "🥢", method: "찌기",    tip: "찜기에 20분\n찰진 식감 그대로" },
              { emoji: "🔥", method: "굽기",    tip: "에어프라이어 200℃\n15분 → 고소한 향" },
              { emoji: "🍵", method: "옥수수차", tip: "수염·껍질을 물 2L\n15분 끓이면 완성" },
            ].map(({ emoji, method, tip }) => (
              <div key={method}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-border p-4 text-center">
                <span className="text-3xl">{emoji}</span>
                <span className="text-sm font-bold">{method}</span>
                <span className="whitespace-pre-line text-[11px] text-muted-foreground leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ⑧ 배송·신선도 보장 */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <Truck className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm font-bold">당일 수확 발송</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                오전 수확 → 오후 출고 (주문 마감 오전 10시).<br />
                산지 직송으로 보통 1~2일 내 도착합니다.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-green-600" />
            <div>
              <p className="text-sm font-bold text-green-800">신선도 보장</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                수령 후 신선도가 미흡하면 사진과 함께<br />
                문의 주세요. 교환·환불 도와드립니다.
              </p>
            </div>
          </div>
        </div>

        {/* ⑨ 옵션 선택 + 구매 */}
        <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-muted-foreground">{product.category}</span>
            {product.stock > 0
              ? <span className="text-xs font-medium text-green-600">재고 있음 ({product.stock}개)</span>
              : <span className="text-xs font-medium text-red-500">품절</span>
            }
          </div>

          {hasOptions ? (
            <ProductOptionSelector
              productId={product.id}
              productName={product.name}
              options={product.options!}
            />
          ) : (
            <>
              <p className="mt-2 text-2xl font-black text-primary">{product.price.toLocaleString()}원</p>
              <div className="mt-4 flex gap-3">
                <AddToCartButton product={product} size="default" />
                <Button variant="outline" nativeButton={false} render={<Link href="/shop/cart" />}>
                  장바구니 보기
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

// ── 일반 상품 레이아웃 ──────────────────────────────────────────────────
function GenericDetailPage({ product }: { product: NonNullable<Awaited<ReturnType<typeof getProduct>>> }) {
  const hasOptions = product.options && product.options.length > 0

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          href="/shop"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="size-4" />
          상품 목록
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex items-start gap-6">
            <ProductPlaceholder size="lg" />
            <div className="flex-1">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                {product.category}
              </span>
              <h1 className="mt-2 text-2xl font-bold">{product.name}</h1>
              {!hasOptions && (
                <p className="mt-1 text-2xl font-semibold text-primary">
                  {product.price.toLocaleString()}원
                </p>
              )}
              {hasOptions && (
                <p className="mt-1 text-base text-muted-foreground">
                  {product.options!.map((o) => `${o.label} ${o.price.toLocaleString()}원`).join(" / ")}
                </p>
              )}
            </div>
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>
          <p className="mt-3 text-sm text-muted-foreground">재고: {product.stock}개</p>

          {hasOptions ? (
            <ProductOptionSelector
              productId={product.id}
              productName={product.name}
              options={product.options!}
            />
          ) : (
            <div className="mt-8 flex gap-3">
              <AddToCartButton product={product} size="default" />
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/shop/cart" />}
              >
                장바구니 보기
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// ── 라우트 엔트리 ───────────────────────────────────────────────────────
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(Number(id))
  if (!product) notFound()

  if (product.id === 27) return <CornDetailPage product={product} />
  return <GenericDetailPage product={product} />
}
