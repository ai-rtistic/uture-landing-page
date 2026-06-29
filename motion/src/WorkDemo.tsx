import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
  AbsoluteFill,
  Easing,
} from "remotion";

/**
 * 유쳐 "업무에서 AI 쓰는 법" 데모 — twelvelabs 제품 데모 결.
 * 입력창에 자연어 요청이 타이핑되고 → 결과가 채워진다.
 * 3개 장면 순환: A 사내 문서 검색 / B 종합 업무 어시스턴트 / C 주간 리포트 생성.
 *
 * 라이트 테마, 한국어. 투명 배경 → 페이지 위에 얹는 포컬 데모로 사용.
 */

const C = {
  surface: "#ffffff",
  panel: "#faf9f8",
  border: "#e4e1de",
  borderStrong: "#d3d1cf",
  text: "#1d1c1b",
  text2: "#56544f",
  muted: "#8e8d8d",
  accent: "#ff7a33",
  accentSoft: "#ff9e6b",
  mint: "#2a9d6f",
};

const FONT =
  "'Pretendard Variable', Pretendard, 'Apple SD Gothic Neo', sans-serif";

const SCENE_LEN = 150; // 5s @30fps
const ease = Easing.bezier(0.16, 1, 0.3, 1);

// ---- shared bits ------------------------------------------------------------

const Sparkle: React.FC<{ size?: number; color?: string }> = ({
  size = 18,
  color = C.accent,
}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
    <path d="M8 1l1.6 4.4L14 7l-4.4 1.6L8 13l-1.6-4.4L2 7l4.4-1.6z" />
  </svg>
);

function typed(full: string, frame: number, start: number, end: number) {
  const n = Math.floor(
    interpolate(frame, [start, end], [0, full.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  return full.slice(0, n);
}

const PromptBar: React.FC<{ query: string }> = ({ query }) => {
  const frame = useCurrentFrame();
  const appear = spring({ frame, fps: 30, config: { damping: 18 }, durationInFrames: 16 });
  const txt = typed(query, frame, 14, 52);
  const typing = frame >= 14 && frame < 54;
  const caret = typing && Math.floor(frame / 8) % 2 === 0;
  return (
    <div
      style={{
        opacity: appear,
        transform: `translateY(${(1 - appear) * 10}px)`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "20px 24px",
        borderRadius: 18,
        background: C.surface,
        border: `1px solid ${C.border}`,
        boxShadow: "0 18px 50px -28px rgba(29,28,27,0.45)",
        fontSize: 23,
        color: C.text,
        fontWeight: 500,
      }}
    >
      <span
        style={{
          width: 40,
          height: 40,
          flex: "0 0 auto",
          borderRadius: 11,
          background: C.panel,
          border: `1px solid ${C.border}`,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Sparkle />
      </span>
      <span style={{ color: txt ? C.text : C.muted }}>
        {txt || "무엇이든 요청하세요"}
        {caret && <span style={{ color: C.accent, fontWeight: 400 }}>|</span>}
      </span>
    </div>
  );
};

// reveal helper for result items (staggered pop-in after the query is typed)
function useReveal(index: number, base = 58, step = 7) {
  const frame = useCurrentFrame();
  const s = spring({
    frame: frame - base - index * step,
    fps: 30,
    config: { damping: 20 },
    durationInFrames: 22,
  });
  return s;
}

const Shell: React.FC<{ query: string; children: React.ReactNode }> = ({
  query,
  children,
}) => {
  const frame = useCurrentFrame();
  // gentle fade in/out at the scene edges for a clean loop between scenes
  const fade = interpolate(
    frame,
    [0, 10, SCENE_LEN - 12, SCENE_LEN],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease },
  );
  return (
    <AbsoluteFill
      style={{
        fontFamily: FONT,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "70px 60px",
        opacity: fade,
      }}
    >
      <div style={{ width: "100%", maxWidth: 880 }}>
        <PromptBar query={query} />
        <div style={{ marginTop: 26 }}>{children}</div>
      </div>
    </AbsoluteFill>
  );
};

const Card: React.FC<{
  reveal: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ reveal, children, style }) => (
  <div
    style={{
      opacity: reveal,
      transform: `translateY(${(1 - reveal) * 12}px) scale(${0.97 + 0.03 * reveal})`,
      background: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 14,
      boxShadow: "0 14px 40px -26px rgba(29,28,27,0.4)",
      ...style,
    }}
  >
    {children}
  </div>
);

const Tag: React.FC<{ children: React.ReactNode; tone?: "accent" | "mint" | "muted" }> = ({
  children,
  tone = "muted",
}) => {
  const map = {
    accent: { c: C.accent, b: "rgba(255,122,51,0.4)", bg: "rgba(255,122,51,0.08)" },
    mint: { c: C.mint, b: "rgba(42,157,111,0.4)", bg: "rgba(42,157,111,0.08)" },
    muted: { c: C.muted, b: C.border, bg: C.panel },
  }[tone];
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 600,
        padding: "3px 9px",
        borderRadius: 7,
        color: map.c,
        border: `1px solid ${map.b}`,
        background: map.bg,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};

const DocIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke={C.muted} strokeWidth="1.3">
    <path d="M4 2h5l3 3v9H4z" strokeLinejoin="round" />
    <path d="M9 2v3h3M6 8h4M6 11h4" strokeLinecap="round" />
  </svg>
);

// ---- Scene A: 사내 문서 검색 -------------------------------------------------

const DOCS = [
  { title: "경비정산 규정 v3.2", meta: "재무팀 · 2026.03 개정", hit: true },
  { title: "국내 출장 가이드", meta: "총무팀 · 사내위키", hit: false },
  { title: "법인카드 사용 매뉴얼", meta: "재무팀 · PDF", hit: false },
  { title: "2026 회계 캘린더", meta: "재무팀 · 정산 마감일", hit: false },
];

const SceneSearch: React.FC = () => {
  const ans = useReveal(0);
  return (
    <Shell query="출장비 한도랑 정산 마감일 알려줘">
      <Card reveal={ans} style={{ padding: "18px 20px", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Sparkle size={15} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>AI 답변</span>
        </div>
        <div style={{ fontSize: 19, color: C.text, lineHeight: 1.5 }}>
          국내 출장비는 <b style={{ color: C.accent }}>일 7만원 한도</b>, 정산은{" "}
          <b style={{ color: C.accent }}>매월 25일</b> 마감입니다. 근거 문서:
        </div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {DOCS.map((d, i) => {
          const r = useReveal(i + 1);
          return (
            <Card key={i} reveal={r} style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <DocIcon />
                <span style={{ fontSize: 16, fontWeight: 600, color: C.text, flex: 1 }}>
                  {d.title}
                </span>
                {d.hit && <Tag tone="accent">근거</Tag>}
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>{d.meta}</div>
            </Card>
          );
        })}
      </div>
    </Shell>
  );
};

// ---- Scene B: 종합 업무 어시스턴트 ------------------------------------------

const MailIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke={C.text2} strokeWidth="1.3">
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
    <path d="M2.5 4.5l5.5 4 5.5-4" strokeLinecap="round" />
  </svg>
);
const ChatIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke={C.text2} strokeWidth="1.3">
    <path d="M3 3.5h10v7H7l-3 2.5V10.5H3z" strokeLinejoin="round" />
  </svg>
);
const CalIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke={C.text2} strokeWidth="1.3">
    <rect x="2.5" y="3" width="11" height="10.5" rx="1.5" />
    <path d="M2.5 6h11M5.5 2v2.5M10.5 2v2.5" strokeLinecap="round" />
  </svg>
);

const CHANNELS = [
  { Icon: MailIcon, src: "메일", text: "김부장 — 제안서 피드백 회신 필요", tag: "오전 중" },
  { Icon: ChatIcon, src: "슬랙 #영업팀", text: "계약서 검토 요청 2건", tag: "검토" },
  { Icon: CalIcon, src: "캘린더", text: "14:00 A사 미팅 · 발표자료 준비", tag: "오늘" },
];

const SceneAssistant: React.FC = () => {
  const head = useReveal(0);
  return (
    <Shell query="오늘 내가 챙겨야 할 거 정리해줘">
      <Card
        reveal={head}
        style={{
          padding: "18px 20px",
          marginBottom: 16,
          background: "linear-gradient(180deg, rgba(255,122,51,0.06), rgba(255,158,107,0.02))",
          border: "1px solid rgba(255,122,51,0.28)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Sparkle size={15} />
          <span style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>오늘의 브리핑 · 우선순위</span>
        </div>
        <div style={{ fontSize: 19, color: C.text, lineHeight: 1.5 }}>
          제안서 회신 <b style={{ color: C.accent }}>→</b> 미팅 자료 준비{" "}
          <b style={{ color: C.accent }}>→</b> 계약서 검토 순으로 처리하세요.
        </div>
      </Card>
      <div style={{ display: "grid", gap: 12 }}>
        {CHANNELS.map((c, i) => {
          const r = useReveal(i + 1);
          return (
            <Card key={i} reveal={r} style={{ padding: "15px 18px", display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  width: 38,
                  height: 38,
                  flex: "0 0 auto",
                  borderRadius: 10,
                  background: C.panel,
                  border: `1px solid ${C.border}`,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <c.Icon />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, color: C.muted, marginBottom: 3 }}>{c.src}</div>
                <div style={{ fontSize: 16.5, fontWeight: 500, color: C.text }}>{c.text}</div>
              </div>
              <Tag>{c.tag}</Tag>
            </Card>
          );
        })}
      </div>
    </Shell>
  );
};

// ---- Scene C: 사내 템플릿에 맞춰 산출물(보고서·PPT) 생성 ---------------------

const Line: React.FC<{ w: number; c?: string; h?: number }> = ({ w, c = C.borderStrong, h = 4 }) => (
  <div style={{ width: `${w}%`, height: h, borderRadius: 3, background: c }} />
);

type SlideKind = "cover" | "bullets" | "chart" | "plan";

const SlideBody: React.FC<{ kind: SlideKind }> = ({ kind }) => {
  if (kind === "cover")
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 7, justifyContent: "center", height: "100%", padding: "0 4px" }}>
        <Line w={70} c={C.text} h={7} />
        <Line w={45} c={C.borderStrong} h={4} />
      </div>
    );
  if (kind === "bullets")
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6, justifyContent: "center", height: "100%" }}>
        {[80, 66, 72].map((w, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: C.accent, flex: "0 0 auto" }} />
            <Line w={w} />
          </div>
        ))}
      </div>
    );
  if (kind === "chart")
    return (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: "100%", paddingBottom: 2 }}>
        {[42, 70, 55, 90].map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              borderRadius: 3,
              background: i === 3 ? C.accent : C.borderStrong,
            }}
          />
        ))}
      </div>
    );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7, justifyContent: "center", height: "100%" }}>
      {[78, 64, 70].map((w, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: 3, border: `1.4px solid ${C.accent}`, flex: "0 0 auto" }} />
          <Line w={w} />
        </div>
      ))}
    </div>
  );
};

const SLIDES: { kind: SlideKind; label: string }[] = [
  { kind: "cover", label: "표지" },
  { kind: "bullets", label: "핵심 요약" },
  { kind: "chart", label: "실적 지표" },
  { kind: "plan", label: "다음 주 계획" },
];

const SlideThumb: React.FC<{ kind: SlideKind; label: string; reveal: number }> = ({
  kind,
  label,
  reveal,
}) => (
  <div
    style={{
      opacity: reveal,
      transform: `translateY(${(1 - reveal) * 10}px) scale(${0.96 + 0.04 * reveal})`,
    }}
  >
    <div
      style={{
        aspectRatio: "16 / 10",
        borderRadius: 10,
        border: `1px solid ${C.border}`,
        background: C.surface,
        boxShadow: "0 10px 26px -18px rgba(29,28,27,0.4)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* template chrome: accent rule + logo mark */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "7px 9px 6px",
          borderBottom: `1px solid ${C.panel}`,
        }}
      >
        <div style={{ width: 22, height: 4, borderRadius: 2, background: C.accent }} />
        <div style={{ width: 7, height: 7, borderRadius: "50%", border: `1.4px solid ${C.borderStrong}` }} />
      </div>
      <div style={{ flex: 1, padding: "9px 10px" }}>
        <SlideBody kind={kind} />
      </div>
    </div>
    <div style={{ fontSize: 12.5, color: C.muted, marginTop: 8, textAlign: "center" }}>{label}</div>
  </div>
);

const SceneReport: React.FC = () => {
  const doc = useReveal(0, 58, 0);
  return (
    <Shell query="이번 주 실적으로 주간 보고 PPT를 사내 템플릿으로 만들어줘">
      <Card reveal={doc} style={{ padding: "22px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <DocIcon />
          <span style={{ fontSize: 21, fontWeight: 700, color: C.text, flex: 1 }}>
            주간 실적 보고
          </span>
          <Tag tone="accent">사내 템플릿</Tag>
          <Tag tone="mint">AI 생성</Tag>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {SLIDES.map((s, i) => (
            <SlideThumb key={i} kind={s.kind} label={s.label} reveal={useReveal(i + 1)} />
          ))}
        </div>
        <div style={{ fontSize: 13.5, color: C.muted, marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <Sparkle size={14} />
          회사 표준 양식 · 로고 · 폰트에 맞춰 4장 슬라이드 생성 완료
        </div>
      </Card>
    </Shell>
  );
};

// ---- root cycle -------------------------------------------------------------

export const WorkDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={SCENE_LEN}>
        <SceneSearch />
      </Sequence>
      <Sequence from={SCENE_LEN} durationInFrames={SCENE_LEN}>
        <SceneAssistant />
      </Sequence>
      <Sequence from={SCENE_LEN * 2} durationInFrames={SCENE_LEN}>
        <SceneReport />
      </Sequence>
    </AbsoluteFill>
  );
};
