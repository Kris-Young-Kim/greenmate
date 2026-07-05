"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { useCart } from "@/lib/cart-store"
import { createOrder } from "@/app/actions/shop"
import { Button } from "@/components/ui/button"
import type { ShippingAddress } from "@/lib/db/schema"

declare global {
  interface Window {
    daum: any
  }
}

function AddressField({
  label,
  value,
  onChange,
  placeholder,
  readOnly,
  type = "text",
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  placeholder?: string
  readOnly?: boolean
  type?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 read-only:bg-secondary read-only:text-muted-foreground"
      />
    </div>
  )
}

export default function CheckoutPage() {
  const { isSignedIn, isLoaded } = useAuth()
  const { items, totalAmount } = useCart()
  const router = useRouter()
  const paymentWidgetRef = useRef<any>(null)
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const amount = totalAmount()

  const [addr, setAddr] = useState<ShippingAddress>({
    name: "",
    phone: "",
    zip: "",
    address: "",
    addressDetail: "",
  })

  const addrComplete =
    addr.name.trim() !== "" &&
    addr.phone.trim() !== "" &&
    addr.zip !== "" &&
    addr.address !== "" &&
    addr.addressDetail.trim() !== ""

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) { router.replace("/sign-in"); return }
    if (items.length === 0) { router.replace("/shop/cart"); return }

    async function initWidget() {
      const { loadPaymentWidget } = await import("@tosspayments/payment-widget-sdk")
      const widget = await loadPaymentWidget(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!,
        crypto.randomUUID(),
      )
      await widget.renderPaymentMethods("#payment-widget", { value: amount })
      await widget.renderAgreement("#agreement-widget")
      paymentWidgetRef.current = widget
      setReady(true)
    }

    initWidget()
  }, [isLoaded, isSignedIn, items.length, amount, router])

  function openPostcode() {
    const script = document.createElement("script")
    script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete(data: any) {
          setAddr((prev) => ({
            ...prev,
            zip: data.zonecode,
            address: data.roadAddress || data.jibunAddress,
          }))
        },
      }).open()
    }
    if (!window.daum) {
      document.head.appendChild(script)
    } else {
      new window.daum.Postcode({
        oncomplete(data: any) {
          setAddr((prev) => ({
            ...prev,
            zip: data.zonecode,
            address: data.roadAddress || data.jibunAddress,
          }))
        },
      }).open()
    }
  }

  const handlePay = async () => {
    if (!paymentWidgetRef.current || loading || !addrComplete) return
    setLoading(true)
    try {
      const order = await createOrder(items, addr)
      await paymentWidgetRef.current.requestPayment({
        orderId: order.tossOrderId,
        orderName:
          items.length === 1 ? items[0].name : `${items[0].name} 외 ${items.length - 1}건`,
        customerName: addr.name,
        successUrl: `${window.location.origin}/shop/success`,
        failUrl: `${window.location.origin}/shop/fail`,
      })
    } catch (err: any) {
      if (err?.code === "USER_CANCEL") { setLoading(false); return }
      alert("결제 중 오류가 발생했습니다. 다시 시도해주세요.")
      setLoading(false)
    }
  }

  if (!isLoaded || !isSignedIn) {
    return <div className="py-20 text-center text-muted-foreground">로딩 중...</div>
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">결제</h1>

      {/* Order Summary */}
      <div className="mb-6 rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-3 font-semibold">주문 내역</h2>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString()}원</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-border pt-3 font-bold">
          <span>총 결제금액</span>
          <span>{amount.toLocaleString()}원</span>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6 rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-4 font-semibold">배송지 정보</h2>
        <div className="space-y-4">
          <AddressField
            label="받는 분"
            value={addr.name}
            onChange={(v) => setAddr((p) => ({ ...p, name: v }))}
            placeholder="이름을 입력해주세요"
          />
          <AddressField
            label="연락처"
            value={addr.phone}
            onChange={(v) => setAddr((p) => ({ ...p, phone: v }))}
            placeholder="010-0000-0000"
            type="tel"
          />

          {/* 우편번호 + 주소 찾기 */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">주소</label>
            <div className="flex gap-2">
              <input
                readOnly
                value={addr.zip}
                placeholder="우편번호"
                className="w-32 rounded-xl border border-border bg-secondary px-4 py-3 text-base text-muted-foreground focus:outline-none"
              />
              <Button type="button" variant="outline" className="shrink-0" onClick={openPostcode}>
                주소 찾기
              </Button>
            </div>
            <input
              readOnly
              value={addr.address}
              placeholder="도로명 주소"
              className="mt-2 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-base text-muted-foreground focus:outline-none"
            />
            <input
              type="text"
              value={addr.addressDetail}
              onChange={(e) => setAddr((p) => ({ ...p, addressDetail: e.target.value }))}
              placeholder="상세 주소 (동/호수 등)"
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </div>

      {/* Toss Payment Widget */}
      <div className="rounded-2xl border border-border bg-card p-5">
        <div id="payment-widget" />
        <div id="agreement-widget" className="mt-4" />
        <Button
          className="mt-6 w-full"
          size="lg"
          onClick={handlePay}
          disabled={!ready || loading || !addrComplete}
        >
          {loading ? "처리 중..." : !addrComplete ? "배송지를 입력해주세요" : `${amount.toLocaleString()}원 결제하기`}
        </Button>
      </div>
    </main>
  )
}
