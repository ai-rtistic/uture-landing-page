import { useEffect, useRef } from 'react'
import { narrative } from '../data/content'
import { Container } from '../ui/primitives'
import { Placeholder } from './graphics/Placeholder'
import { gsap, prefersReduced } from '../lib/gsap'

// Floating background clips/capsules (parallax). `kind: clip` slots take a real
// image/video later — see design-system 자산 스펙. `speed` drives parallax amount.
const FIELD = [
  { top: '8%', left: '4%', speed: 1.2, kind: 'capsule', tint: 'peach' },
  { top: '64%', left: '7%', speed: 1.7, kind: 'clip', w: 200, h: 124, time: '0:28–0:42' },
  { top: '22%', left: '84%', speed: 1.0, kind: 'capsule', tint: 'mint' },
  { top: '68%', left: '80%', speed: 1.9, kind: 'clip', w: 220, h: 138, time: '0:00–0:12' },
  { top: '44%', left: '92%', speed: 0.8, kind: 'capsule', tint: 'lilac' },
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
              style={{ top: f.top, left: f.left }}
            >
              {f.kind === 'capsule' ? (
                <span className={`float-capsule float-${f.tint}`} />
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
