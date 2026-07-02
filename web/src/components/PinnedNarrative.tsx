import { useEffect, useRef } from 'react'
import { narrative } from '../data/content'
import { Container } from '../ui/primitives'
import { narrativeScenes } from './graphics/NarrativeScenes'
import { gsap, prefersReduced } from '../lib/gsap'

/**
 * 핀 고정 내러티브 — 스크럽으로 pain 문장 3개가 전환되고,
 * 각 문장과 짝지어진 장면 카드(NarrativeScenes)가 함께 크로스페이드된다.
 * 배경의 파스텔 캡슐 필드는 핀 구간 동안 반대 방향으로 흘러 깊이를 만든다.
 */

// 스텝별 키워드 틴트 — 장면 카드(amber/sky/rose)와 동일 계열
const STEP_TINTS = ['amber', 'sky', 'rose'] as const

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

// 패럴랙스 배경 필드 — 소프트 캡슐 + 도트 (핀보다 길게 깔고 스크럽으로 흘림)
const BG_CAPS = [
  { top: '4%', left: '6%', rot: -18, tint: 'peach' },
  { top: '14%', left: '78%', rot: 14, tint: 'sky' },
  { top: '36%', left: '40%', rot: -10, tint: 'amber' },
  { top: '52%', left: '4%', rot: 12, tint: 'lilac' },
  { top: '66%', left: '82%', rot: -16, tint: 'rose' },
  { top: '84%', left: '30%', rot: 8, tint: 'mint' },
] as const

const BG_DOTS = [
  [16, 24],
  [70, 8],
  [88, 44],
  [8, 72],
  [52, 90],
  [92, 78],
] as const

export function PinnedNarrative() {
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
          {BG_CAPS.map((c, i) => (
            <span
              className={`n-cap n-cap-${c.tint}`}
              key={i}
              style={{ top: c.top, left: c.left, rotate: `${c.rot}deg` }}
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
