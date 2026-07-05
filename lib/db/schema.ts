import { pgTable, serial, text, date, timestamp, integer, jsonb } from "drizzle-orm/pg-core"

export type ProductOption = { label: string; price: number }

export type ShippingAddress = {
  name: string
  phone: string
  zip: string
  address: string
  addressDetail: string
}

export const plants = pgTable("plants", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  nickname: text("nickname").notNull(),
  type: text("type").notNull(),
  plantedDate: date("planted_date").notNull(),
  lastWatered: timestamp("last_watered", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // 원(KRW)
  category: text("category").notNull(), // 씨앗 | 농기구 | 농자재 | 비료
  emoji: text("emoji").notNull(),
  stock: integer("stock").notNull().default(0),
  options: jsonb("options").$type<ProductOption[]>(),
  sortOrder: integer("sort_order").notNull().default(100),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  totalAmount: integer("total_amount").notNull(), // 원(KRW)
  status: text("status").notNull().default("pending"), // pending | paid | cancelled
  paymentKey: text("payment_key"),
  tossOrderId: text("toss_order_id"),
  shippingAddress: jsonb("shipping_address").$type<ShippingAddress>(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  productName: text("product_name").notNull(),
})

export const plantLogs = pgTable("plant_logs", {
  id: serial("id").primaryKey(),
  plantId: integer("plant_id").notNull(),
  userId: text("user_id").notNull(),
  logDate: date("log_date").notNull(),
  memo: text("memo").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Plant = typeof plants.$inferSelect
export type Product = typeof products.$inferSelect
export type Order = typeof orders.$inferSelect
export type OrderItem = typeof orderItems.$inferSelect
export type PlantLog = typeof plantLogs.$inferSelect
