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
  ['--bg', '#f4f3f3'],
  ['--surface', '#ffffff'],
  ['--surface-2', '#ececec'],
  ['--text', '#1d1c1b'],
  ['--text-2', '#3e3e3c'],
  ['--muted', '#8e8d8d'],
  ['--border', '#d3d1cf'],
]
const TINTS: Tint[] = ['peach', 'amber', 'sky', 'rose', 'lilac', 'mint', 'neutral']
const NAV = [
  ['tokens', '색상·토큰'],
  ['type', '타이포그래피'],
  ['controls', '버튼·배지'],
  ['primitives', '그래픽 프리미티브'],
  ['composed', '조합 그래픽'],
  ['text-fx', '텍스트 효과'],
  ['motion', '모션(Remotion)'],
  ['usage', '사용 가이드'],
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
              <span className="ds-type-tag mono">Display / 56–78px</span>
              <span style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                AI로 일하는 조직으로.
              </span>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-tag mono">H2 / 40–50px</span>
              <span style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.025em' }}>
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
              <span className="ds-type-tag mono">Caption / 13px</span>
              <span style={{ fontSize: 13, color: 'var(--muted)' }}>IT · FinTech</span>
            </div>
            <div className="ds-type-row">
              <span className="ds-type-tag mono">Mono / Geist</span>
              <span className="mono" style={{ fontSize: 14 }}>EDUCATE → EXECUTE → BUILD</span>
            </div>
          </div>
        </Section>

        {/* BUTTONS + BADGES */}
        <Section id="controls" kicker="03 · Components" title="버튼 · 배지">
          <div className="ds-grid">
            <Specimen title="Button — dark" code={`<Button href="#">AX 도입 문의하기</Button>`}>
              <Button href="#dummy">AX 도입 문의하기</Button>
            </Specimen>
            <Specimen title="Button — ghost" code={`<Button href="#" variant="ghost">유쳐의 방식 보기</Button>`}>
              <Button href="#dummy" variant="ghost">유쳐의 방식 보기</Button>
            </Specimen>
            <Specimen title="Pill / badge" code={`<Pill>고객 이야기</Pill>`}>
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
        <Section id="primitives" kicker="04 · Spot graphics" title="그래픽 프리미티브">
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
        <Section id="composed" kicker="05 · Spot graphics" title="조합 그래픽">
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
        <Section id="text-fx" kicker="06 · Motion" title="텍스트 효과">
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
        <Section id="motion" kicker="07 · Motion" title="모션 (Remotion)">
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
        <Section id="usage" kicker="08 · Guide" title="사용 가이드">
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
