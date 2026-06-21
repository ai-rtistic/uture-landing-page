import type { ReactNode } from 'react'
import { Button, Pill, Arrow } from '../ui/primitives'
import { WordReveal } from '../ui/WordReveal'
import {
  GFrame,
  GNode,
  GConn,
  GTile,
  GStrip,
  GDots,
  type Tint,
} from '../components/graphics/primitives'
import {
  PlanGraphic,
  BuildGraphic,
  WorkflowGraphic,
  SceneGraphic,
} from '../components/graphics/composed'
import { MotionGraphic } from '../components/graphics/MotionGraphic'

/* ---------- gallery scaffolding ---------- */

function Specimen({
  title,
  desc,
  code,
  children,
  wide,
}: {
  title: string
  desc?: string
  code?: string
  children: ReactNode
  wide?: boolean
}) {
  return (
    <div className={`ds-spec ${wide ? 'ds-spec-wide' : ''}`}>
      <div className="ds-spec-head">
        <h3>{title}</h3>
        {desc && <p>{desc}</p>}
      </div>
      <div className="ds-preview">{children}</div>
      {code && <pre className="ds-code mono">{code}</pre>}
    </div>
  )
}

function Section({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: ReactNode }) {
  return (
    <section className="ds-section" id={id}>
      <div className="ds-section-head">
        <span className="ds-kicker mono">{kicker}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

/* ---------- data ---------- */

const BRAND: [string, string][] = [
  ['--c-orange', '#ff7a33'],
  ['--c-peach', '#ff9e6b'],
  ['--c-amber', '#efb34a'],
  ['--c-rose', '#ff8fa8'],
  ['--c-lilac', '#b49df5'],
  ['--c-sky', '#82b4f0'],
  ['--c-mint', '#5fcba0'],
]
const NEUTRAL: [string, string][] = [
  ['--bg', '#f5f5f5'],
  ['--panel', '#f4f3f3'],
  ['--surface', '#ffffff'],
  ['--surface-2', '#ececec'],
  ['--text', '#1d1c1b'],
  ['--text-2', '#3e3e3c'],
  ['--muted', '#8e8d8d'],
  ['--border', '#e0e0e0'],
]
const TINTS: Tint[] = ['peach', 'amber', 'sky', 'rose', 'lilac', 'mint', 'neutral']
const NAV = [
  ['tokens', '색상·토큰'],
  ['type', '타이포그래피'],
  ['layout', '간격·라운드·컨테이너'],
  ['controls', '버튼·배지'],
  ['primitives', '그래픽 프리미티브'],
  ['composed', '조합 그래픽'],
  ['text-fx', '텍스트 효과'],
  ['motion', '모션·배경영상'],
  ['usage', '사용 가이드'],
]

const SPACING = [4, 8, 12, 16, 20, 24, 40, 80, 100]
const RADII: [string, string][] = [
  ['pill', '7px'],
  ['button', '14px'],
  ['tile', '12–16px'],
  ['card', '22px'],
]

/* ---------- page ---------- */

export function DesignSystem() {
  return (
    <div className="ds">
      <header className="ds-top">
        <div className="ds-top-inner">
          <a href="/" className="ds-brand geist">
            uture<span> / design system</span>
          </a>
          <nav className="ds-nav">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="ds-hero">
        <h1>유쳐 디자인 시스템</h1>
        <p>
          랜딩 사이트를 구성하는 토큰·컴포넌트·그래픽을 한곳에서 미리보기와 사용법으로 정리했습니다.
          새 요소를 만들 땐 여기 컴포넌트를 재사용하고, 색은 토큰만 사용합니다.
        </p>
      </div>

      <main className="ds-main">
        {/* COLORS / TOKENS */}
        <Section id="tokens" kicker="01 · Foundations" title="색상 · 토큰">
          <p className="ds-note">
            오렌지를 메인으로 한 소프트 파스텔 7색. <strong>스팟 그래픽은 모노크롬 우선</strong>이고,
            색은 텍스트 강조·소프트 글로우 등 포인트에만 절제해 씁니다.
          </p>
          <div className="ds-swatches">
            {BRAND.map(([token, hex]) => (
              <div className="ds-swatch" key={token}>
                <span className="ds-chip" style={{ background: hex }} />
                <div>
                  <div className="ds-swatch-name mono">{token}</div>
                  <div className="ds-swatch-hex mono">{hex}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="ds-swatches">
            {NEUTRAL.map(([token, hex]) => (
              <div className="ds-swatch" key={token}>
                <span className="ds-chip ds-chip-bordered" style={{ background: hex }} />
                <div>
                  <div className="ds-swatch-name mono">{token}</div>
                  <div className="ds-swatch-hex mono">{hex}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* TYPOGRAPHY */}
        <Section id="type" kicker="02 · Foundations" title="타이포그래피">
          <p className="ds-note">한글 Pretendard · 라틴/숫자 Geist · 코드 Geist Mono.</p>
          <div className="ds-type-list">
            <div className="ds-type-row">
              <span className="ds-type-tag mono">Display / 56px · LH64 · LS-1.12</span>
              <span style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '64px' }}>
                AI로 일하는 조직으로.
              </span>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-tag mono">Statement / 48px · LH56 · LS-0.96</span>
              <span style={{ fontSize: 48, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: '56px' }}>
                교육에서 도구까지
              </span>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-tag mono">H3 / 20px</span>
              <span style={{ fontSize: 20, fontWeight: 600 }}>현장 밀착 실행</span>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-tag mono">Body / 16px</span>
              <span style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.6 }}>
                구성원이 실제 업무에서 AI로 일하는 방식을 바꿀 때까지 함께합니다.
              </span>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-tag mono">Caption / 12px · LS0.24</span>
              <span style={{ fontSize: 12, letterSpacing: '0.02em', color: 'var(--muted)' }}>IT · FinTech</span>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-tag mono">Mono / Geist</span>
              <span className="mono" style={{ fontSize: 14 }}>EDUCATE → EXECUTE → BUILD</span>
            </div>
          </div>
        </Section>

        {/* LAYOUT */}
        <Section id="layout" kicker="03 · Foundations" title="간격 · 라운드 · 컨테이너">
          <p className="ds-note">
            twelvelabs 측정값: 콘텐츠 컨테이너 <strong>max 1600px</strong> / 좌우 패딩{' '}
            <strong>40px</strong> / 텍스트 컬럼 <strong>640px</strong> · 섹션 세로 패딩{' '}
            <strong>80–100px</strong> · 8px 베이스 스페이싱.
          </p>
          <div className="ds-grid">
            <Specimen title="Spacing scale (px)" code={`4 · 8 · 12 · 16 · 20 · 24 · 40 · 80 · 100`} wide>
              <div className="ds-space-row">
                {SPACING.map((s) => (
                  <div className="ds-space-item" key={s}>
                    <span className="ds-space-bar" style={{ width: s, height: s }} />
                    <span className="ds-space-label mono">{s}</span>
                  </div>
                ))}
              </div>
            </Specimen>
            <Specimen title="Radius scale" code={`--r-pill 9 · --r-btn 14 · --r-card 22`}>
              <div className="ds-row">
                {RADII.map(([n, v]) => (
                  <div className="ds-radius-item" key={n}>
                    <span className="ds-radius-box" style={{ borderRadius: v.split('–')[0] }} />
                    <span className="ds-space-label mono">{n} · {v}</span>
                  </div>
                ))}
              </div>
            </Specimen>
            <Specimen title="Container" desc="넓은 컨테이너 + 좁은 텍스트 컬럼" code={`max-width: 1600px; padding: 0 40px;\n/* text column ~640px */`}>
              <div className="ds-container-demo">
                <div className="ds-container-outer">
                  <span className="mono">1600px</span>
                  <div className="ds-container-inner"><span className="mono">text 640</span></div>
                </div>
              </div>
            </Specimen>
          </div>
        </Section>

        {/* BUTTONS + BADGES */}
        <Section id="controls" kicker="04 · Components" title="버튼 · 배지">
          <div className="ds-grid">
            <Specimen
              title="Button — dark"
              desc="bg #1d1c1b · 텍스트 16px/LH24/LS0.16px · radius 14px · height 44px · padding 12–18px · gap 8px · ↗"
              code={`<Button href="#">AX 도입 문의하기</Button>`}
            >
              <Button href="#dummy">AX 도입 문의하기</Button>
            </Specimen>
            <Specimen
              title="Button — ghost"
              desc="투명 배경 · 1px #e0e0e0 보더 · 나머지 dark와 동일"
              code={`<Button href="#" variant="ghost">유쳐의 방식 보기</Button>`}
            >
              <Button href="#dummy" variant="ghost">유쳐의 방식 보기</Button>
            </Specimen>
            <Specimen
              title="Pill / badge"
              desc="측정 1:1 — 12px/LH20 · weight400 · LS0.25 · radius 7px · padding 2.5/6/1 · 1px #1d1c1b · bg 투명 · h24"
              code={`<Pill>고객 이야기</Pill>`}
            >
              <Pill>고객 이야기</Pill>
            </Specimen>
            <Specimen title="Arrow" code={`<Arrow />  ·  <Arrow up={false} />`}>
              <span style={{ display: 'inline-flex', gap: 16 }}>
                <Arrow />
                <Arrow up={false} />
              </span>
            </Specimen>
          </div>
        </Section>

        {/* PRIMITIVES */}
        <Section id="primitives" kicker="05 · Spot graphics" title="그래픽 프리미티브">
          <p className="ds-note">
            모든 스팟 그래픽은 이 프리미티브 조합으로 만듭니다. (`web/src/components/graphics/primitives.tsx`)
          </p>
          <div className="ds-grid">
            <Specimen
              title="GFrame — 틴트별"
              desc="틴트 글로우 패널. 색은 아주 옅음(whisper)."
              code={`<GFrame tint="peach"> … </GFrame>`}
              wide
            >
              <div className="ds-tint-row">
                {TINTS.map((t) => (
                  <div className="ds-tint-cell" key={t}>
                    <div style={{ width: 120, height: 84 }}>
                      <GFrame tint={t} compact>
                        <GNode icon="play">{t}</GNode>
                      </GFrame>
                    </div>
                  </div>
                ))}
              </div>
            </Specimen>

            <Specimen title="GNode — 노드/칩" code={`<GNode icon="search">검색</GNode>\n<GNode tone="dark" icon="sparkle">AI</GNode>`}>
              <div className="ds-row">
                <GNode icon="search">원하는 장면</GNode>
                <GNode tone="dark" icon="sparkle">uture Agent</GNode>
                <GNode icon="text">Text</GNode>
              </div>
            </Specimen>

            <Specimen title="GTile — 타일 상태" code={`<GTile />\n<GTile active tag="HIGH" />`}>
              <div className="ds-row">
                <div style={{ width: 90 }}><GTile /></div>
                <div style={{ width: 90 }}><GTile active tag="HIGH" /></div>
                <div style={{ width: 90 }}><GTile icon="gear" /></div>
              </div>
            </Specimen>

            <Specimen title="GConn — 커넥터" code={`<GConn />`}>
              <div style={{ display: 'grid', placeItems: 'center', height: 80 }}>
                <GConn length={60} />
              </div>
            </Specimen>

            <Specimen title="GStrip — 씬/파형 막대" code={`<GStrip cells={[2,4,3]} fill={[1]} />`}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 220 }}>
                <GStrip cells={[2, 4, 3]} fill={[1]} />
                <GStrip cells={[5, 2]} fill={[0]} />
                <GStrip cells={[2, 2, 3]} fill={[2]} dashed />
              </div>
            </Specimen>

            <Specimen title="GDots — 임베딩 공간" code={`<GDots center="text" />`}>
              <GDots center="text" />
            </Specimen>
          </div>
        </Section>

        {/* COMPOSED */}
        <Section id="composed" kicker="06 · Spot graphics" title="조합 그래픽">
          <p className="ds-note">프리미티브를 조합한 완성 그래픽. 섹션/탭/카드에 그대로 사용.</p>
          <div className="ds-grid ds-grid-2">
            <Specimen title="PlanGraphic" code={`<PlanGraphic />`}>
              <div className="ds-fixed"><PlanGraphic /></div>
            </Specimen>
            <Specimen title="BuildGraphic" code={`<BuildGraphic />`}>
              <div className="ds-fixed"><BuildGraphic /></div>
            </Specimen>
            <Specimen title="WorkflowGraphic" code={`<WorkflowGraphic />`}>
              <div className="ds-fixed"><WorkflowGraphic /></div>
            </Specimen>
            <Specimen title="SceneGraphic — 피처카드" code={`<SceneGraphic name="target" />`}>
              <div className="ds-scene-row">
                {['target', 'people', 'build', 'cloud'].map((n) => (
                  <div key={n} style={{ width: 150 }}>
                    <SceneGraphic name={n} />
                  </div>
                ))}
              </div>
            </Specimen>
          </div>
        </Section>

        {/* TEXT FX */}
        <Section id="text-fx" kicker="07 · Motion" title="텍스트 효과">
          <Specimen
            title="WordReveal — 단어 컬러 리빌"
            desc="스크롤 진행에 따라 회색 → 본문색으로 채워지고, 일부 단어만 옅은 색 강조. (아래로 스크롤하면 재생)"
            code={`<WordReveal text="..." className="..." />`}
            wide
          >
            <div style={{ padding: '40px 0', maxWidth: 640, margin: '0 auto' }}>
              <WordReveal
                className="ds-quote"
                text={'강의만 듣고 끝나는 교육이 아니라, 우리 팀의 실제 업무를 함께 바꿔준다는 점이 달랐습니다.'}
              />
            </div>
          </Specimen>
        </Section>

        {/* MOTION */}
        <Section id="motion" kicker="08 · Motion" title="모션 · 배경 영상">
          <p className="ds-note">
            <strong>측정 결과 twelvelabs의 배경 모션은 압축 MP4 <code>{'<video autoplay loop muted playsinline>'}</code></strong>
            (object-fit: cover, CDN 호스팅)입니다. 유쳐도 동일하게 — 가벼운 모션은 CSS/GSAP,
            무거운 모션은 Remotion(<span className="mono">motion/</span>)으로 만들어 압축 WebM/MP4로 렌더 →
            <span className="mono"> web/public/assets/motion/</span>에 출력 → <code>MotionGraphic</code>으로 임베드.
            정적 비주얼은 <code>{'<img loading="lazy">'}</code>. 그라디언트 블롭은 radial-gradient.
          </p>
          <Specimen
            title="MotionGraphic — 렌더된 영상"
            desc="무거운 모션은 Remotion(motion/)으로 만들어 WebM 렌더 후 <video>로 임베드."
            code={`<MotionGraphic src="/assets/motion/spot-search.webm" />`}
          >
            <div className="ds-fixed">
              <MotionGraphic src="/assets/motion/spot-search.webm" />
            </div>
          </Specimen>
        </Section>

        {/* USAGE */}
        <Section id="usage" kicker="09 · Guide" title="사용 가이드">
          <div className="ds-guide">
            <ol>
              <li>
                새 스팟 그래픽이 필요하면 <strong>`uture-spot-graphics` 스킬</strong>을 따라
                프리미티브를 조합한다. (`composed.tsx`의 그래픽 하나를 복제해 변형)
              </li>
              <li>
                색은 <strong>토큰만</strong> 사용한다(`globals.css` `:root`). 그래픽은 모노크롬 우선,
                색은 whisper 수준으로만.
              </li>
              <li>
                틴트는 패널당 1개. 매치/강조는 태그 + 옅은 링으로 표현(솔리드 컬러 채움 금지).
              </li>
              <li>
                움직이는 요소: 기본은 CSS/GSAP. 영상이 꼭 필요하면 `motion/`에서 Remotion 렌더 →
                `web/public/assets/motion/`에 출력 → `MotionGraphic`으로 임베드.
              </li>
              <li>
                모션은 항상 `prefers-reduced-motion` 폴백을 지킨다.
              </li>
            </ol>
            <p className="ds-note">
              상세 규칙: <span className="mono">.claude/skills/uture-spot-graphics/SKILL.md</span> ·
              랜딩 보기: <a href="/">/</a>
            </p>
          </div>
        </Section>
      </main>

      <footer className="ds-foot">
        <span className="geist">uture</span> · design system · 토큰과 컴포넌트로 디자인을 일관되게 유지합니다.
      </footer>
    </div>
  )
}
