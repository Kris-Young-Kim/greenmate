import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  await sql`
    ALTER TABLE orders
    ADD COLUMN IF NOT EXISTS shipping_address jsonb
  `
  console.log("✓ shipping_address column added to orders table")
}

main().catch(console.error)
