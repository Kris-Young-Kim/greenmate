"use client"

import Link from "next/link"
import { useTransition, useState } from "react"
import { Droplets, Check, MessageCircle, CalendarDays, AlertTriangle, BookOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Plant } from "@/lib/db/schema"
import {
  plantEmoji,
  plantDisplayName,
  daysSincePlanted,
  waterStatus,
  wateredToday,
} from "@/lib/plant-utils"
import { waterPlant } from "@/app/actions/plants"
import { useToastStore } from "@/lib/toast-store"

export function PlantCard({ plant }: { plant: Plant }) {
  const [isPending, startTransition] = useTransition()
  const [justWatered, setJustWatered] = useState(false)
  const addToast = useToastStore((s) => s.addToast)

  const done = wateredToday(plant.lastWatered) || justWatered
  const status = waterStatus(justWatered ? new Date() : plant.lastWatered)
  const day = daysSincePlanted(plant.plantedDate)

  function handleWater() {
    if (done) return
    setJustWatered(true)
    startTransition(async () => {
      try {
        await waterPlant(plant.id)
        addToast(`💧 ${plant.nickname} 물 주기 완료!`)
      } catch {
        setJustWatered(false)
        addToast("물 주기에 실패했어요.", "error")
      }
    })
  }

  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-2xl"
              aria-hidden="true"
            >
              {plantEmoji(plant.type)}
            </span>
            <div>
              <h3 className="font-serif text-lg leading-tight text-foreground">
                {plant.nickname}
              </h3>
              <Badge variant="secondary" className="mt-1">
                {plantDisplayName(plant.type)}
              </Badge>
            </div>
          </div>
          <Badge
            variant="outline"
            className="gap-1 border-primary/30 text-primary"
          >
            <CalendarDays className="size-3" />
            {day}일째
          </Badge>
        </div>

        <div
          className={cn(
            "flex items-center gap-1.5 text-sm",
            status.urgent ? "font-medium text-destructive" : "text-muted-foreground",
          )}
        >
          {status.urgent && <AlertTriangle className="size-3.5" />}
          {status.label}
        </div>

        <Button
          type="button"
          onClick={handleWater}
          disabled={done || isPending}
          size="lg"
          variant={done ? "secondary" : "default"}
          className={cn(
            "h-12 w-full gap-2 text-base transition-all",
            done
              ? "bg-secondary text-secondary-foreground"
              : "shadow-sm active:scale-[0.98]",
          )}
        >
          {done ? (
            <>
              <Check className="size-5" />
              오늘 물 줬어요
            </>
          ) : (
            <>
              <Droplets className="size-5" />
              물 주기
            </>
          )}
        </Button>
      </CardContent>

      <CardFooter className="bg-muted/40 p-0 divide-x divide-border">
        <Button
          variant="ghost"
          nativeButton={false}
          className="h-11 flex-1 gap-2 rounded-none rounded-bl-xl text-primary hover:bg-secondary/60"
          render={<Link href={`/dashboard/${plant.id}`} />}
        >
          <BookOpen className="size-4" />
          다이어리
        </Button>
        <Button
          variant="ghost"
          nativeButton={false}
          className="h-11 flex-1 gap-2 rounded-none rounded-br-xl text-primary hover:bg-secondary/60"
          render={<Link href={`/chat?plantId=${plant.id}`} />}
        >
          <MessageCircle className="size-4" />
          AI 상담
        </Button>
      </CardFooter>
    </Card>
  )
}
