import { useEffect, useRef } from 'react'
import { narrative } from '../data/content'
import { Container } from '../ui/primitives'
import { gsap, prefersReduced } from '../lib/gsap'

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

    const ctx = gsap.context(() => {
      gsap.set(steps, { opacity: 0, filter: 'blur(14px)', yPercent: 6 })
      gsap.set(steps[0], { opacity: 1, filter: 'blur(0px)', yPercent: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${steps.length * 80}%`,
          pin: true,
          scrub: 0.7,
        },
      })

      steps.forEach((step, i) => {
        if (i === 0) return
        const prev = steps[i - 1]
        tl.to(prev, { opacity: 0, filter: 'blur(14px)', yPercent: -6, duration: 1 }, '+=0.6')
        tl.to(step, { opacity: 1, filter: 'blur(0px)', yPercent: 0, duration: 1 }, '<')
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
