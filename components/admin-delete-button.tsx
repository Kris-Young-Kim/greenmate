"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deleteProduct } from "@/app/actions/admin"

export function AdminDeleteButton({ id, name }: { id: number; name: string }) {
  const [pending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm(`"${name}" 상품을 삭제할까요? 되돌릴 수 없습니다.`)) return
    startTransition(() => deleteProduct(id))
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleDelete}
      disabled={pending}
      className="border-destructive/30 text-destructive hover:bg-destructive/10"
    >
      <Trash2 className="size-3" />
      {pending ? "삭제 중..." : "삭제"}
    </Button>
  )
}
