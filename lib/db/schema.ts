import { pgTable, serial, text, date, timestamp } from "drizzle-orm/pg-core"

export const plants = pgTable("plants", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  nickname: text("nickname").notNull(),
  type: text("type").notNull(),
  plantedDate: date("planted_date").notNull(),
  lastWatered: timestamp("last_watered", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Plant = typeof plants.$inferSelect
