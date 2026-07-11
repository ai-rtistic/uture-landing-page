import React from "react";
import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * 히어로 배경 후보 3종 — "기업 담당자에게 전문적으로" 리디자인 시안.
 * 공통: 2400×950 · 12s 심리스 루프 · FP-안전 slot 산술(TileFlow 학습) · 라이트 호스트.
 *  A HeroInk        모노크롬 잉크 와이어프레임 — 최대 절제, 오렌지 강조 1개
 *  B HeroAuroraCalm 현 오로라 컨셉의 톤다운 성숙판 — 채도↓ 크기↑ 속도↓
 *  C HeroLanes      시스템 레인 — 헤어라인 레일 위를 캡슐 노드가 활주 (엔지니어링 무드)
 */

const BG = "#f5f5f5";
const ORANGE = "#ff8a3c";

/* ---------- 공용: 심리스 행진 행 (TileFlow 검증 산술) ---------- */
type RowCfg = {
  id: string;
  yFrom: number;
  yTo: number;
  wBase: number;
  spacing: number;
  period: number;
  dir: 1 | -1;
};
type TileT = { x: number; y: number; w: number; h: number; rot: number; seed: string; slot: number; k: number };

function marchRow(row: RowCfg, p: number, width: number, height: number): TileT[] {
  const angle = (Math.atan2(((row.yTo - row.yFrom) / 100) * height, 1.3 * width) * 180) / Math.PI;
  // count는 period 배수 — 랩 시 slot 보존 (팝 방지)
  const count = Math.ceil((Math.ceil(1.3 / row.spacing) + row.period + 2) / row.period) * row.period;
  const span = count * row.spacing;
  const shift = p * row.period * row.spacing * row.dir;
  return Array.from({ length: count }, (_, k) => {
    const raw = k * row.spacing + shift;
    const u = ((raw % span) + span) % span;
    // 정수여야 하는 값 — floor 금지, round로 스냅 (FP 노이즈 스트로브 방지)
    const slot = (((k - Math.round((raw - u) / row.spacing)) % row.period) + row.period) % row.period;
    const seed = `${row.id}-${slot}`;
    const x = (u - 0.15) * 130 + (random(`${seed}-jx`) - 0.5) * 3;
    const y = row.yFrom + (row.yTo - row.yFrom) * ((x + 15) / 130) + (random(`${seed}-jy`) - 0.5) * 4;
    const w = row.wBase * (0.55 + random(`${seed}-s`) * 0.85) * (1 + 0.45 * Math.abs((x - 50) / 65));
    const h = w * (0.5 + random(`${seed}-a`) * 0.35);
    const rot = angle + (random(`${seed}-r`) - 0.5) * 7;
    return { x, y, w, h, rot, seed, slot, k };
  });
}

const ROWS: RowCfg[] = [
  { id: "top", yFrom: 1, yTo: 14, wBase: 235, spacing: 0.108, period: 3, dir: -1 },
  { id: "bot", yFrom: 71, yTo: 98, wBase: 330, spacing: 0.138, period: 2, dir: 1 },
];

/* ================= A — 잉크 와이어프레임 ================= */
export const HeroInk: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const p = frame / durationInFrames;
  return (
    <AbsoluteFill style={{ background: BG }}>
      {ROWS.map((row, ri) =>
        marchRow(row, p, width, height).map((t) => {
          const warm = random(`${t.seed}-warm`) < 0.3;
          return (
            <div
              key={t.k}
              style={{
                position: "absolute",
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: t.w,
                height: t.h,
                transform: `translate(-50%, -50%) rotate(${t.rot}deg)`,
                borderRadius: Math.min(t.w, t.h) * 0.38,
                border: `1.25px solid rgba(43,39,36,0.16)`,
                background: warm ? "#f0ede8" : "#fdfdfc",
                boxShadow: "0 10px 30px -22px rgba(29,28,27,0.18)",
              }}
            />
          );
        }),
      )}
    </AbsoluteFill>
  );
};

/* ================= B — 오로라 톤다운 성숙판 ================= */
// 뮤트 스펙트럼: 그레이 라벤더 → 크림 → 소프트 피치 (채도 대폭 다운)
const MUTED = ["#d7cbe9", "#e6ddf1", "#efe9f2", "#f4efe9", "#f6e9db", "#f2dcc4", "#eccda6"];
const NEUTRAL = ["#ffffff", "#faf7f2", "#f4f1ec"];
function mutedTile(seed: string): string {
  const idx = random(`${seed}-h`) * (MUTED.length - 1);
  const pick = (j: string, spread: number) => {
    const v = idx + (random(`${seed}-${j}`) - 0.5) * spread * (MUTED.length - 1);
    return MUTED[Math.max(0, Math.min(MUTED.length - 1, Math.round(v)))];
  };
  const layers: string[] = [];
  const n = 3 + Math.floor(random(`${seed}-n`) * 2);
  for (let i = 0; i < n; i++) {
    const c =
      random(`${seed}-nu${i}`) < 0.45
        ? NEUTRAL[Math.floor(random(`${seed}-nn${i}`) * NEUTRAL.length)]
        : pick(`p${i}`, 0.4);
    const x = -10 + random(`${seed}-x${i}`) * 120;
    const y = -10 + random(`${seed}-y${i}`) * 120;
    const w = 70 + random(`${seed}-w${i}`) * 80;
    const hh = w * (0.55 + random(`${seed}-hh${i}`) * 0.5);
    layers.push(`radial-gradient(${w}% ${hh}% at ${x}% ${y}%, ${c} 0%, transparent 74%)`);
  }
  layers.push(`linear-gradient(115deg, ${NEUTRAL[1]} 0%, ${pick("b0", 0.2)} 130%)`);
  return layers.join(", ");
}

export const HeroAuroraCalm: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const p = frame / durationInFrames;
  return (
    <AbsoluteFill style={{ background: BG }}>
      {ROWS.map((row) =>
        marchRow(row, p, width, height).map((t) => {
          const blur = Math.max(0, Math.min(8, (t.w - 430) / 55));
          return (
            <div
              key={t.k}
              style={{
                position: "absolute",
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: t.w,
                height: t.h,
                transform: `translate(-50%, -50%) rotate(${t.rot}deg)`,
                borderRadius: Math.min(t.w, t.h) * 0.42,
                background: mutedTile(t.seed),
                boxShadow:
                  "inset 0 2px 14px rgba(255,255,255,0.6), 0 24px 48px -30px rgba(110,95,85,0.22)",
                filter: blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : undefined,
              }}
            />
          );
        }),
      )}
    </AbsoluteFill>
  );
};

/* ================= C — 시스템 레인 ================= */
type Lane = { y: number; dir: 1 | -1; period: number; spacing: number; h: number };
const LANES: Lane[] = [
  { y: 10, dir: -1, period: 3, spacing: 0.17, h: 78 },
  { y: 36, dir: 1, period: 2, spacing: 0.21, h: 96 },
  { y: 63, dir: -1, period: 2, spacing: 0.24, h: 112 },
  { y: 89, dir: 1, period: 3, spacing: 0.18, h: 84 },
];

export const HeroLanes: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  const p = frame / durationInFrames;
  return (
    <AbsoluteFill style={{ background: BG }}>
      {LANES.map((lane, li) => (
        <React.Fragment key={li}>
          {/* 레일 — 헤어라인 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${lane.y}%`,
              height: 1.25,
              background: "rgba(43,39,36,0.12)",
            }}
          />
          {li !== 1 && marchRow(
            { id: `lane${li}`, yFrom: lane.y, yTo: lane.y, wBase: 300, spacing: lane.spacing, period: lane.period, dir: lane.dir },
            p,
            width,
            height,
          ).map((t) => {
            const w = t.w * 0.9;
            return (
              <div
                key={t.k}
                style={{
                  position: "absolute",
                  left: `${t.x}%`,
                  top: `${lane.y}%`,
                  width: w,
                  height: lane.h,
                  transform: "translate(-50%, -50%)",
                  borderRadius: 999,
                  border: "1.25px solid rgba(43,39,36,0.16)",
                  background: random(`${t.seed}-w2`) < 0.25 ? "#f0ede8" : "#fdfdfc",
                  boxShadow: "0 10px 30px -24px rgba(29,28,27,0.16)",
                }}
              />
            );
          })}
        </React.Fragment>
      ))}
      {/* 오렌지 강조 캡슐 — 비워둔 2번 레일을 루프당 1회 활주 (전체 강조 정확히 1개) */}
      <div
        style={{
          position: "absolute",
          left: `${((p * 162 + 70) % 162) - 16}%`,
          top: "36%",
          width: 320,
          height: 96,
          transform: "translate(-50%, -50%)",
          borderRadius: 999,
          background: ORANGE,
          boxShadow: "0 18px 40px -24px rgba(255,138,60,0.5)",
        }}
      />
    </AbsoluteFill>
  );
};
