import Link from "next/link"
import { Package, MapPin } from "lucide-react"
import { getMyOrders } from "@/app/actions/shop"
import { Button } from "@/components/ui/button"

const STATUS_LABEL: Record<string, string> = {
  pending: "결제 대기",
  paid: "결제 완료",
  cancelled: "취소됨",
}

const STATUS_CLASS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-secondary text-muted-foreground",
}

export default async function MyOrdersPage() {
  const orders = await getMyOrders()

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">주문 내역</h1>

      {orders.length === 0 ? (
        <div className="py-24 text-center">
          <Package className="mx-auto mb-4 size-12 text-muted-foreground" />
          <p className="text-muted-foreground">아직 주문 내역이 없습니다.</p>
          <Button className="mt-4" nativeButton={false} render={<Link href="/shop" />}>
            쇼핑하러 가기
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const addr = order.shippingAddress
            return (
              <div key={order.id} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      주문 번호:{" "}
                      <span className="font-mono text-xs">
                        {order.tossOrderId ?? `ORD-${order.id}`}
                      </span>
                    </p>
                    <p className="mt-0.5 text-lg font-bold">
                      {order.totalAmount.toLocaleString()}원
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      STATUS_CLASS[order.status] ?? "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {addr && (
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <MapPin className="size-3.5 text-primary" />
                      배송지
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {addr.name} · {addr.phone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ({addr.zip}) {addr.address} {addr.addressDetail}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
