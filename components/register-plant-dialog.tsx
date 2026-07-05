"use client"

import { useState, useTransition } from "react"
import { Sprout, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PLANT_TYPES, plantEmoji, plantDisplayName } from "@/lib/plant-utils"
import { createPlant } from "@/app/actions/plants"

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

export function RegisterPlantDialog() {
  const [open, setOpen] = useState(false)
  const [nickname, setNickname] = useState("")
  const [type, setType] = useState<string>("")
  const [plantedDate, setPlantedDate] = useState(todayISO())
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function reset() {
    setNickname("")
    setType("")
    setPlantedDate(todayISO())
    setError(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!nickname.trim()) return setError("식물 별명을 입력해주세요.")
    if (!type) return setError("식물 종류를 선택해주세요.")

    startTransition(async () => {
      try {
        await createPlant({ nickname, type, plantedDate })
        reset()
        setOpen(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했어요.")
      }
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) reset()
      }}
    >
      <DialogTrigger
        render={
          <Button size="lg" className="h-11 gap-2 px-5 text-base shadow-sm" />
        }
      >
        <Plus className="size-4" />
        새 식물 등록
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Sprout className="size-5" />
            </span>
            <DialogTitle className="font-serif text-lg">
              새 식물 등록하기
            </DialogTitle>
          </div>
          <DialogDescription>
            식물을 등록하고 성장과 물 주기를 기록해보세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-1">
          <div className="grid gap-2">
            <Label htmlFor="nickname">별명</Label>
            <Input
              id="nickname"
              placeholder="예: 베란다 상추"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="plant-type">식물 종류</Label>
            <Select value={type} onValueChange={(v) => setType(v as string)}>
              <SelectTrigger id="plant-type" className="h-9 w-full">
                <SelectValue placeholder="식물 종류 선택" />
              </SelectTrigger>
              <SelectContent>
                {PLANT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    <span className="mr-1">{plantEmoji(t)}</span>
                    {plantDisplayName(t)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="planted-date">심은 날짜</Label>
            <Input
              id="planted-date"
              type="date"
              max={todayISO()}
              value={plantedDate}
              onChange={(e) => setPlantedDate(e.target.value)}
              className="h-9"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <DialogFooter className="mt-2">
            <DialogClose render={<Button type="button" variant="outline" />}>
              취소
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "등록 중..." : "등록하기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
