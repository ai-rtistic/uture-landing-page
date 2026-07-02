import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * 유쳐 히어로 배경 — 프로스트 글라스 체인 루프 (심리스).
 * progress = frame / durationInFrames 이고 모든 주기 항이 정수 사이클이라
 * 마지막 프레임 == 첫 프레임 → 끊김 없는 루프.
 * 페이지 배경(#f5f5f5)을 구워 H.264로 렌더 → iOS 포함 전 기기 재생.
 */

const BG = "#f5f5f5";
const ORANGE = "#ff7a33";
const PEACH = "#ff9e6b";

type Pt = [number, number];
const bez = (t: number, p0: Pt, p1: Pt, p2: Pt): Pt => {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ];
};

// 우상단 화면 밖 → 중앙 관통 → 좌하단 화면 밖 (양끝이 밖 → 루프 은폐)
const P0: Pt = [108, -6];
const P1: Pt = [62, 34];
const P2: Pt = [20, 118];
const N = 26;
const ACCENT = 15;

// 좌상단 정적 보조 체인
const SUB = Array.from({ length: 9 }, (_, i) => {
  const t = i / 8;
  const [x, y] = bez(t, [-6, 24], [12, 9], [28, -9]);
  return { x, y, w: 122 - 48 * t + 10 * Math.sin(i * 1.7), rot: -34 + 18 * t };
});

const GLASS_BODY =
  "linear-gradient(118deg, #fafaf9 0%, #eae7e4 32%, #d2cfca 58%, #dedbd7 76%, #f4f2f0 100%)";
const GLASS_HI =
  "radial-gradient(105% 85% at 30% 20%, rgba(255,255,255,0.95), rgba(255,255,255,0) 56%)";
const ORANGE_BODY = `linear-gradient(118deg, #ffd2ae 0%, ${PEACH} 36%, ${ORANGE} 66%, #ff9754 84%, #ffc49b 100%)`;
const ORANGE_HI =
  "radial-gradient(105% 85% at 30% 20%, rgba(255,236,220,0.95), rgba(255,236,220,0) 56%)";

function beadStyle(
  xPct: number,
  yPct: number,
  w: number,
  rot: number,
  blur: number,
  opacity: number,
  accent: boolean,
  z: number,
): React.CSSProperties {
  return {
    position: "absolute",
    left: `${xPct}%`,
    top: `${yPct}%`,
    width: w,
    height: w * 0.66,
    transform: `translate(-50%, -50%) rotate(${rot}deg)`,
    borderRadius: "42% / 52%",
    background: `${accent ? ORANGE_HI : GLASS_HI}, ${accent ? ORANGE_BODY : GLASS_BODY}`,
    boxShadow: accent
      ? "inset 0 3px 7px rgba(255,244,235,0.95), inset 0 -16px 34px rgba(190,78,10,0.22), 0 24px 52px -30px rgba(255,122,51,0.4)"
      : "inset 0 3px 7px rgba(255,255,255,0.9), inset 0 -16px 34px rgba(29,28,27,0.1), 0 24px 52px -34px rgba(29,28,27,0.22)",
    filter: blur > 0.2 ? `blur(${blur}px)` : undefined,
    opacity,
    zIndex: z,
  };
}

export const HeroChain: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const p = frame / durationInFrames; // 0 → 1, 심리스

  // 강체 호흡 — 정수 사이클(1회)이라 루프 유지
  const breathe = Math.sin(2 * Math.PI * p);
  const rigRot = breathe * 0.9;
  const rigY = breathe * -14;

  const beads = Array.from({ length: N }, (_, i) => {
    const t = (i / N + p) % 1;
    const [x, y] = bez(t, P0, P1, P2);
    // 접선 (px 공간 기준)
    const [ax, ay] = bez(Math.max(0, t - 0.015), P0, P1, P2);
    const [cx, cy] = bez(Math.min(1, t + 0.015), P0, P1, P2);
    const rot =
      (Math.atan2(((cy - ay) / 100) * height, ((cx - ax) / 100) * width) * 180) / Math.PI;
    // 가까울수록(경로 시작) 크다 — 1920 캔버스 기준 스케일
    const w = 320 - 218 * t + 18 * Math.sin(i * 1.7);
    // 심도: 근경 크게 블러 · 중경 쨍하게 · 원경 살짝 블러 (프레임 단위 연속값)
    const nearBlur = Math.max(0, ((w - 262) / 60) * 12);
    const farBlur = Math.max(0, ((140 - w) / 50) * 2.2);
    const blur = nearBlur + farBlur;
    const opacity = w > 262 ? 0.9 : w > 140 ? 0.96 : 0.74;
    return { x, y, w, rot, blur, opacity, accent: i === ACCENT, z: i };
  });

  return (
    <AbsoluteFill style={{ background: BG }}>
      <AbsoluteFill
        style={{ transform: `translateY(${rigY}px) rotate(${rigRot}deg)` }}
      >
        {SUB.map((b, i) => (
          <div
            key={`s${i}`}
            style={beadStyle(b.x, b.y, b.w, b.rot, 2, 0.72, false, i)}
          />
        ))}
        {beads.map((b, i) => (
          <div
            key={i}
            style={beadStyle(b.x, b.y, b.w, b.rot, b.blur, b.opacity, b.accent, 20 + b.z)}
          />
        ))}
        {/* 초대형 전경 보케 — 모서리에 크게 걸쳐 잘림 */}
        <div
          style={{
            ...beadStyle(74, -16, 720, -24, 34, 0.68, false, 60),
            background: `${ORANGE_HI}, linear-gradient(118deg, #ffd8b8 0%, ${PEACH} 45%, #ff9457 75%, #ffc9a2 100%)`,
          }}
        />
        <div style={beadStyle(-7, 104, 640, 18, 30, 0.82, false, 61)} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
