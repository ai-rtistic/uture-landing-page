import { useEffect, useRef } from 'react'
import { narrative } from '../data/content'
import { Container } from '../ui/primitives'
import { narrativeScenes } from './graphics/NarrativeScenes'
import { NarrativeCenter } from './NarrativeCenter'
import { gsap, prefersReduced } from '../lib/gsap'

/**
 * 핀 고정 내러티브 — 스크럽으로 pain 문장 3개가 전환되고,
 * 각 문장과 짝지어진 장면 카드(NarrativeScenes)가 함께 크로스페이드된다.
 * 배경의 파스텔 캡슐 필드는 핀 구간 동안 반대 방향으로 흘러 깊이를 만든다.
 */

/** 레이아웃 변형 스위치 — 'center'로 바꾸면 TWL 센터 스테이트먼트 변형(NarrativeCenter)으로 전환.
 *  센터 변형은 mockups/statement.html로 검증 완료, 오너 승인 시 한 단어 교체. */
const NARRATIVE_VARIANT: 'split' | 'center' = 'center'

// 섹션 단일 틴트(amber) — 색 로테이션은 섹션 단위로만 (전문성 원칙)
const STEP_TINTS = ['amber', 'amber', 'amber'] as const

/** content.ts의 `**단어**` 마크업을 강조 span으로 렌더 */
function renderHighlighted(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((seg, i) =>
    seg.startsWith('**') ? (
      <em className="narrative-hl" key={i}>
        {seg.slice(2, -2)}
      </em>
    ) : (
      <span key={i}>{seg}</span>
    ),
  )
}

// 패럴랙스 배경 필드 — 와이어프레임 UI 실루엣 (단일 amber 틴트).
// 원칙: 크기 위계 3단(대형은 가장자리 크롭) + 콘텐츠(중앙 텍스트·우측 카드)를 피해
// 프레임의 모서리에 배치 + 채움(is-fill)도 테두리를 유지해 '얼룩'이 아닌 형태로 읽히게.
type BgShape = {
  top: string
  left: string
  rot: number
  kind: 'cap' | 'tile' | 'card'
  w: number
  h: number
  fill?: boolean
  dim?: boolean
}
const BG_SHAPES: BgShape[] = [
  // 좌상 — 대형 캡슐, 모서리에서 크롭 (히어로 타일 스케일 에코)
  { top: '-7%', left: '-7%', rot: -16, kind: 'cap', w: 400, h: 128 },
  // 우상 — 카드 실루엣 (크롬 라인이 있는 UI 창)
  { top: '6%', left: '82%', rot: 7, kind: 'card', w: 250, h: 168, fill: true },
  // 우중 — 중형 캡슐 (원경, 흐림)
  { top: '56%', left: '90%', rot: -9, kind: 'cap', w: 210, h: 68, dim: true },
  // 좌하 — 대형 타일, 가장자리 크롭 + 워시
  { top: '66%', left: '-5%', rot: 10, kind: 'tile', w: 250, h: 165, fill: true },
  // 하중 — 소형 캡슐 (원경)
  { top: '90%', left: '55%', rot: -5, kind: 'cap', w: 145, h: 48, dim: true },
] as const

// 도트는 실루엣 궤도를 따라가는 별자리 느낌으로 소수만
const BG_DOTS = [
  [24, 12],
  [76, 34],
  [10, 52],
  [66, 84],
] as const

export function PinnedNarrative() {
  if (NARRATIVE_VARIANT === 'center') return <NarrativeCenter />
  return <PinnedNarrativeSplit />
}

function PinnedNarrativeSplit() {
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pin = pinRef.current
    if (!pin) return
    const steps = Array.from(pin.querySelectorAll<HTMLElement>('.narrative-step'))
    const scenes = Array.from(pin.querySelectorAll<HTMLElement>('.ns-scene'))
    if (!steps.length) return

    if (prefersReduced) {
      steps.forEach((s) => gsap.set(s, { opacity: 1, filter: 'none', position: 'relative' }))
      return
    }

    const end = () => `+=${steps.length * 80}%`

    const ctx = gsap.context(() => {
      gsap.set(steps, { opacity: 0, filter: 'blur(14px)', yPercent: 6 })
      gsap.set(steps[0], { opacity: 1, filter: 'blur(0px)', yPercent: 0 })
      gsap.set(scenes, { autoAlpha: 0, y: 26, rotate: 1.5 })
      if (scenes[0]) gsap.set(scenes[0], { autoAlpha: 1, y: 0, rotate: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: pin, start: 'top top', end, pin: true, scrub: 0.7 },
      })
      steps.forEach((step, i) => {
        if (i === 0) return
        const prev = steps[i - 1]
        tl.to(prev, { opacity: 0, filter: 'blur(14px)', yPercent: -6, duration: 1 }, '+=0.6')
        tl.to(step, { opacity: 1, filter: 'blur(0px)', yPercent: 0, duration: 1 }, '<')
        if (scenes[i - 1] && scenes[i]) {
          tl.to(scenes[i - 1], { autoAlpha: 0, y: -26, rotate: -1.5, duration: 1 }, '<')
          tl.to(scenes[i], { autoAlpha: 1, y: 0, rotate: 0, duration: 1 }, '<+=0.15')
        }
      })
      tl.to({}, { duration: 0.6 })

      // 배경 필드: 핀 구간 전체에 걸쳐 아래→위로 흘러가는 패럴랙스
      gsap.fromTo(
        '.narrative-bg',
        { yPercent: 12 },
        {
          yPercent: -44,
          ease: 'none',
          scrollTrigger: { trigger: pin, start: 'top top', end, scrub: 0.5 },
        },
      )
    }, pin)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section narrative">
      <Container>
        <div className="narrative-head">
          <h2 className="narrative-title reveal">
            {narrative.title.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h2>
          <div className="narrative-intro reveal" data-delay="120">
            {narrative.intro.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
        </div>
      </Container>

      <div className="narrative-pin" ref={pinRef}>
        <div className="narrative-bg" aria-hidden>
          {BG_SHAPES.map((c, i) => (
            <span
              className={`n-shape n-${c.kind}${c.fill ? ' is-fill' : ''}${c.dim ? ' is-dim' : ''}`}
              key={i}
              style={{ top: c.top, left: c.left, width: c.w, height: c.h, rotate: `${c.rot}deg` }}
            />
          ))}
          {BG_DOTS.map(([x, y], i) => (
            <span className="n-dot" key={i} style={{ left: `${x}%`, top: `${y}%` }} />
          ))}
        </div>
        <div className="container narrative-cols">
          <div className="narrative-steps">
            {narrative.steps.map((s, i) => (
              <div className="narrative-step" data-tint={STEP_TINTS[i % STEP_TINTS.length]} key={s.n}>
                <span className="narrative-num mono">{s.n}</span>
                <span className="narrative-stem" aria-hidden />
                <p className="narrative-text">{renderHighlighted(s.text)}</p>
              </div>
            ))}
          </div>
          <div className="narrative-scenes" aria-hidden>
            {narrativeScenes.map((Scene, i) => (
              <div className="ns-scene" key={i}>
                <Scene />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
