import { notFound } from "next/navigation"
import { getProduct } from "@/app/actions/shop"
import { AdminProductForm } from "@/components/admin-product-form"

export const metadata = { title: "상품 수정" }

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProduct(Number(id))
  if (!product) notFound()

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-2xl font-bold">상품 수정</h1>
      <AdminProductForm product={product} />
    </div>
  )
}
