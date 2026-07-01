import { useEffect, useRef, type ReactNode, type Ref } from 'react'
import { gsap, prefersReduced } from '../../lib/gsap'

/**
 * Looping GSAP sequence driver for in-page product demos.
 * - Plays only while in viewport (IntersectionObserver), pauses off-screen.
 * - prefers-reduced-motion: the timeline is never built, so the markup must
 *   render the complete FINAL frame by default — `build` may only hide/move
 *   elements via tl.set / tl.from.
 * Selector text inside `build` is root-scoped (gsap.context).
 */
export function useLoopTimeline(
  build: (tl: gsap.core.Timeline, root: HTMLDivElement) => void,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReduced) return
    let tl: gsap.core.Timeline | null = null
    const ctx = gsap.context(() => {
      tl = gsap.timeline({ repeat: -1, repeatDelay: 1.4, paused: true })
      build(tl, root)
    }, root)
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? tl?.play() : tl?.pause()),
      { threshold: 0.3 },
    )
    io.observe(root)
    return () => {
      io.disconnect()
      ctx.revert()
    }
  }, [build])
  return rootRef
}

/** Char-by-char typing beat (no TextPlugin). Pass the target element. */
export function typeText(
  tl: gsap.core.Timeline,
  el: Element | null,
  text: string,
  cps = 20,
) {
  if (!el) return
  const state = { n: 0 }
  tl.set(el, { textContent: '' })
  tl.to(state, {
    n: text.length,
    duration: text.length / cps,
    ease: 'none',
    onUpdate() {
      el.textContent = text.slice(0, Math.round(state.n))
    },
  })
}

export type DemoTint = 'sky' | 'lilac' | 'amber' | 'mint' | 'peach' | 'rose'

/** Tinted product-UI panel that frames every demo sequence. */
export function DemoStage({
  tint,
  label,
  children,
  stageRef,
}: {
  tint: DemoTint
  label: string
  children: ReactNode
  stageRef?: Ref<HTMLDivElement>
}) {
  return (
    <div className={`dm-stage dm-${tint}`} ref={stageRef} role="img" aria-label={label}>
      <div className="dm-chrome" aria-hidden>
        <span className="dm-dot" />
        <span className="dm-dot" />
        <span className="dm-dot" />
        <span className="dm-chrome-label mono">{label}</span>
      </div>
      <div className="dm-body" aria-hidden>
        {children}
      </div>
    </div>
  )
}
