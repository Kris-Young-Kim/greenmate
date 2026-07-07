"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createProduct, updateProduct, type ProductFormData, type ProductOption } from "@/app/actions/admin"
import type { Product } from "@/lib/db/schema"

const CATEGORIES = ["농산물", "모종", "씨앗", "농기구", "농자재", "비료"]

const EMPTY: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  category: "씨앗",
  emoji: "🌱",
  stock: 0,
  sortOrder: 100,
  options: [],
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  )
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"

export function AdminProductForm({ product }: { product?: Product }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const [form, setForm] = useState<ProductFormData>(
    product
      ? {
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          emoji: product.emoji,
          stock: product.stock,
          sortOrder: product.sortOrder ?? 100,
          options: (product.options as ProductOption[]) ?? [],
        }
      : EMPTY,
  )

  function set<K extends keyof ProductFormData>(key: K, value: ProductFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function addOption() {
    set("options", [...form.options, { label: "", price: 0 }])
  }

  function updateOption(i: number, field: keyof ProductOption, value: string | number) {
    set(
      "options",
      form.options.map((o, idx) => (idx === i ? { ...o, [field]: value } : o)),
    )
  }

  function removeOption(i: number) {
    set("options", form.options.filter((_, idx) => idx !== i))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    startTransition(async () => {
      if (product) {
        await updateProduct(product.id, form)
      } else {
        await createProduct(form)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Field label="이모지">
          <input
            className={inputCls}
            value={form.emoji}
            onChange={(e) => set("emoji", e.target.value)}
            required
          />
        </Field>
        <Field label="카테고리">
          <select
            className={inputCls}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="상품명">
        <input
          className={inputCls}
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          required
        />
      </Field>

      <Field label="설명">
        <textarea
          className={inputCls + " min-h-24 resize-none"}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          required
        />
      </Field>

      <div className="grid grid-cols-3 gap-4">
        <Field label="기본 가격 (원)">
          <input
            type="number"
            className={inputCls}
            value={form.price}
            onChange={(e) => set("price", Number(e.target.value))}
            min={0}
          />
        </Field>
        <Field label="재고">
          <input
            type="number"
            className={inputCls}
            value={form.stock}
            onChange={(e) => set("stock", Number(e.target.value))}
            min={0}
          />
        </Field>
        <Field label="정렬 순서">
          <input
            type="number"
            className={inputCls}
            value={form.sortOrder}
            onChange={(e) => set("sortOrder", Number(e.target.value))}
          />
        </Field>
      </div>

      {/* 옵션 (선택 사항) */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium">
            옵션
            <span className="ml-1.5 text-xs text-muted-foreground">
              (옵션이 있으면 기본 가격 대신 옵션 가격으로 표시됩니다)
            </span>
          </label>
          <button
            type="button"
            onClick={addOption}
            className="flex items-center gap-1 text-xs text-primary hover:underline"
          >
            <Plus className="size-3" /> 옵션 추가
          </button>
        </div>

        {form.options.length > 0 && (
          <div className="space-y-2">
            {form.options.map((opt, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className={inputCls + " flex-1"}
                  placeholder="옵션명 (예: 30개)"
                  value={opt.label}
                  onChange={(e) => updateOption(i, "label", e.target.value)}
                />
                <input
                  type="number"
                  className={inputCls + " w-36"}
                  placeholder="가격"
                  value={opt.price}
                  onChange={(e) => updateOption(i, "price", Number(e.target.value))}
                  min={0}
                />
                <button
                  type="button"
                  onClick={() => removeOption(i)}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground hover:border-destructive/50 hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1" disabled={pending}>
          {pending ? "저장 중..." : product ? "수정 완료" : "상품 등록"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin")}
          disabled={pending}
        >
          취소
        </Button>
      </div>
    </form>
  )
}
