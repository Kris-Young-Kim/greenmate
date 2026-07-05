import Link from "next/link"
import { redirect } from "next/navigation"
import { MapPin } from "lucide-react"
import { confirmPaymentWithToss, getOrderByTossId } from "@/app/actions/shop"
import { CartClearer } from "@/components/cart-clearer"
import { Button } from "@/components/ui/button"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ paymentKey?: string; orderId?: string; amount?: string }>
}) {
  const { paymentKey, orderId, amount } = await searchParams

  if (!paymentKey || !orderId || !amount) {
    redirect("/shop")
  }

  let error: string | null = null
  try {
    await confirmPaymentWithToss(paymentKey, orderId, Number(amount))
  } catch (err: any) {
    error = err?.message ?? "결제 확인에 실패했습니다"
  }

  if (error) {
    return (
      <main className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <p className="mb-4 text-5xl">⚠️</p>
        <h1 className="text-xl font-semibold text-destructive">결제 오류</h1>
        <p className="mt-2 text-muted-foreground">{error}</p>
        <Button className="mt-6" nativeButton={false} render={<Link href="/shop/cart" />}>
          장바구니로 돌아가기
        </Button>
      </main>
    )
  }

  const order = await getOrderByTossId(orderId)
  const addr = order?.shippingAddress

  return (
    <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <CartClearer />

      <div className="text-center">
        <p className="mb-4 text-6xl">🌱</p>
        <h1 className="text-2xl font-bold">결제 완료!</h1>
        <p className="mt-2 text-muted-foreground">
          주문이 성공적으로 완료되었습니다.
          <br />
          텃밭에서 만나요!
        </p>
      </div>

      {addr && (
        <div className="mt-8 rounded-2xl border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold">
            <MapPin className="size-4 text-primary" />
            배송지 정보
          </div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">받는 분</dt>
              <dd className="font-medium">{addr.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">연락처</dt>
              <dd className="font-medium">{addr.phone}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="shrink-0 text-muted-foreground">주소</dt>
              <dd className="text-right font-medium">
                ({addr.zip}) {addr.address} {addr.addressDetail}
              </dd>
            </div>
          </dl>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Button nativeButton={false} render={<Link href="/my/orders" />}>
          주문 내역 보기
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/shop" />}>
          쇼핑 계속하기
        </Button>
      </div>
    </main>
  )
}
