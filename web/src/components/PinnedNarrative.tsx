import { useEffect, useRef } from 'react'
import { narrative } from '../data/content'
import { Container } from '../ui/primitives'
import { Placeholder } from './graphics/Placeholder'
import { BeadChain } from './graphics/BeadChain'
import { gsap, prefersReduced } from '../lib/gsap'

// Flowing background: gradient bead-chains + clip slots (parallax).
// `kind: clip` slots take a real image/video later — see design-system 자산 스펙.
const FIELD = [
  { top: '6%', left: '-4%', speed: 1.1, rot: -14, kind: 'chain', count: 12, curve: 26 },
  { top: '30%', left: '60%', speed: 1.5, rot: -22, kind: 'chain', count: 14, curve: 34 },
  { top: '78%', left: '-6%', speed: 1.8, rot: -16, kind: 'chain', count: 13, curve: 30 },
  { top: '88%', left: '52%', speed: 0.9, rot: -20, kind: 'chain', count: 10, curve: 22 },
  { top: '62%', left: '6%', speed: 1.7, rot: 0, kind: 'clip', w: 200, h: 124, time: '0:28–0:42' },
  { top: '66%', left: '80%', speed: 1.4, rot: 0, kind: 'clip', w: 220, h: 138, time: '0:00–0:12' },
] as const

export function PinnedNarrative() {
  const pinRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pin = pinRef.current
    const wrap = stepsRef.current
    if (!pin || !wrap) return
    const steps = Array.from(wrap.querySelectorAll<HTMLElement>('.narrative-step'))
    if (!steps.length) return

    if (prefersReduced) {
      steps.forEach((s) => gsap.set(s, { opacity: 1, filter: 'none', position: 'relative' }))
      return
    }

    const end = () => `+=${steps.length * 80}%`

    const ctx = gsap.context(() => {
      gsap.set(steps, { opacity: 0, filter: 'blur(14px)', yPercent: 6 })
      gsap.set(steps[0], { opacity: 1, filter: 'blur(0px)', yPercent: 0 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: pin, start: 'top top', end, pin: true, scrub: 0.7 },
      })
      steps.forEach((step, i) => {
        if (i === 0) return
        const prev = steps[i - 1]
        tl.to(prev, { opacity: 0, filter: 'blur(14px)', yPercent: -6, duration: 1 }, '+=0.6')
        tl.to(step, { opacity: 1, filter: 'blur(0px)', yPercent: 0, duration: 1 }, '<')
      })
      tl.to({}, { duration: 0.6 })

      // parallax the floating field across the pinned scroll
      gsap.utils.toArray<HTMLElement>('.float-item').forEach((el) => {
        const sp = parseFloat(el.dataset.speed || '1')
        gsap.fromTo(
          el,
          { yPercent: 10 * sp },
          {
            yPercent: -22 * sp,
            xPercent: 5 * sp,
            ease: 'none',
            scrollTrigger: { trigger: pin, start: 'top top', end, scrub: 0.8 },
          },
        )
      })
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
        <div className="narrative-field" aria-hidden>
          {FIELD.map((f, i) => (
            <div
              className="float-item"
              key={i}
              data-speed={f.speed}
              style={{ top: f.top, left: f.left, rotate: `${f.rot}deg` }}
            >
              {f.kind === 'chain' ? (
                <BeadChain count={f.count} curve={f.curve} />
              ) : (
                <div className="float-clip">
                  <Placeholder w={f.w} h={f.h} kind="video" />
                  <span className="tag float-time mono">{f.time}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="narrative-steps" ref={stepsRef}>
          {narrative.steps.map((s) => (
            <div className="narrative-step" key={s.n}>
              <span className="narrative-num mono">{s.n}</span>
              <span className="narrative-stem" aria-hidden />
              <p className="narrative-text">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
