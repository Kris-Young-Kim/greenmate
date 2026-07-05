import * as dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config({ path: ".env.local" })

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  console.log("Dropping plants table...")
  await pool.query(`DROP TABLE IF EXISTS "plants" CASCADE;`)

  console.log("Creating plants table...")
  await pool.query(`
    CREATE TABLE "plants" (
      "id"           SERIAL PRIMARY KEY,
      "user_id"      TEXT NOT NULL,
      "nickname"     TEXT NOT NULL,
      "type"         TEXT NOT NULL,
      "planted_date" DATE NOT NULL,
      "last_watered" TIMESTAMPTZ,
      "created_at"   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  console.log("Done!")
  await pool.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
