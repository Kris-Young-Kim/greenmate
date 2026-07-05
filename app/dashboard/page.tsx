import { Sprout } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { RegisterPlantDialog } from "@/components/register-plant-dialog"
import { PlantCard } from "@/components/plant-card"
import { getPlants } from "@/app/actions/plants"

export const dynamic = "force-dynamic"
export const metadata = { robots: { index: false, follow: false } }

export default async function DashboardPage() {
  const plants = await getPlants()

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl text-foreground text-balance">
              내 텃밭
            </h1>
            <p className="mt-1 text-muted-foreground">
              {plants.length > 0
                ? `오늘 ${plants.length}개의 새싹을 키우고 있어요.`
                : "첫 번째 새싹을 등록해보세요."}
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
      <h2 className="mt-5 font-serif text-xl text-foreground">아직 식물이 없어요</h2>
      <p className="mt-2 max-w-sm text-pretty text-muted-foreground">
        텃밭이 비어있어요. 첫 번째 새싹을 등록하고 성장과 물 주기를 기록해보세요.
      </p>
      <div className="mt-6">
        <RegisterPlantDialog />
      </div>
    </div>
  )
}
