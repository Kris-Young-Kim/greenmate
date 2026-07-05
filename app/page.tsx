import { Sprout } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { RegisterPlantDialog } from "@/components/register-plant-dialog"
import { PlantCard } from "@/components/plant-card"
import { getPlants } from "@/app/actions/plants"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const plants = await getPlants()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl text-foreground text-balance">
              Your Garden
            </h1>
            <p className="mt-1 text-muted-foreground">
              {plants.length > 0
                ? `Tracking ${plants.length} ${plants.length === 1 ? "seedling" : "seedlings"} today.`
                : "Start by registering your first seedling."}
            </p>
          </div>
          <RegisterPlantDialog />
        </div>

        <div className="mt-8">
          {plants.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {plants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-20 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        <Sprout className="size-8" />
      </span>
      <h2 className="mt-5 font-serif text-xl text-foreground">No plants yet</h2>
      <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
        Your garden is waiting. Register your first seedling to begin tracking
        its growth and watering schedule.
      </p>
      <div className="mt-6">
        <RegisterPlantDialog />
      </div>
    </div>
  )
}
