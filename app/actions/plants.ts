"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { plants } from "@/lib/db/schema"
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
