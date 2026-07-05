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
| 채팅 기록 저장 (chats 테이블) | ⏳ 보류 |

---

## Phase 4 — 랜딩페이지 (Remotion 애니메이션)

> 목표: 비로그인 방문자에게 GreenMate 가치를 10초 안에 전달, 회원가입 유도

### 아키텍처
- `/` → 공개 랜딩페이지 (현재 대시보드 → `/dashboard`로 이동)
- `app/landing/` 폴더에 섹션 컴포넌트 분리

### 작업 목록
- [ ] 라우트 분리: 현재 `app/page.tsx`(대시보드) → `app/dashboard/page.tsx`로 이동
- [ ] `app/page.tsx`를 랜딩페이지로 교체
- [ ] `pnpm add remotion @remotion/player` 설치
- [ ] Pretendard 웹폰트 추가 (`next/font/local` or CDN)
- [ ] Remotion 3막 애니메이션 컴포넌트 제작
  - 1막 (0–3s): 축 처진 화분 🪴 + "또 시들었어..." 텍스트
  - 2막 (3–7s): 앱 UI 목업 슬라이드인 + AI 채팅 말풍선
  - 3막 (7–10s): "내 식물, 이젠 안 죽어" + CTA 버튼
- [ ] 랜딩 섹션 컴포넌트 7개 제작
  - `HeroSection` — Remotion Player + 헤드라인 + CTA
  - `ProblemSection` — 공감대 형성 ("식물 키우다 포기한 적 있으신가요?")
  - `FeaturesSection` — 3카드 (식물 일지 / 물주기 알림 / AI 상담)
  - `DemoSection` — 앱 스크린샷 슬라이드
  - `SocialProofSection` — 후기 + 수치 배지
  - `CtaSection` — 회원가입 유도
  - `Footer`
- [ ] proxy.ts에서 `/dashboard` 인증 라우트 보호 설정 업데이트

---

## Phase 5 — 정보/콘텐츠 페이지

> 목표: 홈 가드닝 실용 정보 제공 → SEO 유입 → 앱 전환

### 기술 선택
- **MDX** + **Velite** (콘텐츠 레이어) — 마크다운으로 글 작성, 자동 타입세이프 파싱
- `/guide` 라우트에 카테고리별 정렬

### 콘텐츠 카테고리
- 🌱 **식물별 가이드** — 상추, 고추, 토마토, 오이, 파프리카 각각 재배법
- 📅 **계절별 팁** — 봄/여름/가을/겨울 홈 가드닝 전략
- 🐛 **병충해 대처** — 증상별 원인 + 해결법
- 💧 **물주기 마스터** — 식물 종류별 적정 주기 + 과습/건조 구별법
- 🌿 **초보자 가이드** — 첫 텃밭 시작하는 법

### 작업 목록
- [ ] `pnpm add velite` 설치 및 `velite.config.ts` 구성
- [ ] `/app/guide/page.tsx` — 가이드 목록 페이지 (카테고리 필터)
- [ ] `/app/guide/[slug]/page.tsx` — 개별 가이드 상세 페이지
- [ ] MDX 콘텐츠 파일 초기 10편 작성 (`content/guides/`)
- [ ] `SiteHeader`에 "가드닝 가이드" 네비게이션 링크 추가
- [ ] OG 이미지 자동 생성 (`@vercel/og`) — SEO 강화
- [ ] sitemap.xml 자동 생성

---

## Phase 6 — 이커머스 (씨앗·농기구·농자재·비료 판매)

> 목표: GreenMate 생태계 내에서 상품 구매까지 완결

### 기술 선택 (권장: Medusa.js 헤드리스 커머스)
- **커머스 엔진**: Medusa.js (오픈소스, 자체 호스팅) — 재고/주문/반품 로직 내장
- **결제**: 토스페이먼츠 (국내 표준, Medusa 플러그인 존재)
- **배송**: CJ대한통운 / 롯데택배 API 연동
- **스토어 프론트**: GreenMate Next.js에 Medusa Storefront API로 연결

### 대안: Shopify Headless
- 장점: 안정성, 글로벌 결제, 앱 생태계
- 단점: 월 구독료, 한국 결제(토스) 연동 커스터마이징 필요

### 판매 카테고리
- 🌾 **씨앗** — 채소류, 허브류, 화훼류
- 🔧 **농기구** — 소형 삽, 분무기, 화분, 흙 측정기
- 🧪 **농자재** — 배양토, 마사토, 원예용 흙
- 💊 **비료** — 액체비료, 고체비료, 친환경 퇴비

### 작업 목록
- [ ] Medusa.js 서버 별도 구축 (Railway 또는 Fly.io 배포)
- [ ] Medusa Storefront API → GreenMate 연결
- [ ] `/shop` 라우트 — 상품 목록 페이지 (카테고리 필터, 검색)
- [ ] `/shop/[productId]` — 상품 상세 페이지
- [ ] 장바구니 상태 관리 (Zustand 또는 Medusa Cart API)
- [ ] 토스페이먼츠 결제 모듈 연동
- [ ] 주문 내역 페이지 (`/my/orders`)
- [ ] AI 상담 → 상품 추천 연결 (채팅에서 "이 비료 어때요?" → 상품 카드 표시)

---

## 전체 일정 (권장 순서)

```
현재 완료     ████████████░░░░░░░░░░  MVP 핵심 기능
Phase 4      2주           랜딩페이지 + 회원가입 전환 최적화
Phase 5      3주           콘텐츠/SEO → 오가닉 유입 확보
Phase 6      8주+          이커머스 (Medusa 설정 2주 + 프론트 6주)
```

---

## 기술 스택 전체

| 레이어 | 기술 |
|--------|------|
| Framework | Next.js 16 (App Router) |
| Auth | Clerk |
| DB | Neon Postgres + Drizzle ORM |
| AI | Claude Haiku (`@ai-sdk/anthropic`) |
| 애니메이션 | Remotion + @remotion/player |
| 콘텐츠 | MDX + Velite |
| 커머스 | Medusa.js (헤드리스) |
| 결제 | 토스페이먼츠 |
| UI | shadcn/ui + Tailwind CSS |
| 배포 | Vercel (프론트) + Railway (Medusa) |
