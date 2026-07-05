"use client"

import Link from "next/link"
import { useTransition, useState } from "react"
import { Droplets, Check, MessageCircle, CalendarDays, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Plant } from "@/lib/db/schema"
import {
  plantEmoji,
  daysSincePlanted,
  waterStatus,
  wateredToday,
} from "@/lib/plant-utils"
import { waterPlant } from "@/app/actions/plants"

export function PlantCard({ plant }: { plant: Plant }) {
  const [isPending, startTransition] = useTransition()
  const [justWatered, setJustWatered] = useState(false)

  const done = wateredToday(plant.lastWatered) || justWatered
  const status = waterStatus(justWatered ? new Date() : plant.lastWatered)
  const day = daysSincePlanted(plant.plantedDate)

  function handleWater() {
    if (done) return
    setJustWatered(true)
    startTransition(async () => {
      try {
        await waterPlant(plant.id)
      } catch {
        setJustWatered(false)
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
                {plant.type}
              </Badge>
            </div>
          </div>
          <Badge
            variant="outline"
            className="gap-1 border-primary/30 text-primary"
          >
            <CalendarDays className="size-3" />
            Day {day}
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
              Watered Today
            </>
          ) : (
            <>
              <Droplets className="size-5" />
              Water Today
            </>
          )}
        </Button>
      </CardContent>

      <CardFooter className="bg-muted/40 p-0">
        <Button
          variant="ghost"
          nativeButton={false}
          className="h-11 w-full gap-2 rounded-none rounded-b-xl text-primary hover:bg-secondary/60"
          render={<Link href={`/chat?plantId=${plant.id}`} />}
        >
          <MessageCircle className="size-4" />
          Consult AI
        </Button>
      </CardFooter>
    </Card>
  )
}
