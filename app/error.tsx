"use client"

import { useEffect } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-lg flex-col items-center px-6 py-32 text-center">
        <span className="text-8xl" aria-hidden="true">🥀</span>
        <h1 className="mt-6 text-3xl font-bold">문제가 발생했어요</h1>
        <p className="mt-3 text-muted-foreground">
          일시적인 오류입니다. 잠시 후 다시 시도해주세요.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-muted-foreground/60">
            {error.digest}
          </p>
        )}
        <div className="mt-8 flex gap-3">
          <Button onClick={reset}>다시 시도</Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/" />}>
            홈으로
          </Button>
        </div>
      </main>
    </div>
  )
}
