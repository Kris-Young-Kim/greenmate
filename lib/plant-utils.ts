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

const PLANT_DISPLAY_NAME: Record<string, string> = {
  Lettuce: "상추",
  Chili: "고추",
  Tomato: "토마토",
  Cucumber: "오이",
  Paprika: "파프리카",
}

export function plantEmoji(type: string): string {
  return PLANT_EMOJI[type] ?? "🌱"
}

export function plantDisplayName(type: string): string {
  return PLANT_DISPLAY_NAME[type] ?? type
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
    return { label: "아직 물을 안 줬어요", urgent: true, neverWatered: true }
  }
  const last = startOfDay(new Date(lastWatered))
  const today = startOfDay(new Date())
  const days = Math.floor((today.getTime() - last.getTime()) / 86_400_000)

  if (days <= 0) return { label: "오늘 물 줬어요", urgent: false, neverWatered: false }
  if (days === 1) return { label: "1일 전에 물 줬어요", urgent: false, neverWatered: false }
  if (days <= 2) return { label: `${days}일 전에 물 줬어요`, urgent: false, neverWatered: false }
  return { label: "물이 부족해요!", urgent: true, neverWatered: false }
}

/** True when the plant has already been watered on the current calendar day. */
export function wateredToday(lastWatered: Date | string | null): boolean {
  if (!lastWatered) return false
  const last = startOfDay(new Date(lastWatered))
  const today = startOfDay(new Date())
  return last.getTime() === today.getTime()
}
