"use client"

import { Player } from "@remotion/player"
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion"

// ─── Remotion composition ────────────────────────────────────────────────────

function PlantStory() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const sp = (f: number, from: number, to: number, damping = 14, stiffness = 120) =>
    spring({ frame: f, fps, config: { damping, stiffness }, from, to })

  const lerp = (
    f: number,
    ins: number[],
    outs: number[],
  ) =>
    interpolate(f, ins, outs, {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })

  // ── Background: warm beige → green-tinted ──────────────────────────────────
  const bgR = Math.round(lerp(frame, [75, 115], [240, 234]))
  const bgG = Math.round(lerp(frame, [75, 115], [237, 244]))
  const bgB = Math.round(lerp(frame, [75, 115], [232, 238]))

  // ── Act 1: Wilting plant (0–89) ────────────────────────────────────────────
  const plantOpacity  = lerp(frame, [0, 15], [0, 1])
  const plantRotate   = lerp(frame, [15, 89, 130], [0, -12, 0])
  const text1Opacity  = lerp(frame, [30, 50, 65, 85], [0, 1, 1, 0])
  const dropOpacity   = lerp(frame, [10, 40, 68, 88], [0, 0.28, 0.28, 0])

  // ── Act 2: App mockup (80–210) ─────────────────────────────────────────────
  const phoneXOffset  = sp(frame - 82, 320, 0, 16, 110)
  const phoneOpacity  = lerp(frame, [80, 100, 188, 208], [0, 1, 1, 0])
  const cardOpacity   = lerp(frame, [108, 128], [0, 1])
  const chatOpacity   = lerp(frame, [138, 158], [0, 1])
  const plantBright   = lerp(frame, [90, 145], [0.75, 1.15])

  // ── Act 3: Brand reveal (195–299) ─────────────────────────────────────────
  const act3Opacity   = lerp(frame, [200, 218], [0, 1])
  const hlOpacity     = lerp(frame, [205, 228], [0, 1])
  const hlScale       = sp(frame - 205, 0.82, 1, 14, 100)
  const subOpacity    = lerp(frame, [232, 252], [0, 1])
  const ctaOpacity    = lerp(frame, [252, 272], [0, 1])
  const breathe       = frame >= 195 ? Math.sin((frame - 195) * 0.09) * 0.028 + 1 : 1

  const plantEmoji    = frame < 90 ? "🪴" : "🌿"
  const plantScale    = frame >= 195 ? breathe : 1

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `rgb(${bgR},${bgG},${bgB})`,
        fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Act 1 decorations ── */}
      <span style={{ position: "absolute", fontSize: 48, top: "16%", left: "10%", opacity: dropOpacity }}>💧</span>
      <span style={{ position: "absolute", fontSize: 30, top: "60%", left: "71%", opacity: dropOpacity * 0.65 }}>💧</span>
      <span style={{ position: "absolute", fontSize: 20, top: "35%", left: "80%", opacity: dropOpacity * 0.4 }}>💧</span>

      <div
        style={{
          position: "absolute",
          bottom: "17%",
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: text1Opacity,
          color: "#8A8A8A",
          fontSize: 26,
          fontWeight: 500,
          letterSpacing: "1px",
        }}
      >
        또 시들었어...
      </div>

      {/* ── Plant (all acts) ── */}
      <div
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          fontSize: 108,
          lineHeight: 1,
          opacity: plantOpacity,
          filter: frame >= 90 && frame < 195 ? `brightness(${plantBright})` : "none",
          transform: `translateX(-50%) translateY(-55%) rotate(${plantRotate}deg) scale(${plantScale})`,
          transformOrigin: "50% 100%",
        }}
      >
        {plantEmoji}
      </div>

      {/* ── Act 2: Phone mockup ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "7%",
          opacity: phoneOpacity,
          transform: `translateX(${phoneXOffset}px) translateY(-50%)`,
          width: 206,
          height: 366,
          backgroundColor: "#1C1C1E",
          borderRadius: 38,
          padding: 8,
          boxShadow: "0 20px 64px rgba(0,0,0,0.38), 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Screen */}
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#F8F5F0",
            borderRadius: 30,
            overflow: "hidden",
            padding: "14px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* Status bar */}
          <div style={{ fontSize: 10, color: "#aaa", textAlign: "center", fontWeight: 700, letterSpacing: "0.5px" }}>
            GREENMATE
          </div>

          {/* Watering reminder card */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: 14,
              padding: "11px 13px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
              opacity: cardOpacity,
            }}
          >
            <div style={{ fontSize: 10, color: "#2D6A4F", fontWeight: 800, marginBottom: 3 }}>💧 물 주기 알림</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1B3A2D" }}>🌱 몬스테라</div>
            <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>오늘 물 줄 날이에요!</div>
          </div>

          {/* AI chat bubble */}
          <div
            style={{
              backgroundColor: "#EAF4EE",
              borderRadius: "13px 13px 13px 4px",
              padding: "10px 12px",
              opacity: chatOpacity,
            }}
          >
            <div style={{ fontSize: 10, color: "#2D6A4F", fontWeight: 800, marginBottom: 3 }}>🤖 AI 전문가</div>
            <div style={{ fontSize: 11, color: "#333", lineHeight: 1.6 }}>
              잎이 노래진다면
              <br />
              과습일 수 있어요 🤔
            </div>
          </div>

          {/* Day counter badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              backgroundColor: "rgba(45,106,79,0.1)",
              borderRadius: 20,
              padding: "5px 10px",
              alignSelf: "flex-start",
              opacity: cardOpacity,
            }}
          >
            <span style={{ fontSize: 10 }}>🗓</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#2D6A4F" }}>14일째</span>
          </div>
        </div>
      </div>

      {/* ── Act 3: Brand reveal ── */}
      <div style={{ position: "absolute", inset: 0, opacity: act3Opacity, pointerEvents: "none" }}>
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(45,106,79,0.13) 0%, transparent 68%)",
          }}
        />

        {/* Headline */}
        <div
          style={{
            position: "absolute",
            bottom: "28%",
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: hlOpacity,
            transform: `scale(${hlScale})`,
          }}
        >
          <div style={{ fontSize: 46, fontWeight: 900, color: "#1B3A2D", letterSpacing: "-0.5px" }}>
            내 식물, 이젠 안 죽어
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            position: "absolute",
            bottom: "19%",
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: subOpacity,
            color: "#4A7C59",
            fontSize: 20,
            fontWeight: 400,
            letterSpacing: "0.5px",
          }}
        >
          AI가 지켜주는 홈 가드닝
        </div>

        {/* CTA pill */}
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: ctaOpacity,
            backgroundColor: "#2D6A4F",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            padding: "12px 28px",
            borderRadius: 999,
            whiteSpace: "nowrap",
            letterSpacing: "0.3px",
            boxShadow: "0 4px 20px rgba(45,106,79,0.35)",
          }}
        >
          무료로 시작하기 →
        </div>
      </div>
    </AbsoluteFill>
  )
}

// ─── Player wrapper (exported) ────────────────────────────────────────────────

export function HeroAnimation() {
  return (
    <Player
      component={PlantStory}
      durationInFrames={300}
      fps={30}
      compositionWidth={800}
      compositionHeight={500}
      style={{ width: "100%", borderRadius: 24, overflow: "hidden" }}
      autoPlay
      loop
    />
  )
}
