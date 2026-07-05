import type { MetadataRoute } from "next"
import { getProducts } from "@/app/actions/shop"
import { guides } from "@/.velite"

const BASE = "https://swgreen.shop"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  return [
    { url: BASE,                changeFrequency: "weekly",  priority: 1.0, lastModified: new Date() },
    { url: `${BASE}/shop`,      changeFrequency: "daily",   priority: 0.9, lastModified: new Date() },
    { url: `${BASE}/guide`,     changeFrequency: "weekly",  priority: 0.8, lastModified: new Date() },
    ...products.map((p) => ({
      url: `${BASE}/shop/${p.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      lastModified: p.createdAt,
    })),
    ...guides.map((g) => ({
      url: `${BASE}/guide/${g.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      lastModified: new Date(g.publishedAt),
    })),
  ]
}
