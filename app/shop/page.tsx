import Link from "next/link"
import { getProducts } from "@/app/actions/shop"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductPlaceholder } from "@/components/product-placeholder"
import { SiteHeader } from "@/components/site-header"
import { Snb } from "@/components/snb"

const CATEGORIES = ["전체", "농산물", "모종", "씨앗", "농기구", "농자재", "비료"]

const SNB_ITEMS = [
  { label: "전체 상품", href: "/shop" },
  { label: "농산물",   href: "/shop?category=농산물" },
  { label: "모종",     href: "/shop?category=모종" },
  { label: "씨앗",     href: "/shop?category=씨앗" },
  { label: "농기구",   href: "/shop?category=농기구" },
  { label: "농자재",   href: "/shop?category=농자재" },
  { label: "비료",     href: "/shop?category=비료" },
]

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const products = await getProducts(category)

  const activeHref = category && category !== "전체"
    ? `/shop?category=${encodeURIComponent(category)}`
    : "/shop"

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex gap-8">
          {/* SNB */}
          <Snb items={SNB_ITEMS} activeHref={activeHref} title="카테고리" />

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">그린마트 🛒</h1>
              <p className="mt-1 text-muted-foreground">씨앗부터 농기구까지, 텃밭에 필요한 모든 것</p>
            </div>

            {/* Mobile category filter */}
            <div className="mb-6 flex flex-wrap gap-2 lg:hidden">
              {CATEGORIES.map((cat) => {
                const isActive = (!category && cat === "전체") || category === cat
                return (
                  <Link
                    key={cat}
                    href={cat === "전체" ? "/shop" : `/shop?category=${encodeURIComponent(cat)}`}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </Link>
                )
              })}
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                해당 카테고리에 상품이 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
                  >
                    <Link href={`/shop/${product.id}`} className="group flex-1">
                      <div className="flex items-center gap-3">
                        <ProductPlaceholder
                          size="sm"
                          src={product.id === 27 ? "/products/corn/mosatnonth.jpeg" : undefined}
                          alt={product.id === 27 ? product.name : undefined}
                        />
                        <div className="min-w-0">
                          <h3 className="line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                            {product.name}
                          </h3>
                          <span className="mt-0.5 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                            {product.category}
                          </span>
                        </div>
                      </div>
                      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </Link>
                    <div className="flex items-center justify-between pt-2">
                      {product.options && product.options.length > 0 ? (
                        <span className="text-sm text-muted-foreground">
                          {product.options.map((o) => o.price.toLocaleString() + "원").join(" / ")}
                        </span>
                      ) : (
                        <span className="text-lg font-bold">{product.price.toLocaleString()}원</span>
                      )}
                      {product.stock === 0 ? (
                        <span className="rounded-xl bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground">
                          품절
                        </span>
                      ) : product.options && product.options.length > 0 ? (
                        <Link
                          href={`/shop/${product.id}`}
                          className="inline-flex items-center gap-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          옵션 선택
                        </Link>
                      ) : (
                        <AddToCartButton product={product} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
