// Server Component — no "use client" needed
// All animation via CSS keyframes defined in globals.css

const PARTICLES = [
  { char: "🍃", left: "7%",  dur: "7s",   delay: "0s"   },
  { char: "🌿", left: "22%", dur: "9s",   delay: "2.5s" },
  { char: "🍃", left: "48%", dur: "6s",   delay: "4s"   },
  { char: "✨", left: "68%", dur: "5s",   delay: "1.2s" },
  { char: "🌱", left: "85%", dur: "8s",   delay: "3.2s" },
  { char: "🍃", left: "36%", dur: "6.5s", delay: "5.5s" },
]

const STATS = [
  { icon: "🔥", label: "7일 연속" },
  { icon: "🌱", label: "3개 관리" },
  { icon: "💧", label: "오늘 완료" },
]

export function HeroAnimation() {
  return (
    <div
      className="aspect-[8/5] w-full relative overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg,#091710 0%,#122219 30%,#1a3528 60%,#0d2118 100%)",
        fontFamily: "'Nunito','Noto Sans KR',system-ui,sans-serif",
      }}
    >
      {/* ── ambient glow ── */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "85%",
          height: "65%",
          background:
            "radial-gradient(ellipse at center,rgba(45,106,79,0.32) 0%,transparent 68%)",
          animation: "hero-glow-pulse 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-15%",
          right: "-8%",
          width: "45%",
          height: "45%",
          background:
            "radial-gradient(ellipse at center,rgba(82,183,136,0.12) 0%,transparent 70%)",
          animation: "hero-glow-pulse 6s 2s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* ── floating particles ── */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: p.left,
            bottom: "4%",
            fontSize: 17,
            pointerEvents: "none",
            userSelect: "none",
            opacity: 0,
            animation: `hero-leaf-drift ${p.dur} ${p.delay} ease-in-out infinite`,
          }}
        >
          {p.char}
        </span>
      ))}

      {/* ── phone mockup (center) ── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        {/* phone body — floats */}
        <div style={{ width: 200, animation: "hero-float 5s ease-in-out infinite" }}>
          {/* shell */}
          <div
            style={{
              backgroundColor: "#181818",
              borderRadius: 42,
              padding: 7,
              boxShadow:
                "0 36px 88px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.07),inset 0 1px 0 rgba(255,255,255,0.1)",
              position: "relative",
            }}
          >
            {/* dynamic island */}
            <div
              style={{
                position: "absolute",
                top: 11,
                left: "50%",
                transform: "translateX(-50%)",
                width: 66,
                height: 20,
                backgroundColor: "#181818",
                borderRadius: 10,
                zIndex: 10,
              }}
            />

            {/* screen */}
            <div
              style={{
                backgroundColor: "#f4f1ec",
                borderRadius: 35,
                overflow: "hidden",
                minHeight: 370,
              }}
            >
              {/* app header */}
              <div
                style={{
                  background:
                    "linear-gradient(180deg,#1B3A2D 0%,#2D6A4F 100%)",
                  padding: "30px 13px 11px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: 7.5,
                      fontWeight: 700,
                      letterSpacing: "1.6px",
                    }}
                  >
                    GREENMATE
                  </div>
                  <div
                    style={{ color: "#fff", fontSize: 12, fontWeight: 800, marginTop: 2 }}
                  >
                    내 텃밭 🌿
                  </div>
                </div>
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.14)",
                    borderRadius: 10,
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    position: "relative",
                  }}
                >
                  🔔
                  {/* ping dot */}
                  <span
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 6,
                      height: 6,
                      backgroundColor: "#ff6b6b",
                      borderRadius: "50%",
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      width: 6,
                      height: 6,
                      backgroundColor: "#ff6b6b",
                      borderRadius: "50%",
                      animation: "hero-ping-dot 1.8s 0.5s ease-out infinite",
                    }}
                  />
                </div>
              </div>

              {/* content */}
              <div
                style={{
                  padding: "9px 9px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                {/* plant card */}
                <div
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 15,
                    padding: "11px 11px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    animation: "hero-fade-up 0.7s 0.15s both",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 7,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div
                        style={{
                          fontSize: 22,
                          width: 36,
                          height: 36,
                          backgroundColor: "#EAF4EE",
                          borderRadius: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          animation: "hero-breathe 3s ease-in-out infinite",
                        }}
                      >
                        🌿
                      </div>
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#1B3A2D" }}>
                          몬스테라
                        </div>
                        <div style={{ fontSize: 8.5, color: "#aaa", marginTop: 1 }}>
                          키운 지 42일째
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        background: "linear-gradient(135deg,#2D6A4F,#52b788)",
                        borderRadius: 10,
                        padding: "3px 7px",
                        fontSize: 8.5,
                        fontWeight: 800,
                        color: "#fff",
                      }}
                    >
                      +42일
                    </div>
                  </div>

                  {/* water bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 3,
                    }}
                  >
                    <span style={{ fontSize: 7.5, color: "#999", fontWeight: 600 }}>
                      💧 물주기 건강도
                    </span>
                    <span style={{ fontSize: 7.5, color: "#2D6A4F", fontWeight: 700 }}>
                      양호
                    </span>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#E8F5EE",
                      borderRadius: 4,
                      height: 4.5,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 4,
                        background: "linear-gradient(90deg,#2D6A4F,#52b788)",
                        width: 0,
                        animation: "hero-bar-fill 1.8s 0.6s ease-out forwards",
                      }}
                    />
                  </div>

                  {/* done button */}
                  <div
                    style={{
                      marginTop: 7,
                      backgroundColor: "#EAF4EE",
                      borderRadius: 9,
                      padding: "5px 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 10 }}>✅</span>
                    <span style={{ fontSize: 8.5, fontWeight: 700, color: "#2D6A4F" }}>
                      오늘 물 주기 완료!
                    </span>
                  </div>
                </div>

                {/* AI chat */}
                <div
                  style={{
                    background: "linear-gradient(135deg,#E8F5EE,#d4edda)",
                    borderRadius: "12px 12px 12px 4px",
                    padding: "10px 11px 9px",
                    animation: "hero-fade-up 0.7s 0.45s both",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -6,
                      left: 9,
                      backgroundColor: "#2D6A4F",
                      borderRadius: 7,
                      padding: "2px 6px",
                    }}
                  >
                    <span style={{ fontSize: 7, color: "#fff", fontWeight: 800 }}>
                      🤖 AI 전문가
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 3,
                      fontSize: 9.5,
                      color: "#1B3A2D",
                      lineHeight: 1.7,
                      fontWeight: 500,
                    }}
                  >
                    잎이 노랗다면 과습을<br />의심해 보세요 💡
                  </div>
                </div>

                {/* stats row */}
                <div
                  style={{
                    display: "flex",
                    gap: 5,
                    animation: "hero-fade-up 0.7s 0.75s both",
                  }}
                >
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        flex: 1,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        padding: "6px 4px",
                        textAlign: "center",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div style={{ fontSize: 15 }}>{s.icon}</div>
                      <div
                        style={{
                          fontSize: 7,
                          color: "#666",
                          fontWeight: 600,
                          marginTop: 1,
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── floating badge: AI ── */}
      <div
        style={{
          position: "absolute",
          top: "9%",
          right: "4%",
          animation:
            "hero-fade-up 0.7s 1s both, hero-float-slow 6s 1.5s ease-in-out infinite",
          background:
            "linear-gradient(135deg,rgba(45,106,79,0.95),rgba(74,138,26,0.9))",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 22,
          padding: "8px 13px",
          display: "flex",
          alignItems: "center",
          gap: 5,
          boxShadow:
            "0 8px 24px rgba(0,0,0,0.45),0 0 0 1px rgba(255,255,255,0.1)",
        }}
      >
        <span style={{ fontSize: 13 }}>✨</span>
        <span style={{ color: "#fff", fontSize: 9.5, fontWeight: 800 }}>
          AI 식물 상담 가능
        </span>
      </div>

      {/* ── floating badge: streak ── */}
      <div
        style={{
          position: "absolute",
          bottom: "9%",
          left: "4%",
          animation:
            "hero-fade-up 0.7s 1.3s both, hero-float-slow-rev 7s 1.5s ease-in-out infinite",
          backgroundColor: "rgba(9,23,16,0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 22,
          padding: "8px 13px",
          display: "flex",
          alignItems: "center",
          gap: 5,
          boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
          border: "1px solid rgba(45,106,79,0.45)",
        }}
      >
        <span style={{ fontSize: 13 }}>🌿</span>
        <span style={{ color: "#b7e4c7", fontSize: 9.5, fontWeight: 600 }}>
          30일 연속 관리 중
        </span>
      </div>

      {/* ── floating badge: shop ── */}
      <div
        style={{
          position: "absolute",
          top: "9%",
          left: "4%",
          animation:
            "hero-fade-up 0.7s 1.6s both, hero-float-slow 8s 2s ease-in-out infinite",
          backgroundColor: "rgba(9,23,16,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderRadius: 22,
          padding: "8px 13px",
          display: "flex",
          alignItems: "center",
          gap: 5,
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span style={{ fontSize: 13 }}>🛒</span>
        <span style={{ color: "#c8e6c9", fontSize: 9.5, fontWeight: 600 }}>
          그린마트 오픈
        </span>
      </div>
    </div>
  )
}
