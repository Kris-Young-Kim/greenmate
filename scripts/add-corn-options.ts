import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL!)

async function main() {
  // 1. Add options column if not exists
  await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS options JSONB`
  console.log("✓ options 컬럼 확인")

  // 2. Delete old corn product
  await sql`DELETE FROM products WHERE name = '옥수수 씨앗 (30립)'`
  console.log("✓ 기존 옥수수 씨앗 삭제")

  // 3. Insert new corn product with options
  const options = JSON.stringify([
    { label: "30개", price: 26000 },
    { label: "50개", price: 40000 },
  ])

  await sql`
    INSERT INTO products (name, description, price, category, emoji, stock, options)
    VALUES (
      '강원도찰옥수수(미백2호)',
      '강원도 해발 700m 고랭지에서 재배한 찰옥수수 미백2호. 당도 높고 쫀득한 식감이 특징. 수확 직후 냉동 보관으로 신선도 유지.',
      26000,
      '식재료',
      '🌽',
      100,
      ${options}::jsonb
    )
  `
  console.log("✓ 강원도찰옥수수(미백2호) 추가 완료")
}

main().catch(console.error)
