"use client"

import { useRef, useState, useTransition } from "react"
import { PlusCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createLog } from "@/app/actions/plants"
import { useToastStore } from "@/lib/toast-store"

export function AddLogDialog({ plantId }: { plantId: number }) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const addToast = useToastStore((s) => s.addToast)
  const dateRef = useRef<HTMLInputElement>(null)
  const memoRef = useRef<HTMLTextAreaElement>(null)

  const today = new Date().toISOString().split("T")[0]

  function handleSubmit() {
    const logDate = dateRef.current?.value
    const memo = memoRef.current?.value?.trim()
    if (!logDate) { setError("날짜를 선택해주세요"); return }
    if (!memo) { setError("메모를 입력해주세요"); return }

    setError("")
    startTransition(async () => {
      try {
        await createLog({ plantId, logDate, memo })
        setOpen(false)
        if (memoRef.current) memoRef.current.value = ""
        addToast("📝 성장 기록이 저장됐어요!")
      } catch (e) {
        setError((e as Error).message)
      }
    })
  }

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="gap-2"
        size="lg"
      >
        <PlusCircle className="size-4" />
        기록 추가
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center">
      <div className="w-full max-w-md rounded-t-3xl bg-card p-6 shadow-xl sm:rounded-3xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg text-foreground">성장 기록 추가</h2>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">날짜</label>
            <input
              ref={dateRef}
              type="date"
              defaultValue={today}
              max={today}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">오늘의 메모</label>
            <textarea
              ref={memoRef}
              rows={4}
              placeholder="식물의 상태, 변화, 느낀 점을 기록해보세요."
              className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2 pt-1">
            <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button className="flex-1" onClick={handleSubmit} disabled={isPending}>
              {isPending ? "저장 중..." : "저장하기"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
