import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto flex max-w-lg flex-col items-center px-6 py-32 text-center">
        <span className="text-8xl" aria-hidden="true">🌱</span>
        <h1 className="mt-6 text-3xl font-bold">페이지를 찾을 수 없어요</h1>
        <p className="mt-3 text-muted-foreground">
          주소가 잘못됐거나 삭제된 페이지입니다.
        </p>
        <div className="mt-8 flex gap-3">
          <Button nativeButton={false} render={<Link href="/" />}>
            홈으로
          </Button>
          <Button variant="outline" nativeButton={false} render={<Link href="/shop" />}>
            그린마트 보기
          </Button>
        </div>
      </main>
    </div>
  )
}
