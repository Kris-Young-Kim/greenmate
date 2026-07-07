# GreenMate — 전체 로드맵

## 현재 상태

| 항목 | 상태 |
|------|------|
| Next.js 16 + Tailwind + shadcn/ui | ✅ 완료 |
| Drizzle ORM + Neon Postgres 연결 | ✅ 완료 |
| 대시보드 UI (식물 카드, 등록 다이얼로그, 물주기 버튼) | ✅ 완료 |
| Clerk 인증 (로그인/회원가입/UserButton) | ✅ 완료 |
| plants 테이블 userId 연동 + Server Action 인증 가드 | ✅ 완료 |
| AI 채팅 백엔드 (Claude Haiku, 식물 컨텍스트 주입) | ✅ 완료 |
| Vercel 배포 | ✅ 완료 |
| 전체 UI 한국어 전환 | ✅ 완료 |
| 랜딩페이지 (Phase 4) | ✅ 완료 |
| 가드닝 가이드 콘텐츠 페이지 (Phase 5) | ✅ 완료 |
| 그린마트 쇼핑몰 + PWA (Phase 6) | ✅ 완료 |
| 채팅 기록 저장 (chats 테이블) | ⏳ 보류 |

---

## Phase 4 — 랜딩페이지 ✅ 완료

- [x] 라우트 분리: `app/page.tsx` → 랜딩페이지
- [x] `app/dashboard/page.tsx` 로 대시보드 이동
- [x] 히어로 섹션 + CTA
- [x] 피처 섹션 (식물 일지 / AI 상담 / 그린마트)
- [x] `SiteHeader` 네비게이션 구성

---

## Phase 5 — 가드닝 가이드 콘텐츠 ✅ 완료

- [x] Velite + MDX 콘텐츠 레이어 구성
- [x] `/guide` 목록 페이지 (카테고리 필터 + SNB)
- [x] `/guide/[slug]` 상세 페이지
- [x] 초기 가이드 콘텐츠 7편 작성
- [x] `SiteHeader` 가드닝 가이드 링크 추가

---

## Phase 6 — 이커머스 ✅ 완료

> Medusa.js 대신 Drizzle ORM 직접 사용 (경량화, Vercel 배포 최적화)

- [x] products / orders / order_items 테이블 설계
- [x] `/shop` 상품 목록 (카테고리 필터 + SNB)
- [x] `/shop/[id]` 상품 상세 페이지
- [x] 강원도찰옥수수 전용 상세 페이지 (커스텀 레이아웃)
- [x] 장바구니 (Zustand + localStorage)
- [x] 토스페이먼츠 결제 연동
- [x] `/shop/checkout`, `/shop/success`, `/shop/fail`
- [x] `/my/orders` 주문 내역 페이지
- [x] PWA 지원 (manifest, 오프라인 대응)

---

## Phase 7 — 상품 페이지 고도화 ✅ 완료 (2026-07-05)

- [x] 강원도찰옥수수 실사진 17장 적용 (`docs/sungwonfnd.modoo.at` → `public/products/corn/`)
- [x] `ProductPlaceholder` — `src` / `alt` prop 추가, 실사진 렌더링 지원
- [x] 상품 목록 썸네일: 상품 27 → 흰 옥수수 볼 실사진
- [x] 상세 페이지: 히어로 실사진, 4컷 갤러리, 인포그래픽 섹션 (선별·영양·조리·배송·파노라마)
- [x] 품절 상품 가격 표시 제거 (목록·상세 모두)
- [x] 할인 프로모션 가격 표시 (`PriceTag`, `OptionPriceTag`, `calcPromo`)
- [x] 원산지 수정: 고랭지 → 강원도 문막 일대
- [x] GAP 인증 문구 삭제
- [x] 해발 700m 문구 삭제

---

## Phase 8 — SEO ✅ 완료 (2026-07-05)

- [x] `metadataBase` 설정 (`https://swgreen.shop`)
- [x] `title` template (`%s — GreenMate`)
- [x] 글로벌 OG / Twitter Card 메타 태그
- [x] `robots.ts` — 크롤링 허용/차단 경로 설정
- [x] `sitemap.ts` — 동적 XML 사이트맵 (/, /shop, /guide + 상품·가이드 전체)
- [x] 공개 페이지별 title / description / canonical / OG 메타
  - `/`, `/shop`, `/shop/[id]`, `/guide`, `/guide/[slug]`
- [x] `/shop/[id]` `generateMetadata` — 상품명·설명·OG 이미지 동적 생성
- [x] noindex 처리: dashboard, chat, cart, checkout, success, fail, my/orders
- [x] `lang="ko"` / `viewport` 메타 (기존 적용)

---

## 미완료 항목

### SEO 추가 작업
- [x] **JSON-LD 구조화 데이터** — 완료 (2026-07-07)
  - WebSite 스키마 (root layout)
  - Product + BreadcrumbList 스키마 (`/shop/[id]`)
  - Article + BreadcrumbList 스키마 (`/guide/[slug]`)
- [ ] **OG 이미지** 1200×630 전용 이미지 제작 (현재 icon-512.png 임시 사용)
- [ ] **Google Search Console** 등록 및 sitemap.xml 제출
- [ ] **Naver Search Advisor** 등록

### 기능
- [x] 채팅 기록 저장 (chats 테이블) — 완료 (2026-07-07)
- [x] AI 채팅 → 상품 추천 카드 연결 — 완료 (2026-07-07)
- [ ] 상품 27 외 다른 상품에도 실사진 추가
- [ ] 관리자 상품 등록/수정 UI

---

## 기술 스택 전체

| 레이어 | 기술 |
|--------|------|
| Framework | Next.js 16 (App Router) |
| Auth | Clerk |
| DB | Neon Postgres + Drizzle ORM |
| AI | Claude Haiku (`@ai-sdk/anthropic`) |
| 콘텐츠 | MDX + Velite |
| 결제 | 토스페이먼츠 |
| UI | shadcn/ui + Tailwind CSS |
| 배포 | Vercel |
