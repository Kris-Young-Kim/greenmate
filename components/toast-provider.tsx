"use client"

import { X, Check, AlertCircle } from "lucide-react"
import { useToastStore } from "@/lib/toast-store"
import { cn } from "@/lib/utils"

export function ToastProvider() {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[200] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-3.5 shadow-xl text-base font-medium",
            "animate-in slide-in-from-bottom-3 fade-in duration-200",
            toast.type === "error"
              ? "bg-destructive text-destructive-foreground"
              : "bg-foreground text-background",
          )}
        >
          {toast.type === "error"
            ? <AlertCircle className="size-5 shrink-0" />
            : <Check className="size-5 shrink-0" />
          }
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="opacity-60 hover:opacity-100 transition-opacity"
            aria-label="닫기"
          >
            <X className="size-5" />
          </button>
        </div>
      ))}
    </div>
  )
}
