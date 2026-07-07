import Link from "next/link"
import { Plus, Pencil } from "lucide-react"
import { getProducts } from "@/app/actions/shop"
import { Button } from "@/components/ui/button"
import { AdminDeleteButton } from "@/components/admin-delete-button"

export const metadata = { title: "관리자 — 상품 관리" }

export default async function AdminPage() {
  const products = await getProducts()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">상품 관리</h1>
        <Button nativeButton={false} render={<Link href="/admin/products/new" />}>
          <Plus className="size-4" />
          새 상품
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium">ID</th>
              <th className="px-4 py-3 text-left font-medium">상품</th>
              <th className="px-4 py-3 text-left font-medium">카테고리</th>
              <th className="px-4 py-3 text-right font-medium">가격</th>
              <th className="px-4 py-3 text-right font-medium">재고</th>
              <th className="px-4 py-3 text-right font-medium">순서</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-secondary/40">
                <td className="px-4 py-3 text-muted-foreground">{p.id}</td>
                <td className="px-4 py-3">
                  <span className="mr-2">{p.emoji}</span>
                  <span className="font-medium">{p.name}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3 text-right">
                  {p.options?.length
                    ? `${Math.min(...p.options.map((o) => o.price)).toLocaleString()}원~`
                    : `${p.price.toLocaleString()}원`}
                </td>
                <td className="px-4 py-3 text-right">{p.stock}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{p.sortOrder}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      nativeButton={false}
                      render={<Link href={`/admin/products/${p.id}/edit`} />}
                    >
                      <Pencil className="size-3" />
                      수정
                    </Button>
                    <AdminDeleteButton id={p.id} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="py-16 text-center text-muted-foreground">등록된 상품이 없습니다.</p>
        )}
      </div>
    </div>
  )
}
