import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MessageCircle, CalendarDays, Droplets } from "lucide-react"
import { auth } from "@clerk/nextjs/server"

import { getPlant, getLogs } from "@/app/actions/plants"
import { plantEmoji, plantDisplayName, daysSincePlanted, waterStatus } from "@/lib/plant-utils"
import { AddLogDialog } from "@/components/add-log-dialog"
import { GrowthTimeline } from "@/components/growth-timeline"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"

export default async function PlantDiaryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const { id } = await params
  const plantId = Number(id)
  if (isNaN(plantId)) notFound()

  const [plant, logs] = await Promise.all([getPlant(plantId), getLogs(plantId)])
  if (!plant) notFound()

  const status = waterStatus(plant.lastWatered)
  const day = daysSincePlanted(plant.plantedDate)

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        {/* Back */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          내 텃밭으로
        </Link>

        {/* Plant header */}
        <div className="mb-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-secondary text-4xl">
              {plantEmoji(plant.type)}
            </span>
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-2xl text-foreground">{plant.nickname}</h1>
              <Badge variant="secondary" className="mt-1">{plantDisplayName(plant.type)}</Badge>

              <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3.5 text-primary" />
                  심은 지 {day}일째
                </span>
                <span
                  className={`flex items-center gap-1 ${status.urgent ? "text-destructive font-medium" : ""}`}
                >
                  <Droplets className="size-3.5 text-primary" />
                  {status.label}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              nativeButton={false}
              render={<Link href={`/chat?plantId=${plant.id}`} />}
            >
              <MessageCircle className="size-3.5" />
              AI 상담
            </Button>
          </div>
        </div>

        {/* Diary section */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-serif text-xl text-foreground">성장 다이어리</h2>
          <AddLogDialog plantId={plant.id} />
        </div>

        <GrowthTimeline logs={logs} />
      </main>
    </div>
  )
}
