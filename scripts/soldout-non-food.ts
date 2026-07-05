import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  const result = await sql`UPDATE products SET stock = 0 WHERE category != '식재료'`
  console.log("품절 처리 완료:", result)

  const check = await sql`SELECT name, category, stock FROM products ORDER BY category`
  for (const p of check) console.log(p.category, p.name, "→ 재고:", p.stock)
}

main().catch(console.error)
