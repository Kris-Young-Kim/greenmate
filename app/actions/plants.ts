"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { plants, plantLogs } from "@/lib/db/schema"
import { and, desc, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

const PLANT_TYPES = ["Lettuce", "Chili", "Tomato", "Cucumber", "Paprika"] as const

async function requireUserId(): Promise<string> {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")
  return userId
}

export async function getPlants() {
  const userId = await requireUserId()
  return db.select().from(plants).where(eq(plants.userId, userId)).orderBy(desc(plants.createdAt))
}

export async function getPlant(id: number) {
  const userId = await requireUserId()
  const rows = await db
    .select()
    .from(plants)
    .where(and(eq(plants.id, id), eq(plants.userId, userId)))
    .limit(1)
  return rows[0] ?? null
}

export async function createPlant(formData: {
  nickname: string
  type: string
  plantedDate: string
}) {
  const userId = await requireUserId()

  const nickname = formData.nickname?.trim()
  const type = formData.type?.trim()
  const plantedDate = formData.plantedDate?.trim()

  if (!nickname) throw new Error("Nickname is required")
  if (!PLANT_TYPES.includes(type as (typeof PLANT_TYPES)[number])) {
    throw new Error("Invalid plant type")
  }
  if (!plantedDate) throw new Error("Planted date is required")

  await db.insert(plants).values({ userId, nickname, type, plantedDate })
  revalidatePath("/")
}

export async function waterPlant(id: number) {
  const userId = await requireUserId()
  await db
    .update(plants)
    .set({ lastWatered: new Date() })
    .where(and(eq(plants.id, id), eq(plants.userId, userId)))
  revalidatePath("/")
}

export async function getLogs(plantId: number) {
  const userId = await requireUserId()
  return db
    .select()
    .from(plantLogs)
    .where(and(eq(plantLogs.plantId, plantId), eq(plantLogs.userId, userId)))
    .orderBy(desc(plantLogs.logDate))
}

export async function createLog(data: { plantId: number; logDate: string; memo: string }) {
  const userId = await requireUserId()
  const memo = data.memo?.trim()
  if (!memo) throw new Error("메모를 입력해주세요")
  if (!data.logDate) throw new Error("날짜를 선택해주세요")

  await db.insert(plantLogs).values({
    plantId: data.plantId,
    userId,
    logDate: data.logDate,
    memo,
  })
  revalidatePath(`/dashboard/${data.plantId}`)
}

export async function deleteLog(id: number, plantId: number) {
  const userId = await requireUserId()
  await db
    .delete(plantLogs)
    .where(and(eq(plantLogs.id, id), eq(plantLogs.userId, userId)))
  revalidatePath(`/dashboard/${plantId}`)
}
