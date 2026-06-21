import { useEffect, useRef } from 'react'
import { narrative } from '../data/content'
import { Container } from '../ui/primitives'
import { Placeholder } from './graphics/Placeholder'
import { BeadChain } from './graphics/BeadChain'
import { gsap, prefersReduced } from '../lib/gsap'

// A TALL background canvas (taller than the viewport) of flowing bead-chains
// + clip slots, spread top→bottom. The whole layer streams on scroll.
// `kind: clip` slots take a real image/video later — see design-system 자산 스펙.
const FIELD = [
  { top: '2%', left: '56%', rot: -20, kind: 'chain', count: 13, curve: 30 },
  { top: '12%', left: '-6%', rot: -14, kind: 'chain', count: 12, curve: 26 },
  { top: '26%', left: '70%', rot: -22, kind: 'chain', count: 11, curve: 30 },
  { top: '30%', left: '3%', rot: 0, kind: 'clip', w: 200, h: 124, time: '0:28–0:42' },
  { top: '46%', left: '-4%', rot: -16, kind: 'chain', count: 13, curve: 30 },
  { top: '50%', left: '74%', rot: 0, kind: 'clip', w: 220, h: 138, time: '0:00–0:12' },
  { top: '66%', left: '48%', rot: -20, kind: 'chain', count: 12, curve: 28 },
  { top: '80%', left: '2%', rot: -16, kind: 'chain', count: 12, curve: 26 },
  { top: '90%', left: '64%', rot: -22, kind: 'chain', count: 11, curve: 28 },
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

      // stream the whole tall background canvas down→up across the pinned scroll
      gsap.fromTo(
        '.narrative-field',
        { yPercent: 14 },
        {
          yPercent: -66,
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
        <div className="narrative-field" aria-hidden>
          {FIELD.map((f, i) => (
            <div
              className="float-item"
              key={i}
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
