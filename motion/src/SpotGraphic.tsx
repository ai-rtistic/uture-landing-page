import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  AbsoluteFill,
} from "remotion";

/**
 * 유쳐 branded animated spot-graphic (Search diagram).
 * Renders on a TRANSPARENT background → export as WebM (alpha) and
 * drop into the site as a looping <video>. Mirrors the in-page SVG
 * SearchGraphic but as real motion.
 */

const BRAND = {
  surface: "#ffffff",
  border: "#d3d1cf",
  text: "#1d1c1b",
  muted: "#8e8d8d",
  accent: "#ff7a33",
  accentSoft: "#ff9e6b",
};

const TILE_ICONS = ["gear", "flow", "text", "image", "video", "audio"] as const;

export const SpotGraphic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // node fades/scales in
  const node = spring({ frame, fps, config: { damping: 16 }, durationInFrames: 24 });
  const nodeY = interpolate(node, [0, 1], [14, 0]);

  // connector draws down
  const conn = interpolate(frame, [14, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // matched-tile highlight pulse (after tiles settle)
  const hi = interpolate(frame, [56, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glowPulse = 0.55 + 0.45 * Math.sin((frame / fps) * Math.PI * 1.4);

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      {/* ambient brand glow (over the white panel) */}
      <div
        style={{
          position: "absolute",
          width: width * 0.62,
          height: width * 0.62,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,158,107,${0.34 * glowPulse}), transparent 62%)`,
          filter: "blur(28px)",
        }}
      />

      {/* search node */}
      <div
        style={{
          opacity: node,
          transform: `translateY(${nodeY}px)`,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 22px",
          borderRadius: 16,
          background: BRAND.surface,
          border: `1px solid ${BRAND.border}`,
          boxShadow: "0 10px 28px -16px rgba(29,28,27,0.5)",
          fontFamily:
            "'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', sans-serif",
          fontSize: 26,
          fontWeight: 600,
          color: BRAND.text,
        }}
      >
        <Magnifier />
        원하는 장면을 검색하세요
      </div>

      {/* connector */}
      <div
        style={{
          width: 2,
          height: 56 * conn,
          background: BRAND.border,
          margin: "10px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "60%",
            top: `${((frame * 4) % 160) - 60}%`,
            background: `linear-gradient(180deg, transparent, ${BRAND.accent}, transparent)`,
          }}
        />
      </div>

      {/* tile grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 120px)",
          gap: 16,
        }}
      >
        {TILE_ICONS.map((_, i) => {
          const t = spring({
            frame: frame - 26 - i * 5,
            fps,
            config: { damping: 18 },
            durationInFrames: 22,
          });
          const isMatch = i === 0;
          return (
            <div
              key={i}
              style={{
                opacity: t,
                transform: `scale(${0.85 + 0.15 * t})`,
                aspectRatio: "16 / 10",
                width: 120,
                borderRadius: 14,
                border: isMatch
                  ? "1px solid transparent"
                  : `1px solid ${BRAND.border}`,
                background: isMatch
                  ? `linear-gradient(135deg, ${BRAND.accent}, ${BRAND.accentSoft})`
                  : BRAND.surface,
                boxShadow: isMatch
                  ? `0 0 0 ${2 * hi}px ${BRAND.accent}, 0 14px 34px -14px rgba(255,122,51,${0.6 * hi * glowPulse})`
                  : "none",
                display: "grid",
                placeItems: "center",
                position: "relative",
              }}
            >
              {isMatch && (
                <span
                  style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    fontSize: 11,
                    fontFamily: "monospace",
                    padding: "2px 7px",
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.85)",
                    color: BRAND.text,
                    opacity: hi,
                  }}
                >
                  HIGH
                </span>
              )}
              <PlayIcon color={isMatch ? "#fff" : BRAND.muted} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Magnifier: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 16 16" fill="none" stroke="#3e3e3c" strokeWidth="1.4">
    <circle cx="7" cy="7" r="4" />
    <path d="M10 10l4 4" strokeLinecap="round" />
  </svg>
);

const PlayIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 16 16" fill={color}>
    <path d="M6 4l6 4-6 4z" />
  </svg>
);
