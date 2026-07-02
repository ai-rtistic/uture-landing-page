import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * 유쳐 히어로 배경 v2 — "프로스트 글라스 타일 행렬" (TWL_Web_Generate 문법의 재창작).
 * 스킬 메인 듀얼 컬러: 상단 행 = 보라 계열, 하단 행 = 주황 계열 → 화면 전체가
 * 오로라(보라→주황)의 공간적 번역이 된다.
 * v1 대비: 좌측 페이드 베이크 제거 — 타일이 행진 중 투명해졌다 나타나며 생기던
 * '깜박임'의 원인. 텍스트 존 보호는 페이지 CSS mask가 담당한다.
 * 심리스 루프: 한 루프에 정확히 M칸 전진 + 외형 시드 (slot mod M) 주기.
 */

const BG = "#f5f5f5";

// 주황 계열 (warm)
const WARM = [
  "#ff7a33",
  "#ff7a33",
  "#ff8a3f",
  "#ff9e6b",
  "#ffb257",
  "#ffd9ae",
  "#fff3e4",
  "#ffffff",
  "#e0954f",
];
// 보라 계열 (skill main: lavender-purple)
const PURPLE = [
  "#b79cf7",
  "#b79cf7",
  "#c9b2f9",
  "#d9c2fc",
  "#e9d5fc",
  "#f3ecff",
  "#ffffff",
  "#a98ae8",
  "#8f6fe0",
];

/** 타일 내부 — 서리 유리 너머로 색 덩어리가 비치는 느낌 (패치 코어를 진하게) */
function tileBackground(seed: string, palette: string[], base: [string, string]): string {
  const layers: string[] = [];
  // 광택 밴드 — 절반 확률로 가로 빛줄기
  if (random(`${seed}-band`) > 0.45) {
    const by = 30 + random(`${seed}-by`) * 40;
    layers.push(
      `linear-gradient(178deg, transparent ${by - 18}%, rgba(255,252,248,0.85) ${by - 5}%, #fffefb ${by}%, rgba(255,252,248,0.85) ${by + 5}%, transparent ${by + 18}%)`,
    );
  }
  const n = 4 + Math.floor(random(`${seed}-n`) * 2); // 4~5 패치
  for (let i = 0; i < n; i++) {
    const c = palette[Math.floor(random(`${seed}-c${i}`) * palette.length)];
    const x = -10 + random(`${seed}-x${i}`) * 120;
    const y = -10 + random(`${seed}-y${i}`) * 120;
    const w = 60 + random(`${seed}-w${i}`) * 85;
    const h = w * (0.55 + random(`${seed}-h${i}`) * 0.55);
    layers.push(
      `radial-gradient(${w}% ${h}% at ${x}% ${y}%, ${c} 0%, ${c} 32%, transparent 64%)`,
    );
  }
  layers.push(`linear-gradient(115deg, ${base[0]} 0%, ${base[1]} 100%)`);
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
  palette: string[];
  base: [string, string];
  shadowTint: string;
};

// 상단 = 보라(오로라의 시작), 하단 = 주황(오로라의 끝)
const ROWS: Row[] = [
  {
    id: "top",
    yFrom: 1,
    yTo: 13,
    wBase: 220,
    spacing: 0.125,
    period: 7,
    dir: -1,
    z: 1,
    palette: PURPLE,
    base: ["#f8f4ff", "#ded0f9"],
    shadowTint: "rgba(120, 90, 200, 0.22)",
  },
  {
    id: "bot",
    yFrom: 72,
    yTo: 98,
    wBase: 460,
    spacing: 0.165,
    period: 6,
    dir: 1,
    z: 2,
    palette: WARM,
    base: ["#fff6ec", "#ffd9b0"],
    shadowTint: "rgba(160, 90, 30, 0.25)",
  },
];

export const TileFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const p = frame / durationInFrames; // 0 → 1 심리스

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
          // 외형 시드: 랩을 고려한 절대 슬롯 → mod period (심리스 조건)
          const slot =
            (((k - Math.floor((raw - u) / row.spacing)) % row.period) + row.period) % row.period;
          const seed = `${row.id}-${slot}`;
          const x = uu * 130 - 15 + 15 + (random(`${seed}-jx`) - 0.5) * 3;
          const y =
            row.yFrom +
            (row.yTo - row.yFrom) * ((x + 15) / 130) +
            (random(`${seed}-jy`) - 0.5) * 4;
          const w =
            row.wBase *
            (0.6 + random(`${seed}-s`) * 0.7) *
            (1 + 0.7 * Math.abs((x - 50) / 65)); // 가장자리로 갈수록 큼 (원근)
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
                borderRadius: Math.min(w, h) * 0.36,
                background: tileBackground(seed, row.palette, row.base),
                boxShadow: `inset 0 2px 10px rgba(255,255,255,0.65), inset 0 -8px 24px ${row.shadowTint.replace("0.2", "0.1")}, 0 24px 48px -28px ${row.shadowTint}`,
                zIndex: row.z,
              }}
            />
          );
        });
      })}
    </AbsoluteFill>
  );
};
