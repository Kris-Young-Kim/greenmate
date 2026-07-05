import * as dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config({ path: ".env.local" })

const SEEDLINGS = [
  {
    name: "방울토마토 모종",
    description: "이미 발아된 건강한 방울토마토 모종. 정식 후 40~50일이면 수확 가능. 씨앗보다 한 달 단축.",
    price: 2500,
    category: "모종",
    emoji: "🍅",
    stock: 80,
  },
  {
    name: "청양고추 모종",
    description: "매운맛 강한 청양고추 모종. 튼튼한 줄기에 꽃눈 형성 시작. 빠른 수확이 목표라면 씨앗보다 모종!",
    price: 2200,
    category: "모종",
    emoji: "🌶️",
    stock: 100,
  },
  {
    name: "상추 모종 (4종 혼합)",
    description: "치커리·버터헤드·청상추·적상추 4종 한 포트. 정식 후 10일 내 수확 가능한 빠른 품종.",
    price: 3500,
    category: "모종",
    emoji: "🥬",
    stock: 120,
  },
  {
    name: "오이 모종",
    description: "미니 오이 모종. 지지대 설치 후 정식하면 한 달 내 수확. 물 주기만 잘 지켜주면 왕성하게 자라요.",
    price: 2800,
    category: "모종",
    emoji: "🥒",
    stock: 60,
  },
  {
    name: "가지 모종",
    description: "부드러운 식감의 재래 가지 모종. 햇볕 잘 드는 곳에 두면 여름 내내 수확 가능.",
    price: 2500,
    category: "모종",
    emoji: "🍆",
    stock: 50,
  },
  {
    name: "바질 모종",
    description: "이탈리아 스위트 바질 모종. 씨앗보다 3주 빠른 수확. 주방 창가에 두면 요리할 때 바로 뜯어쓰기 가능.",
    price: 2000,
    category: "모종",
    emoji: "🌿",
    stock: 90,
  },
  {
    name: "허브 모종 세트 (바질·로즈마리·민트)",
    description: "주방 창가 미니 허브 가든 완성 패키지. 세 종류를 한번에 길러 요리에 바로 활용하세요.",
    price: 7900,
    category: "모종",
    emoji: "🪴",
    stock: 40,
  },
  {
    name: "사계딸기 모종",
    description: "사계성 딸기 모종. 베란다에서도 1년 내내 수확 가능. 초보자도 쉽게 키울 수 있는 강건한 품종.",
    price: 3500,
    category: "모종",
    emoji: "🍓",
    stock: 70,
  },
]

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  console.log("Adding seedling (모종) products...")

  for (const p of SEEDLINGS) {
    await pool.query(
      `INSERT INTO "products" ("name","description","price","category","emoji","stock")
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [p.name, p.description, p.price, p.category, p.emoji, p.stock],
    )
    console.log(`  ✅ ${p.emoji} ${p.name}`)
  }

  console.log(`\n✅ ${SEEDLINGS.length}개 모종 상품 추가 완료!`)
  await pool.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
