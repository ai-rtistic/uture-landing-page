import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * 유쳐 히어로 배경 — "프로스트 글라스 타일 행렬" (examples/TWL_Web_Generate 스타일의
 * 유쳐 재창작). 둥근 사각 타일들이 대각선 두 줄로 느리게 행진한다.
 * 핵심 룩 = 타일 내부의 불규칙한 색 패치(시드 랜덤 radial-gradient 3~4겹).
 * 심리스 루프: 한 루프 동안 정확히 M칸 전진 + 외형 시드가 (slot mod M) 주기.
 */

const BG = "#f5f5f5";
// 유쳐 웜 팔레트 — 오렌지 리드(가중), 크림/앰버 보조, 초콜릿 톤 소량
const PALETTE = [
  "#ff7a33",
  "#ff7a33",
  "#ff8a3f",
  "#ff9e6b",
  "#ffb257",
  "#efb34a",
  "#ffd9ae",
  "#fff3e4",
  "#ffffff",
  "#e0954f",
  "#8a5a2e",
];

/** 타일 내부 — 서리 유리 너머로 색 덩어리가 비치는 느낌 (패치 코어를 진하게) */
function tileBackground(seed: string): string {
  const layers: string[] = [];
  // 광택 밴드 — 절반 확률로 가로 빛줄기
  if (random(`${seed}-band`) > 0.45) {
    const by = 30 + random(`${seed}-by`) * 40;
    layers.push(
      `linear-gradient(178deg, transparent ${by - 18}%, rgba(255,250,244,0.85) ${by - 5}%, #fffdf9 ${by}%, rgba(255,250,244,0.85) ${by + 5}%, transparent ${by + 18}%)`,
    );
  }
  const n = 4 + Math.floor(random(`${seed}-n`) * 2); // 4~5 패치
  for (let i = 0; i < n; i++) {
    const c = PALETTE[Math.floor(random(`${seed}-c${i}`) * PALETTE.length)];
    const x = -10 + random(`${seed}-x${i}`) * 120; // 가장자리 밖까지 허용
    const y = -10 + random(`${seed}-y${i}`) * 120;
    const w = 60 + random(`${seed}-w${i}`) * 85;
    const h = w * (0.55 + random(`${seed}-h${i}`) * 0.55);
    // 코어를 진하게 유지하다 부드럽게 소멸 — 레퍼런스의 '덩어리감'
    layers.push(
      `radial-gradient(${w}% ${h}% at ${x}% ${y}%, ${c} 0%, ${c} 32%, transparent 64%)`,
    );
  }
  layers.push("linear-gradient(115deg, #fff6ec 0%, #ffd9b0 100%)");
  return layers.join(", ");
}

type Row = {
  id: string;
  yFrom: number; // u=0에서의 y(%)
  yTo: number; // u=1에서의 y(%)
  wBase: number; // 타일 기준 폭(px)
  spacing: number; // 슬롯 간격 (u 단위)
  period: number; // 외형 반복 주기 M (한 루프에 M칸 전진)
  dir: 1 | -1; // 행진 방향
  z: number;
  fadeLeft: boolean; // 좌측(텍스트 존)에서 서서히 사라짐
};

// 페이지 좌측 텍스트 존을 피해: 상단 행은 높게, 하단 행은 좌측에서 페이드 아웃
const ROWS: Row[] = [
  { id: "top", yFrom: 1, yTo: 13, wBase: 220, spacing: 0.125, period: 7, dir: -1, z: 1, fadeLeft: false },
  { id: "bot", yFrom: 72, yTo: 98, wBase: 460, spacing: 0.165, period: 6, dir: 1, z: 2, fadeLeft: true },
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
          // u: -0.15 ~ 1.15 범위를 도는 슬롯 위치
          const raw = k * row.spacing + shift;
          const span = count * row.spacing;
          const u = ((raw % span) + span) % span; // 0..span 랩
          const uu = u - 0.15; // 화면 좌표계로
          // 외형 시드: 랩을 고려한 절대 슬롯 → mod period (심리스 조건)
          const slot = (((k - Math.floor((raw - u) / row.spacing)) % row.period) + row.period) % row.period;
          const seed = `${row.id}-${slot}`;
          const x = uu * 130 - 15 + 15 + (random(`${seed}-jx`) - 0.5) * 3; // -15% ~ 115% + 지터
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
          // 좌측 텍스트 존 페이드 — x에 연속적이라 행진 중 팝 없음
          const fade = row.fadeLeft ? Math.max(0, Math.min(1, (x - 24) / 24)) : 1;
          if (fade === 0) return null;
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
                background: tileBackground(seed),
                boxShadow:
                  "inset 0 2px 10px rgba(255,255,255,0.65), inset 0 -8px 24px rgba(160,90,30,0.12), 0 24px 48px -28px rgba(150,80,25,0.25)",
                opacity: fade,
                zIndex: row.z,
              }}
            />
          );
        });
      })}
    </AbsoluteFill>
  );
};
