import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GreenMate — 홈 가드닝 파트너",
    short_name: "GreenMate",
    description: "텃밭 새싹을 기록하고, 물 주기를 관리하고, AI 가드닝 조언을 받아보세요.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f0",
    theme_color: "#2D6A4F",
    orientation: "portrait",
    categories: ["lifestyle", "shopping", "health"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
