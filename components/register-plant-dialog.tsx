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
import { PLANT_TYPES, plantEmoji } from "@/lib/plant-utils"
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
    if (!nickname.trim()) return setError("Please give your plant a nickname.")
    if (!type) return setError("Please choose a plant type.")

    startTransition(async () => {
      try {
        await createPlant({ nickname, type, plantedDate })
        reset()
        setOpen(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.")
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
        Register New Plant
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Sprout className="size-5" />
            </span>
            <DialogTitle className="font-serif text-lg">
              Register a New Plant
            </DialogTitle>
          </div>
          <DialogDescription>
            Add a seedling to your garden and start tracking its journey.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-1">
          <div className="grid gap-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              placeholder="e.g. Veranda Lettuce"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="plant-type">Plant Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as string)}>
              <SelectTrigger id="plant-type" className="h-9 w-full">
                <SelectValue placeholder="Choose a plant type" />
              </SelectTrigger>
              <SelectContent>
                {PLANT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    <span className="mr-1">{plantEmoji(t)}</span>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="planted-date">Planted Date</Label>
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
              Cancel
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Planting..." : "Add Plant"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
