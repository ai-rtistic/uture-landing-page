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
  onLoop?: () => void,
) {
  const rootRef = useRef<HTMLDivElement>(null)
  const onLoopRef = useRef(onLoop)
  onLoopRef.current = onLoop
  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReduced) return
    let tl: gsap.core.Timeline | null = null
    const ctx = gsap.context(() => {
      tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.4,
        paused: true,
        // 한 사이클 완주 시점 알림 — 캐러셀이 "시퀀스가 끝나면" 다음 카드로 넘어갈 수 있게
        onRepeat: () => onLoopRef.current?.(),
      })
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

/** 세로 연결선 드로우 비트 — 작업이 다음 단계로 '흘러가는' 것을 보여준다.
 *  마크업: <span className="dm-wire js-..." /> (기본 상태 = 그려진 상태) */
export function drawWire(tl: gsap.core.Timeline, sel: string, position?: gsap.Position) {
  tl.fromTo(
    sel,
    { scaleY: 0 },
    { scaleY: 1, duration: 0.35, ease: 'power2.out' },
    position,
  )
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
