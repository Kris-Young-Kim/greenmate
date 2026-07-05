"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"
import type { PlantLog } from "@/lib/db/schema"
import { deleteLog } from "@/app/actions/plants"

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })
}

function LogEntry({ log }: { log: PlantLog }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm("이 기록을 삭제할까요?")) return
    startTransition(() => deleteLog(log.id, log.plantId))
  }

  return (
    <div className="group relative flex gap-4">
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div className="mt-1 size-3 rounded-full border-2 border-primary bg-background ring-2 ring-background" />
        <div className="mt-1 w-px flex-1 bg-border" />
      </div>

      {/* Content */}
      <div className="mb-6 flex-1 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-primary">{formatDate(log.logDate)}</span>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="hidden text-muted-foreground transition-colors hover:text-destructive group-hover:block"
            aria-label="삭제"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
        <p className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">{log.memo}</p>
      </div>
    </div>
  )
}

export function GrowthTimeline({ logs }: { logs: PlantLog[] }) {
  if (logs.length === 0) {
    return (
      <div className="py-16 text-center text-muted-foreground">
        <p className="text-4xl mb-3">🌱</p>
        <p className="font-medium">아직 기록이 없어요</p>
        <p className="mt-1 text-sm">첫 번째 성장 기록을 남겨보세요!</p>
      </div>
    )
  }

  return (
    <div className="mt-6">
      {logs.map((log) => (
        <LogEntry key={log.id} log={log} />
      ))}
    </div>
  )
}
