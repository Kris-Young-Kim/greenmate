import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = { robots: { index: false, follow: false } }

export default async function FailPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string; code?: string }>
}) {
  const { message, code } = await searchParams

  return (
    <main className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
      <p className="mb-4 text-5xl">😢</p>
      <h1 className="text-xl font-semibold">결제에 실패했습니다</h1>
      {message && <p className="mt-2 text-sm text-muted-foreground">{message}</p>}
      {code && <p className="mt-1 text-xs text-muted-foreground">오류 코드: {code}</p>}
      <Button
        className="mt-6"
        nativeButton={false}
        render={<Link href="/shop/cart" />}
      >
        장바구니로 돌아가기
      </Button>
    </main>
  )
}
