# GreenMate MVP — 작업 계획

## 현재 상태

| 항목 | 상태 |
|------|------|
| Next.js 16 + Tailwind + shadcn/ui | ✅ 완료 |
| Drizzle ORM + Neon Postgres 연결 | ✅ 완료 |
| 대시보드 UI (식물 카드, 등록 다이얼로그, 물주기 버튼) | ✅ 완료 |
| 채팅 페이지 UI 껍데기 | ✅ 완료 |
| Clerk CLI 설치 + 로그인 | ✅ 완료 |
| Clerk 프로젝트 초기화 | ❌ 미완 |
| plants 테이블에 userId 컬럼 추가 | ❌ 미완 |
| AI 채팅 백엔드 (Claude API 연동) | ❌ 미완 |
| 채팅 기록 저장 (chats 테이블) | ❌ 미완 |

---

## Phase 1 — Clerk 인증 완성

- [ ] `clerk init --app app_3G455sS82i5C9bzF2YSpWE5pkyF` 실행
- [ ] `middleware.ts` 생성 및 `/__clerk/:path*` matcher 확인
- [ ] Drizzle 스키마 `plants` 테이블에 `userId` 컬럼 추가
- [ ] Neon DB 마이그레이션 실행
- [ ] `getPlants`, `createPlant`, `waterPlant` Server Action에 `auth()` 가드 추가
- [ ] `SiteHeader`에 `SignInButton` / `SignUpButton` / `UserButton` 삽입
- [ ] `clerk doctor` 로 설정 검증

---

## Phase 2 — AI 채팅 백엔드 연동

- [ ] `@ai-sdk/anthropic` 설치
- [ ] `.env.local`에 `ANTHROPIC_API_KEY` 추가
- [ ] Drizzle 스키마에 `chats` 테이블 추가 (`plantId`, `role`, `content`, `createdAt`)
- [ ] DB 마이그레이션 실행
- [ ] `/api/chat` route 생성 — 식물 정보(종류, 별명, 키운 일수, 마지막 물주기)를 시스템 프롬프트에 주입
- [ ] `ChatInterface` 컴포넌트를 실제 `/api/chat` 엔드포인트에 연결
- [ ] 채팅 기록 DB 저장 및 페이지 진입 시 이전 대화 불러오기
- [ ] 자주 묻는 질문 템플릿 버튼 추가 (예: "잎이 노래요", "물이 부족할 때 증상은?")

---

## Phase 3 — 배포 + QA

- [ ] Vercel 프로젝트 연결 (`vercel link`)
- [ ] Vercel 환경변수 설정 (`DATABASE_URL`, `CLERK_SECRET_KEY`, `ANTHROPIC_API_KEY` 등)
- [ ] 프로덕션 빌드 확인 (`next build`)
- [ ] Vercel 배포 (`vercel deploy --prod`)
- [ ] 실기기 테스트 (로그인 → 식물 등록 → 물주기 → AI 채팅)
| 빌드 에러 및 버그 수정

---

## 기술 스택 요약

- **Framework**: Next.js 16 (App Router)
- **Auth**: Clerk
- **DB**: Neon Postgres + Drizzle ORM
- **AI**: Claude API (`@ai-sdk/anthropic`)
- **UI**: shadcn/ui + Tailwind CSS
- **Deploy**: Vercel
