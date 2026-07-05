import * as dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config({ path: ".env.local" })

const PRODUCTS = [
  // 씨앗
  { name: "청양고추 씨앗 (50립)", description: "매운맛이 강한 청양고추 씨앗. 발아율 85% 이상, 베란다 텃밭 최적화 품종.", price: 2900, category: "씨앗", emoji: "🌶️", stock: 200 },
  { name: "방울토마토 씨앗 (30립)", description: "당도 높고 수확량 많은 방울토마토. 초보자도 쉽게 키울 수 있는 강건한 품종.", price: 3500, category: "씨앗", emoji: "🍅", stock: 150 },
  { name: "상추 모듬 씨앗 (치커리+버터헤드+적상추)", description: "세 가지 상추를 한 번에! 20일이면 수확 가능한 빠른 성장 품종 모음.", price: 4900, category: "씨앗", emoji: "🥬", stock: 300 },
  { name: "바질 씨앗 (100립)", description: "이탈리아 요리의 필수 허브. 향이 진하고 성장이 빠른 스위트 바질.", price: 2500, category: "씨앗", emoji: "🌿", stock: 180 },
  { name: "오이 씨앗 (20립)", description: "베란다에서도 풍성하게 열리는 미니 오이 품종. 지지대만 있으면 OK.", price: 3200, category: "씨앗", emoji: "🥒", stock: 120 },
  // 농기구
  { name: "스텐 모종삽 세트 (3종)", description: "스테인리스 스틸 소재로 녹슬지 않는 모종삽·이식삽·고랑기 세트.", price: 12900, category: "농기구", emoji: "🔧", stock: 80 },
  { name: "압축 분무기 1.5L", description: "한 번 펌핑으로 지속 분무. 병충해 방제·물주기 모두 사용 가능.", price: 8900, category: "농기구", emoji: "💦", stock: 60 },
  { name: "식물 수분·pH 측정기", description: "토양 수분과 pH를 동시 측정. 배터리 불필요, 흙에 꽂으면 바로 측정.", price: 15900, category: "농기구", emoji: "📊", stock: 40 },
  { name: "원예용 장갑 (M/L)", description: "방수 코팅 처리로 흙이 묻지 않는 원예 전용 장갑. 손목까지 보호.", price: 6900, category: "농기구", emoji: "🧤", stock: 100 },
  // 농자재
  { name: "프리미엄 원예 배양토 5L", description: "배수성·보수성·통기성을 균형 있게 배합한 채소 재배 전용 배양토.", price: 7900, category: "농자재", emoji: "🪣", stock: 150 },
  { name: "마사토 (소립) 3kg", description: "배수층 조성에 필수. 화분 밑에 깔거나 흙에 혼합해 통기성 향상.", price: 4500, category: "농자재", emoji: "🪨", stock: 200 },
  { name: "펄라이트 2L", description: "흙의 배수성과 통기성을 높여주는 경량 화산석. 배양토에 20% 혼합 권장.", price: 3900, category: "농자재", emoji: "⚪", stock: 180 },
  // 비료
  { name: "채소 전용 액체비료 500ml", description: "질소·인산·칼리 균형 배합. 물에 희석해 2주에 한 번 주면 성장 촉진.", price: 9900, category: "비료", emoji: "💧", stock: 90 },
  { name: "친환경 퇴비 발효 비료 1kg", description: "음식물 발효 퇴비 100%. 냄새 없이 천천히 분해되는 완효성 유기질 비료.", price: 11900, category: "비료", emoji: "🌱", stock: 70 },
  { name: "칼슘·마그네슘 복합 비료 200g", description: "배꼽썩음병 예방에 필수. 토마토·고추 결실기에 엽면 살포 또는 관주.", price: 8500, category: "비료", emoji: "💊", stock: 50 },
]

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  console.log("Creating shop tables...")

  await pool.query(`
    CREATE TABLE IF NOT EXISTS "products" (
      "id"          SERIAL PRIMARY KEY,
      "name"        TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "price"       INTEGER NOT NULL,
      "category"    TEXT NOT NULL,
      "emoji"       TEXT NOT NULL,
      "stock"       INTEGER NOT NULL DEFAULT 0,
      "created_at"  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS "orders" (
      "id"            SERIAL PRIMARY KEY,
      "user_id"       TEXT NOT NULL,
      "total_amount"  INTEGER NOT NULL,
      "status"        TEXT NOT NULL DEFAULT 'pending',
      "payment_key"   TEXT,
      "toss_order_id" TEXT,
      "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `)

  await pool.query(`
    CREATE TABLE IF NOT EXISTS "order_items" (
      "id"           SERIAL PRIMARY KEY,
      "order_id"     INTEGER NOT NULL REFERENCES "orders"("id"),
      "product_id"   INTEGER NOT NULL REFERENCES "products"("id"),
      "quantity"     INTEGER NOT NULL,
      "price"        INTEGER NOT NULL,
      "product_name" TEXT NOT NULL
    );
  `)

  console.log("Seeding products...")
  await pool.query(`TRUNCATE "products" RESTART IDENTITY CASCADE`)

  for (const p of PRODUCTS) {
    await pool.query(
      `INSERT INTO "products" ("name","description","price","category","emoji","stock")
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [p.name, p.description, p.price, p.category, p.emoji, p.stock],
    )
  }

  console.log(`✅ ${PRODUCTS.length}개 상품 시딩 완료!`)
  await pool.end()
}

main().catch((err) => { console.error(err); process.exit(1) })
