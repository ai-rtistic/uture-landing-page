import { AbsoluteFill, Img, staticFile } from "remotion";
import { tileBackground } from "./TileFlow";

/**
 * OG 공유 카드 (1200×630 스틸) — 히어로 타일 필드의 오로라 프로스트 문법 재사용.
 * 좌측 텍스트(워드마크 + 헤드라인 + 서브), 우측·모서리에 타일 + 에이전트 주석 미니.
 * 렌더: npx remotion still OgCard ../web/public/og.png
 */

const INK = "#2b2724";
const TEXT = "#1d1c1b";
const TEXT2 = "#454340";
const FONT =
  "'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', -apple-system, sans-serif";

type Tile = { x: number; y: number; w: number; h: number; rot: number; seed: string; blur?: number };
const TILES: Tile[] = [
  // 우상 — 주 타일 클러스터
  { x: 78, y: 12, w: 300, h: 190, rot: -7, seed: "og-1" },
  { x: 99, y: 38, w: 240, h: 150, rot: 5, seed: "og-2" },
  { x: 66, y: -6, w: 200, h: 120, rot: 4, seed: "og-3", blur: 2 },
  // 우하 — 주석이 붙는 타일
  { x: 84, y: 84, w: 260, h: 160, rot: -5, seed: "og-4" },
  // 좌하 — 대형 크롭 타일 (근경, 블러)
  { x: 6, y: 104, w: 380, h: 230, rot: 8, seed: "og-5", blur: 5 },
];

const chip: React.CSSProperties = {
  width: 34,
  height: 34,
  border: `2px solid ${INK}`,
  borderRadius: 11,
  display: "grid",
  placeItems: "center",
  background: "rgba(245,245,245,0.72)",
};

export const OgCard: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#f5f5f5", fontFamily: FONT, overflow: "hidden" }}>
      {TILES.map((t) => (
        <div
          key={t.seed}
          style={{
            position: "absolute",
            left: `${t.x}%`,
            top: `${t.y}%`,
            width: t.w,
            height: t.h,
            transform: `translate(-50%, -50%) rotate(${t.rot}deg)`,
            borderRadius: Math.min(t.w, t.h) * 0.38,
            background: tileBackground(t.seed),
            boxShadow:
              "inset 0 2px 14px rgba(255,255,255,0.55), inset 0 -10px 30px rgba(120,80,60,0.08), 0 24px 48px -30px rgba(120,80,90,0.25)",
            filter: t.blur ? `blur(${t.blur}px)` : undefined,
          }}
        />
      ))}

      {/* 에이전트 주석 미니 — 우하 타일에 부착 */}
      <div
        style={{
          position: "absolute",
          left: "84%",
          top: "84%",
          transform: "translate(-50%, calc(-50% - 42px)) translateY(-100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 9,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={chip}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 4h12v16H6z M9 9h6 M9 13h6" />
            </svg>
          </span>
          <span style={chip}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinejoin="round">
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
            </svg>
          </span>
          <span
            style={{
              border: `1.5px solid ${INK}`,
              borderRadius: 999,
              padding: "7px 15px",
              fontSize: 17,
              fontWeight: 500,
              color: INK,
              background: "rgba(245,245,245,0.72)",
              whiteSpace: "nowrap",
            }}
          >
            보고서 요약
          </span>
        </div>
        <div style={{ width: 2, height: 34, background: INK, opacity: 0.8 }} />
      </div>

      {/* 텍스트 블록 */}
      <div style={{ position: "absolute", left: 84, top: 150 }}>
        {/* 정식 브랜드 로고 — 스파클 심볼 + 라운드 워드마크 */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Img src={staticFile("symbol.svg")} style={{ height: 34 }} />
          <Img src={staticFile("wordmark.svg")} style={{ height: 30 }} />
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.16,
            color: TEXT,
          }}
        >
          AI를 아는 조직에서
          <br />
          AI로 일하는 조직으로.
        </div>
        <div style={{ marginTop: 24, fontSize: 24, color: TEXT2, letterSpacing: "-0.01em" }}>
          기업을 위한 풀사이클 AX 파트너 — 교육 · 실행 · 구축
        </div>
      </div>
    </AbsoluteFill>
  );
};
