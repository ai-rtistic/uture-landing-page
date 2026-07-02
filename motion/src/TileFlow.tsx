import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * 유쳐 히어로 배경 v3 — TWL_Web_Generate 문법의 유쳐 재창작.
 * v2 대비:
 *  - 색: 행별 분리 → 오로라 스펙트럼(보라↔핑크↔주황) 블렌딩. 타일마다 스펙트럼 위의
 *    위치(h)를 갖고, 패치는 h 주변 색만 뽑아 타일 내부가 부드러운 그라데이션이 된다.
 *  - 깜박임 제거: 날카로운 흰 광택 밴드 삭제(스트로브의 원인), 패치 코어 소프트화.
 *  - 에이전트 주석: 잉크 와이어프레임(문서 카드 + 리더 라인 + 스파클 칩 + 라벨 필)이
 *    스트림 위에 순환 등장 — "AI 에이전트가 콘텐츠에 작업 중"의 표현.
 * 심리스 루프: 타일은 (slot mod M) 시드 + 정확히 M칸 전진, 주석은 (p+offset)%1 윈도우.
 */

const BG = "#f5f5f5";
const INK = "#2b2724";

// 오로라 스펙트럼: 보라 → 라일락 → 핑크 브릿지 → 피치 → 주황 → 골드
const SPECTRUM = [
  "#8f6fe0",
  "#b79cf7",
  "#c9b2f9",
  "#d9c2fc",
  "#e8d9fb",
  "#f2c9e0",
  "#f7bfd3",
  "#ffc9b0",
  "#ffb257",
  "#ff9e6b",
  "#ff8a3f",
  "#ff7a33",
  "#e0954f",
];
const NEUTRALS = ["#ffffff", "#fff6ec", "#f6f0fb"];

/** 타일 내부 — 스펙트럼 위치 h 주변의 색들이 서리 유리 너머로 번지듯 블렌딩 */
function tileBackground(seed: string): string {
  const h = random(`${seed}-h`); // 0=보라 ~ 1=주황
  const idx = h * (SPECTRUM.length - 1);
  const pick = (jitter: string, spread: number) => {
    const j = idx + (random(`${seed}-${jitter}`) - 0.5) * spread * (SPECTRUM.length - 1);
    return SPECTRUM[Math.max(0, Math.min(SPECTRUM.length - 1, Math.round(j)))];
  };
  const layers: string[] = [];
  const n = 4 + Math.floor(random(`${seed}-n`) * 2);
  for (let i = 0; i < n; i++) {
    // 30%는 뉴트럴(흰빛) 패치 — 서리 유리의 밝은 숨구멍
    const c =
      random(`${seed}-nu${i}`) < 0.3
        ? NEUTRALS[Math.floor(random(`${seed}-nn${i}`) * NEUTRALS.length)]
        : pick(`p${i}`, 0.5);
    const x = -10 + random(`${seed}-x${i}`) * 120;
    const y = -10 + random(`${seed}-y${i}`) * 120;
    const w = 65 + random(`${seed}-w${i}`) * 85;
    const hh = w * (0.55 + random(`${seed}-hh${i}`) * 0.55);
    // 소프트 코어 — 하드 엣지 금지 (깜박임 인상의 원인)
    layers.push(`radial-gradient(${w}% ${hh}% at ${x}% ${y}%, ${c} 0%, transparent 74%)`);
  }
  const base0 = pick("b0", 0.25);
  layers.push(`linear-gradient(115deg, ${NEUTRALS[1]} 0%, ${base0} 130%)`);
  return layers.join(", ");
}

type Row = {
  id: string;
  yFrom: number;
  yTo: number;
  wBase: number;
  spacing: number;
  period: number;
  dir: 1 | -1;
  z: number;
};

const ROWS: Row[] = [
  { id: "top", yFrom: 1, yTo: 14, wBase: 235, spacing: 0.118, period: 7, dir: -1, z: 1 },
  { id: "bot", yFrom: 71, yTo: 98, wBase: 470, spacing: 0.155, period: 6, dir: 1, z: 2 },
];

/* ---- 에이전트 주석: 잉크 와이어프레임 (순환 등장, 심리스) ---- */
const ANNS = [
  { x: 46, y: 22, drop: 96, label: "보고서 요약", offset: 0.0, flip: false },
  { x: 63, y: 66, drop: 88, label: "메일 분류", offset: 1 / 3, flip: true },
  { x: 52, y: 64, drop: 88, label: "초안 작성", offset: 2 / 3, flip: true },
];

/** 주석 가시성 — (p+offset)%1 이 [0, 0.34] 윈도우일 때 페이드 인/아웃 (루프 안전) */
function annOpacity(p: number, offset: number): number {
  const t = (p + offset) % 1;
  const IN = 0.05;
  const HOLD = 0.24;
  const OUT = 0.34;
  if (t < IN) return t / IN;
  if (t < HOLD) return 1;
  if (t < OUT) return 1 - (t - HOLD) / (OUT - HOLD);
  return 0;
}

const Sparkle = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinejoin="round">
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
  </svg>
);
const DocIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round">
    <path d="M6 4h12v16H6z M9 9h6 M9 13h6" />
  </svg>
);

const Annotation: React.FC<{ a: (typeof ANNS)[number]; p: number }> = ({ a, p }) => {
  const o = annOpacity(p, a.offset);
  if (o <= 0.01) return null;
  const chipStyle: React.CSSProperties = {
    width: 44,
    height: 44,
    border: `2px solid ${INK}`,
    borderRadius: 14,
    display: "grid",
    placeItems: "center",
    background: "rgba(245,245,245,0.72)",
  };
  const card = (
    <div
      style={{
        width: 200,
        height: 122,
        border: `2px solid ${INK}`,
        borderRadius: 28,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 12,
        padding: "0 34px",
        background: "rgba(245,245,245,0.72)",
      }}
    >
      {[86, 62, 74].map((w, i) => (
        <div key={i} style={{ width: `${w}%`, height: 3.5, borderRadius: 2, background: INK, opacity: 0.85 }} />
      ))}
    </div>
  );
  const leader = <div style={{ width: 2, height: a.drop, background: INK, opacity: 0.8 }} />;
  const chips = (
    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
      <span style={chipStyle}><DocIcon /></span>
      <span style={chipStyle}><Sparkle /></span>
      <span
        style={{
          border: `1.5px solid ${INK}`,
          borderRadius: 999,
          padding: "9px 22px",
          fontSize: 24,
          fontWeight: 500,
          color: INK,
          fontFamily: "'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', -apple-system, sans-serif",
          background: "rgba(245,245,245,0.72)",
          whiteSpace: "nowrap",
        }}
      >
        {a.label}
      </span>
    </div>
  );
  return (
    <div
      style={{
        position: "absolute",
        left: `${a.x}%`,
        top: `${a.y}%`,
        transform: `translate(-50%, ${a.flip ? "-100%" : "0"}) translateY(${(1 - o) * 8}px)`,
        display: "flex",
        flexDirection: a.flip ? "column-reverse" : "column",
        alignItems: "center",
        gap: 13,
        opacity: o,
        zIndex: 10,
      }}
    >
      {card}
      {leader}
      {chips}
    </div>
  );
};

export const TileFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const p = frame / durationInFrames;

  return (
    <AbsoluteFill style={{ background: BG }}>
      {ROWS.map((row) => {
        const angle =
          (Math.atan2(((row.yTo - row.yFrom) / 100) * height, 1.3 * width) * 180) / Math.PI;
        const count = Math.ceil(1.3 / row.spacing) + row.period + 2;
        const shift = p * row.period * row.spacing * row.dir;
        return Array.from({ length: count }, (_, k) => {
          const raw = k * row.spacing + shift;
          const span = count * row.spacing;
          const u = ((raw % span) + span) % span;
          const uu = u - 0.15;
          const slot =
            (((k - Math.floor((raw - u) / row.spacing)) % row.period) + row.period) % row.period;
          const seed = `${row.id}-${slot}`;
          const x = uu * 130 + (random(`${seed}-jx`) - 0.5) * 3;
          const y =
            row.yFrom +
            (row.yTo - row.yFrom) * ((x + 15) / 130) +
            (random(`${seed}-jy`) - 0.5) * 4;
          const w =
            row.wBase *
            (0.55 + random(`${seed}-s`) * 0.85) *
            (1 + 0.65 * Math.abs((x - 50) / 65));
          const h = w * (0.55 + random(`${seed}-a`) * 0.35);
          const rot = angle + (random(`${seed}-r`) - 0.5) * 7;
          return (
            <div
              key={k}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                width: w,
                height: h,
                transform: `translate(-50%, -50%) rotate(${rot}deg)`,
                borderRadius: Math.min(w, h) * 0.38,
                background: tileBackground(seed),
                boxShadow:
                  "inset 0 2px 14px rgba(255,255,255,0.55), inset 0 -10px 30px rgba(120,80,60,0.08), 0 24px 48px -30px rgba(120,80,90,0.25)",
                zIndex: row.z,
              }}
            />
          );
        });
      })}
      {ANNS.map((a) => (
        <Annotation key={a.label} a={a} p={p} />
      ))}
    </AbsoluteFill>
  );
};
