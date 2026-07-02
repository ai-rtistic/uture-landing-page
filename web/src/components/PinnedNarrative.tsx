import { useEffect, useRef } from 'react'
import { narrative } from '../data/content'
import { Container } from '../ui/primitives'
import { narrativeScenes } from './graphics/NarrativeScenes'
import { gsap, prefersReduced } from '../lib/gsap'

/**
 * 핀 고정 내러티브 — 스크럽으로 pain 문장 3개가 전환되고,
 * 각 문장과 짝지어진 장면 카드(NarrativeScenes)가 함께 크로스페이드된다.
 */
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
        <div className="container narrative-cols">
          <div className="narrative-steps">
            {narrative.steps.map((s) => (
              <div className="narrative-step" key={s.n}>
                <span className="narrative-num mono">{s.n}</span>
                <span className="narrative-stem" aria-hidden />
                <p className="narrative-text">{s.text}</p>
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
