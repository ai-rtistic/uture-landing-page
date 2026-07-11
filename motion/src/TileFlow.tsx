import React from "react";
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

/** 타일 내부 — 스펙트럼 위치 h 주변의 색들이 서리 유리 너머로 번지듯 블렌딩 (OgCard에서 재사용) */
export function tileBackground(seed: string): string {
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
  band: [number, number];
};

// band는 페이지 임베드 기준으로 잡는다 (페이지 CSS는 불변, 영상이 페이지에 맞춘다):
// 오른쪽 한계 63.5 = uture agent 패널(뷰포트 ~65.6%) 회피. 왼쪽은 46까지 —
// 텍스트 마스크가 서서히 옅어지는 구간(불투명도 ~0.85+)이라 주석이 은은하게
// 떠오르며 등장해도 자연스럽다. period를 낮춰(7→5, 6→4) 행진을 ~30% 감속:
// 주석이 스트립에 ~6초 머물고(빌드 2.1s + 홀드 2.8s + 페이드 1.2s) 필드도 차분해진다.
const ROWS: Row[] = [
  { id: "top", yFrom: 1, yTo: 14, wBase: 225, spacing: 0.108, period: 5, dir: -1, z: 1, band: [46, 63.5] },
  { id: "bot", yFrom: 71, yTo: 98, wBase: 320, spacing: 0.138, period: 4, dir: 1, z: 2, band: [46, 63.5] },
];

/* ---- 에이전트 주석: 특정 slot 타일에 부착되어 함께 행진 (레퍼런스 문법) ----
 * 가시성은 타일 x좌표의 순수 함수(band 게이트)라 루프 심리스가 자동 보장된다.
 * 같은 slot 인스턴스 간 간격(period×spacing×130%)이 band 폭보다 넓어
 * 동시에 두 개가 보일 수 없고, slot당 한 루프에 정확히 1회 등장한다.
 * 스태거(시뮬레이션 결과): 보고서 요약 0.5~6.7s → 초안 작성 10.5~16.7s → 메일 분류 16.6~22.6s
 * (초안 작성이 위에서 사라질 때 메일 분류가 아래에서 생성되는 릴레이) */
type Ann = { row: string; slot: number; label: string; card: "list" | "lines" | "tags"; below: boolean };
const ANNS: Ann[] = [
  { row: "top", slot: 1, label: "보고서 요약", card: "list", below: true },
  { row: "top", slot: 3, label: "초안 작성", card: "lines", below: true },
  { row: "bot", slot: 1, label: "메일 분류", card: "tags", below: false },
];

/** 빌드 진행도 — 밴드 진입 가장자리에서부터 이동 거리(x의 순수 함수, 루프 안전).
 * 진입 후 BUILD(%)를 이동하는 동안 0→1: 주석이 '생성되는' 시퀀스를 구동한다. */
const BUILD = 6;
function buildProgress(x: number, band: [number, number], dir: 1 | -1): number {
  const g = dir === -1 ? (band[1] - x) / BUILD : (x - band[0]) / BUILD;
  return Math.max(0, Math.min(1, g));
}
/** 퇴장 페이드 — 반대쪽 가장자리 feather 구간 */
function exitFade(x: number, band: [number, number], dir: 1 | -1): number {
  const f = dir === -1 ? (x - band[0]) / 3.5 : (band[1] - x) / 3.5;
  return Math.max(0, Math.min(1, f));
}
const clamp01 = (t: number) => Math.max(0, Math.min(1, t));
/** easeOutBack — 살짝 오버슛하는 팝 */
const backOut = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const popStyle = (t: number): React.CSSProperties => ({
  opacity: clamp01(t * 1.6),
  transform: `scale(${t <= 0 ? 0.55 : 0.55 + 0.45 * backOut(clamp01(t))})`,
});

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

/** 카드 내용 3종 — 라벨별 와이어프레임. gc(0→1)에 맞춰 한 줄씩 '작성'된다. */
const CardBody: React.FC<{ kind: Ann["card"]; gc: number }> = ({ kind, gc }) => {
  // i번째 요소의 로컬 진행도 — 순차 스태거
  const rowT = (i: number, n: number) => clamp01((gc - (i / n) * 0.6) / 0.4);
  const grow = (t: number): React.CSSProperties => ({
    opacity: clamp01(t * 1.4) * 0.85,
    transform: `scaleX(${t <= 0 ? 0 : 1 - Math.pow(1 - clamp01(t), 3)})`,
    transformOrigin: "left center",
  });
  if (kind === "list")
    return (
      <>
        {[78, 60, 70, 48].map((w, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, ...grow(rowT(i, 4)) }}>
            <div style={{ width: 8, height: 8, border: `1.5px solid ${INK}`, borderRadius: 2 }} />
            <div style={{ width: `${w}%`, height: 3, borderRadius: 2, background: INK }} />
          </div>
        ))}
      </>
    );
  if (kind === "tags")
    return (
      <>
        {[[44, 34], [30, 46]].map((row, r) => (
          <div key={r} style={{ display: "flex", gap: 8 }}>
            {row.map((w, i) => (
              <div
                key={i}
                style={{
                  width: w,
                  height: 16,
                  border: `1.5px solid ${INK}`,
                  borderRadius: 999,
                  ...popStyle(rowT(r * 2 + i, 4)),
                  opacity: clamp01(rowT(r * 2 + i, 4) * 1.4) * 0.85,
                }}
              />
            ))}
          </div>
        ))}
      </>
    );
  return (
    <>
      {[86, 62, 74].map((w, i) => (
        <div key={i} style={{ width: `${w}%`, height: 3.5, borderRadius: 2, background: INK, ...grow(rowT(i, 3)) }} />
      ))}
    </>
  );
};

/** 타일 부착 주석 — 타일에서부터 '생성되는' 시퀀스.
 * g(빌드 진행도, 타일 x의 순수 함수)에 따라 타일 쪽 리더 → 칩/라벨 → 리더 → 카드 →
 * 카드 내용 순으로 단계별 등장. fade는 퇴장용 전체 페이드. */
const Annotation: React.FC<{
  a: Ann;
  x: number;
  y: number;
  tileH: number;
  g: number;
  fade: number;
}> = ({ a, x, y, tileH, g, fade }) => {
  const seg = (s: number, e: number) => clamp01((g - s) / (e - s));
  const tLeadA = seg(0.02, 0.2); // 타일에 닿은 리더
  const tDoc = seg(0.16, 0.34);
  const tSpark = seg(0.26, 0.44);
  const tLabel = seg(0.38, 0.58);
  const tLeadB = seg(0.54, 0.7); // 칩→카드 리더
  const tCard = seg(0.66, 0.86);
  const gBody = seg(0.78, 1); // 카드 내용 작성
  const chipStyle: React.CSSProperties = {
    width: 36,
    height: 36,
    border: `2px solid ${INK}`,
    borderRadius: 12,
    display: "grid",
    placeItems: "center",
    background: "rgba(245,245,245,0.72)",
  };
  // 카드/리더의 성장 방향은 타일 반대쪽(멀어지는 쪽)으로
  const away = a.below ? "top" : "bottom";
  const card = (
    <div
      key="card"
      style={{
        width: 150,
        height: 92,
        border: `2px solid ${INK}`,
        borderRadius: 22,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: a.card === "tags" ? "center" : undefined,
        gap: 11,
        padding: "0 26px",
        background: "rgba(245,245,245,0.72)",
        ...popStyle(tCard),
        transformOrigin: `center ${away}`,
      }}
    >
      <CardBody kind={a.card} gc={gBody} />
    </div>
  );
  const leader = (len: number, t: number) => (
    <div
      key={`l${len}`}
      style={{
        width: 2,
        height: len,
        background: INK,
        opacity: t > 0 ? 0.8 : 0,
        transform: `scaleY(${1 - Math.pow(1 - t, 3)})`,
        transformOrigin: `center ${a.below ? "top" : "bottom"}`,
      }}
    />
  );
  const chips = (
    <div key="chips" style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <span style={{ ...chipStyle, ...popStyle(tDoc) }}><DocIcon /></span>
      <span style={{ ...chipStyle, ...popStyle(tSpark) }}><Sparkle /></span>
      <span
        style={{
          border: `1.5px solid ${INK}`,
          borderRadius: 999,
          padding: "7px 16px",
          fontSize: 20,
          fontWeight: 500,
          color: INK,
          fontFamily: "'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', -apple-system, sans-serif",
          background: "rgba(245,245,245,0.72)",
          whiteSpace: "nowrap",
          ...popStyle(tLabel),
        }}
      >
        {a.label}
      </span>
    </div>
  );
  // 타일 쪽 리더가 길고(34) 카드-칩 사이는 짧게(18) — 레퍼런스 비율
  const parts = a.below
    ? [leader(34, tLeadA), chips, leader(18, tLeadB), card]
    : [card, leader(18, tLeadB), chips, leader(34, tLeadA)];
  // below: 상단이 타일 하단 모서리에서 시작 / above: 하단이 타일 상단 모서리에 닿음
  const offY = a.below
    ? `translateY(${tileH / 2 + 10}px)`
    : `translate(0, calc(-100% - ${tileH / 2 + 10}px))`;
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        transform: `translateX(-50%) ${offY}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        opacity: fade,
        zIndex: 10,
      }}
    >
      {parts}
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
        // count는 period의 배수여야 랩 시 slot이 보존돼 타일이 같은 seed로 재등장한다
        // (어긋나면 화면에 걸친 대형 타일이 랩 순간 외형이 바뀌는 '팝' 발생).
        const count =
          Math.ceil((Math.ceil(1.3 / row.spacing) + row.period + 2) / row.period) * row.period;
        const shift = p * row.period * row.spacing * row.dir;
        return Array.from({ length: count }, (_, k) => {
          const raw = k * row.spacing + shift;
          const span = count * row.spacing;
          const u = ((raw % span) + span) % span;
          const uu = u - 0.15;
          // (raw - u) / spacing은 수학적으로 정수(랩 횟수×count)지만 부동소수점 오차로
          // ±1e-15 흔들린다. floor는 이 노이즈에 프레임마다 ±1로 튀어 seed가 교체되며
          // 전면 스트로브를 만든다 — 반드시 round로 스냅.
          const slot =
            (((k - Math.round((raw - u) / row.spacing)) % row.period) + row.period) % row.period;
          const seed = `${row.id}-${slot}`;
          const x = uu * 130 + (random(`${seed}-jx`) - 0.5) * 3;
          const y =
            row.yFrom +
            (row.yTo - row.yFrom) * ((x + 15) / 130) +
            (random(`${seed}-jy`) - 0.5) * 4;
          const w =
            row.wBase *
            (0.55 + random(`${seed}-s`) * 0.85) *
            (1 + 0.45 * Math.abs((x - 50) / 65));
          const h = w * (0.5 + random(`${seed}-a`) * 0.35);
          const rot = angle + (random(`${seed}-r`) - 0.5) * 7;
          const ann = ANNS.find((a) => a.row === row.id && a.slot === slot);
          const g = ann ? buildProgress(x, row.band, row.dir) : 0;
          const fade = ann ? exitFade(x, row.band, row.dir) : 0;
          // 주석의 전체 존재감 — 빌드 초반에 빠르게 1로 (블러 해제용)
          const o = Math.min(clamp01(g * 3), fade);
          // 피사계 심도 — 큰(가까운) 타일일수록 블러. 주석이 붙은 타일은
          // 주석 등장에 맞춰 포커스로 끌어온다 (에이전트가 '집중'하는 인상).
          const blur = Math.max(0, Math.min(8, (w - 430) / 55)) * (1 - o);
          return (
            <React.Fragment key={k}>
              <div
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
                  filter: blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : undefined,
                  zIndex: row.z,
                }}
              />
              {ann && g > 0.001 && fade > 0.01 && (
                <Annotation a={ann} x={x} y={y} tileH={h} g={g} fade={fade} />
              )}
            </React.Fragment>
          );
        });
      })}
    </AbsoluteFill>
  );
};
