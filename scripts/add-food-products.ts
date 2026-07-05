import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"

dotenv.config({ path: ".env.local" })

const sql = neon(process.env.DATABASE_URL!)

const products = [
  {
    name: "옥수수 씨앗 (30립)",
    description: "달콤한 단옥수수 씨앗. 파종 후 70~80일이면 수확 가능. 넓은 화분이나 텃밭 직접 파종 추천.",
    price: 3800,
    category: "식재료",
    emoji: "🌽",
    stock: 80,
  },
  {
    name: "국산 콩 메주 1kg",
    description: "100% 국산 콩으로 만든 전통 메주. 된장·간장 직접 담그기에 사용. 자연 발효된 정품 메주.",
    price: 15000,
    category: "식재료",
    emoji: "🫘",
    stock: 30,
  },
  {
    name: "국산 고추가루 500g",
    description: "직접 수확한 홍고추를 건조·분쇄한 국산 고춧가루. 김치·찌개·양념에 두루 사용 가능.",
    price: 12000,
    category: "식재료",
    emoji: "🌶️",
    stock: 50,
  },
]

async function main() {
  for (const p of products) {
    await sql`
      INSERT INTO products (name, description, price, category, emoji, stock)
      VALUES (${p.name}, ${p.description}, ${p.price}, ${p.category}, ${p.emoji}, ${p.stock})
    `
    console.log(`✓ ${p.name}`)
  }
  console.log("완료!")
}

main().catch(console.error)
