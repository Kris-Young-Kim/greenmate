import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "GreenMate — 홈 가드닝 파트너"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0f3b1f 0%, #1a5c2e 40%, #2d7a3a 70%, #3a9a4a 100%)",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        {/* 배경 장식 원 */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 200,
            right: 80,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(134,239,172,0.08)",
          }}
        />

        {/* 메인 콘텐츠 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "72px 80px",
            height: "100%",
          }}
        >
          {/* 상단: 로고 배지 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 48,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
              }}
            >
              🌿
            </div>
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.02em",
              }}
            >
              swgreen.shop
            </span>
          </div>

          {/* 메인 타이틀 */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: 4,
              }}
            >
              GreenMate
            </div>
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: "#86efac",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                marginBottom: 28,
              }}
            >
              홈 가드닝 파트너
            </div>

            <div
              style={{
                fontSize: 28,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.5,
                maxWidth: 680,
                marginBottom: 56,
              }}
            >
              식물 일지, AI 케어 상담, 산지직송 그린마트까지
              <br />
              내 텃밭을 스마트하게 관리하세요.
            </div>

            {/* 피처 카드 3종 */}
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { emoji: "🌱", title: "식물 일지", desc: "성장 기록 & 물주기 관리" },
                { emoji: "🤖", title: "AI 상담", desc: "Claude AI 맞춤 가드닝 조언" },
                { emoji: "🛒", title: "그린마트", desc: "씨앗·모종·신선 농산물" },
              ].map((f) => (
                <div
                  key={f.title}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 20,
                    padding: "20px 24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 32 }}>{f.emoji}</span>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {f.title}
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.4,
                    }}
                  >
                    {f.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 대형 장식 이모지 */}
        <div
          style={{
            position: "absolute",
            right: 60,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 220,
            opacity: 0.12,
            lineHeight: 1,
          }}
        >
          🌿
        </div>
      </div>
    ),
    { ...size },
  )
}
