"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { and, eq, asc } from "drizzle-orm"

export async function getChatHistory(plantId: number) {
  const { userId } = await auth()
  if (!userId) return []

  return db
    .select()
    .from(chats)
    .where(and(eq(chats.plantId, plantId), eq(chats.userId, userId)))
    .orderBy(asc(chats.createdAt))
}
