"use client"

import dynamic from "next/dynamic"

const HeroAnimation = dynamic(
  () => import("@/components/hero-animation").then((m) => ({ default: m.HeroAnimation })),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-[8/5] w-full animate-pulse rounded-3xl bg-secondary/40" />
    ),
  },
)

export function HeroAnimationWrapper() {
  return <HeroAnimation />
}
