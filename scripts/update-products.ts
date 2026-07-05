import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  // 1. sort_order 컬럼 추가
  await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 100`
  console.log("✓ sort_order 컬럼 추가")

  // 2. 강원도찰옥수수 맨 앞으로
  await sql`UPDATE products SET sort_order = 0 WHERE id = 27`
  console.log("✓ 강원도찰옥수수 sort_order = 0")

  // 3. 메주, 고추가루 품절
  await sql`UPDATE products SET stock = 0 WHERE id IN (25, 26)`
  console.log("✓ 국산 콩 메주, 국산 고추가루 품절 처리")

  // 확인
  const rows = await sql`SELECT id, name, stock, sort_order FROM products ORDER BY sort_order, id`
  console.log("\n최종 상품 목록 (앞 5개):")
  for (const p of rows.slice(0, 5))
    console.log(`  [${p.id}] ${p.name} | 재고: ${p.stock} | 순서: ${p.sort_order}`)
}

main().catch(console.error)
