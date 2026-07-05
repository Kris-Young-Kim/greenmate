import { defineConfig, defineCollection, s } from "velite"

const guides = defineCollection({
  name: "Guide",
  pattern: "guides/**/*.md",
  schema: s
    .object({
      title: s.string().max(100),
      description: s.string().max(300),
      category: s.enum(["식물별", "계절별", "병충해", "물주기", "초보자"]),
      emoji: s.string().default("🌱"),
      publishedAt: s.isodate(),
      slug: s.path(),
      body: s.raw(),
    })
    .transform((data) => ({
      ...data,
      slug: data.slug.replace(/^guides\//, ""),
      url: `/guide/${data.slug.replace(/^guides\//, "")}`,
    })),
})

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6][ext]",
    clean: true,
  },
  collections: { guides },
})
