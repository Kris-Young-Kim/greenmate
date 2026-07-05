import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  await sql`UPDATE products SET category = '농산물' WHERE category = '식재료'`
  const check = await sql`SELECT name, category FROM products WHERE category = '농산물'`
  for (const p of check) console.log("✓", p.name, "→", p.category)
}

main().catch(console.error)
