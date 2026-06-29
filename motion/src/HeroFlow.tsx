import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  random,
  AbsoluteFill,
} from "remotion";

/**
 * 유쳐 Hero 배경 루프 — "AI를 아는 조직 → AI로 일하는 조직".
 *
 * 흩어진 무채색 구성원 노드(고립) → 3갈래 흐름이 관통하며 좌→우로 점등(오렌지)
 * → 연결선으로 묶이며 정돈된 조직 그리드로 재편 → 다시 부드럽게 흩어져 루프.
 *
 * TRANSPARENT background (AbsoluteFill, no bg) → alpha WebM 으로 렌더해
 * 라이트 페이지(#f5f5f5) 위에 저투명도 풀블리드 배경으로 임베드한다.
 * 노드는 캔버스 우측 ~56%에 몰아 좌측 카피 영역을 비운다.
 */

const BRAND = {
  surface: "#ffffff",
  border: "#d3d1cf",
  borderSoft: "#e0ddda",
  text: "#1d1c1b",
  muted: "#9b9996",
  accent: "#ff7a33",
  accentSoft: "#ff9e6b",
};

const FONT =
  "'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', sans-serif";

const COLS = 6;
const ROWS = 3;
const X0 = 560;
const X1 = 1340;
const Y0 = 300;
const Y1 = 760;

type Node = {
  i: number;
  col: number;
  row: number;
  gx: number;
  gy: number;
  sx: number;
  sy: number;
  threshold: number;
};

const NODES: Node[] = Array.from({ length: COLS * ROWS }, (_, i) => {
  const col = i % COLS;
  const row = Math.floor(i / COLS);
  const gx = X0 + (col / (COLS - 1)) * (X1 - X0);
  const gy = Y0 + (row / (ROWS - 1)) * (Y1 - Y0);
  // scattered rest position = grid + deterministic jitter
  const sx = gx + (random(`x${i}`) - 0.5) * 190;
  const sy = gy + (random(`y${i}`) - 0.5) * 260;
  // left columns ignite first (streams sweep left→right)
  const threshold = (col / (COLS - 1)) * 0.5;
  return { i, col, row, gx, gy, sx, sy, threshold };
});

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const HeroFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();

  // master "organization" level: 0 scattered/cold → 1 organized/hot → back to 0.
  // start == end (== 0) so the loop is seamless.
  const m = interpolate(
    frame,
    [0, 60, 150, durationInFrames - 80, durationInFrames],
    [0, 0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease },
  );

  // ambient cycles — periodic over the full duration so they loop cleanly
  const t = frame / durationInFrames;
  const glow = 0.5 + 0.5 * Math.sin(t * Math.PI * 2);
  const flow = (frame * 3) % 200;

  return (
    <AbsoluteFill style={{ fontFamily: FONT }}>
      {/* faint brand-warm glow centred on the grid, breathes with the cycle */}
      <div
        style={{
          position: "absolute",
          left: (X0 + X1) / 2 - width * 0.32,
          top: (Y0 + Y1) / 2 - width * 0.32,
          width: width * 0.64,
          height: width * 0.64,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,158,107,${0.1 * (0.4 + 0.6 * m) * (0.7 + 0.3 * glow)}), transparent 62%)`,
          filter: "blur(60px)",
        }}
      />

      {/* the 3 streams that sweep across during assembly (fade out once organized) */}
      <Streams m={m} flow={flow} width={width} />

      {/* connectors (grid edges) — appear as the grid organizes */}
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        {NODES.map((n) => {
          const right = NODES.find(
            (o) => o.row === n.row && o.col === n.col + 1,
          );
          const down = NODES.find(
            (o) => o.col === n.col && o.row === n.row + 1,
          );
          const lines = [right, down].filter(Boolean) as Node[];
          const ignite = clamp01((m - n.threshold) / 0.18);
          return lines.map((o, k) => {
            const oIgnite = clamp01((m - o.threshold) / 0.18);
            const lit = Math.min(ignite, oIgnite);
            const a = lerp(n.sx, n.gx, easeM(m));
            const b = lerp(n.sy, n.gy, easeM(m));
            const c = lerp(o.sx, o.gx, easeM(m));
            const d = lerp(o.sy, o.gy, easeM(m));
            return (
              <line
                key={`${n.i}-${k}`}
                x1={a}
                y1={b}
                x2={c}
                y2={d}
                stroke={lit > 0.2 ? BRAND.accent : BRAND.borderSoft}
                strokeWidth={0.8}
                opacity={(0.08 + 0.32 * m * (0.3 + 0.7 * lit)) * 0.8}
              />
            );
          });
        })}
      </svg>

      {/* nodes */}
      {NODES.map((n) => {
        const x = lerp(n.sx, n.gx, easeM(m));
        const y = lerp(n.sy, n.gy, easeM(m));
        const ignite = clamp01((m - n.threshold) / 0.18);
        const size = 9 + 3 * ignite;
        const pulse = 0.6 + 0.4 * Math.sin(t * Math.PI * 2 + n.i);
        return (
          <div
            key={n.i}
            style={{
              position: "absolute",
              left: x - size / 2,
              top: y - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              // monochrome-first: soft peach fill + thin warm ring when active,
              // neutral dot at rest — ambient, never a saturated grid
              background:
                ignite > 0.04
                  ? `rgba(255,158,107,${0.18 + 0.32 * ignite})`
                  : BRAND.surface,
              border: `1px solid ${ignite > 0.04 ? `rgba(255,122,51,${0.55 * ignite})` : BRAND.borderSoft}`,
              boxShadow:
                ignite > 0.04
                  ? `0 0 ${5 + 7 * ignite * pulse}px rgba(255,122,51,${0.16 * ignite})`
                  : "none",
            }}
          />
        );
      })}

    </AbsoluteFill>
  );
};

const Streams: React.FC<{
  m: number;
  flow: number;
  width: number;
}> = ({ m, width }) => {
  // visible only mid-transition: rises 0→1 by m≈0.5, gone once organized
  const vis = interpolate(m, [0.04, 0.4, 0.72, 0.92], [0, 0.9, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (vis <= 0.01) return null;
  const ys = [Y0 - 40, (Y0 + Y1) / 2, Y1 + 40];
  // sweep head travels left→right with m
  const head = interpolate(m, [0.1, 0.7], [X0 - 120, X1 + 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <>
      {ys.map((y, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            top: y - 1.2,
            width: head,
            height: 2.4,
            background: `linear-gradient(90deg, transparent, rgba(255,122,51,${0.16 * vis}) 60%, rgba(255,122,51,${0.55 * vis}))`,
          }}
        >
          {/* soft comet head */}
          <div
            style={{
              position: "absolute",
              right: -2,
              top: -2,
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: BRAND.accent,
              opacity: 0.7 * vis,
              boxShadow: `0 0 9px rgba(255,122,51,${0.4 * vis})`,
            }}
          />
        </div>
      ))}
    </>
  );
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function easeM(m: number) {
  // soften the position morph a touch vs the raw master
  return Easing.bezier(0.4, 0, 0.2, 1)(m);
}
