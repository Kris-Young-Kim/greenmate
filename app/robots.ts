import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/shop/", "/guide/"],
        disallow: [
          "/dashboard",
          "/chat",
          "/my/",
          "/sign-in",
          "/sign-up",
          "/shop/cart",
          "/shop/checkout",
          "/shop/success",
          "/shop/fail",
          "/api/",
        ],
      },
    ],
    sitemap: "https://swgreen.shop/sitemap.xml",
  }
}
