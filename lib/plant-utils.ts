export const PLANT_TYPES = [
  "Lettuce",
  "Chili",
  "Tomato",
  "Cucumber",
  "Paprika",
] as const

export type PlantType = (typeof PLANT_TYPES)[number]

const PLANT_EMOJI: Record<string, string> = {
  Lettuce: "🥬",
  Chili: "🌶️",
  Tomato: "🍅",
  Cucumber: "🥒",
  Paprika: "🫑",
}

export function plantEmoji(type: string): string {
  return PLANT_EMOJI[type] ?? "🌱"
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/** Whole days elapsed since the planted date (day 1 = planting day). */
export function daysSincePlanted(plantedDate: string): number {
  const planted = startOfDay(new Date(plantedDate))
  const today = startOfDay(new Date())
  const diff = Math.floor((today.getTime() - planted.getTime()) / 86_400_000)
  return Math.max(diff, 0) + 1
}

export type WaterStatus = {
  label: string
  urgent: boolean
  neverWatered: boolean
}

export function waterStatus(lastWatered: Date | string | null): WaterStatus {
  if (!lastWatered) {
    return { label: "Not watered yet", urgent: true, neverWatered: true }
  }
  const last = startOfDay(new Date(lastWatered))
  const today = startOfDay(new Date())
  const days = Math.floor((today.getTime() - last.getTime()) / 86_400_000)

  if (days <= 0) return { label: "Watered today", urgent: false, neverWatered: false }
  if (days === 1) return { label: "Last watered: 1 day ago", urgent: false, neverWatered: false }
  if (days <= 2) return { label: `Last watered: ${days} days ago`, urgent: false, neverWatered: false }
  return { label: "Drying up!", urgent: true, neverWatered: false }
}

/** True when the plant has already been watered on the current calendar day. */
export function wateredToday(lastWatered: Date | string | null): boolean {
  if (!lastWatered) return false
  const last = startOfDay(new Date(lastWatered))
  const today = startOfDay(new Date())
  return last.getTime() === today.getTime()
}
