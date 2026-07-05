import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS plant_logs (
      id          SERIAL PRIMARY KEY,
      plant_id    INTEGER NOT NULL,
      user_id     TEXT NOT NULL,
      log_date    DATE NOT NULL,
      memo        TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  console.log("plant_logs table created ✓")
}

main().catch(console.error)
