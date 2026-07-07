import { AdminProductForm } from "@/components/admin-product-form"

export const metadata = { title: "새 상품 등록" }

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-2xl font-bold">새 상품 등록</h1>
      <AdminProductForm />
    </div>
  )
}
