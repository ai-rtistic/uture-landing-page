import { useEffect, useRef } from 'react'
import { gsap, prefersReduced } from '../../lib/gsap'

/**
 * 히어로 배경 — 연속된 "프로스트 글라스 체인" (트웰브랩스 문법의 유쳐 번역).
 * 핵심: ①구슬이 겹치며 이어지는 하나의 팔찌 ②중경은 쨍하게, 전경 초대형만 블러(DOF)
 * ③볼륨 음영(하이라이트+중간톤+반사광) ④무채색 + 오렌지 소수. 전부 CSS.
 */

type Pt = [number, number]
const bez = (t: number, p0: Pt, p1: Pt, p2: Pt): Pt => {
  const u = 1 - t
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ]
}
const tangent = (t: number, p0: Pt, p1: Pt, p2: Pt) => {
  const [x1, y1] = bez(Math.max(0, t - 0.015), p0, p1, p2)
  const [x2, y2] = bez(Math.min(1, t + 0.015), p0, p1, p2)
  return (Math.atan2((y2 - y1) * 0.62, (x2 - x1) * 1.55) * 180) / Math.PI
}

type Bead = {
  x: number
  y: number
  rot: number
  w: number
  depth: 'far' | 'mid' | 'near'
  accent?: boolean
  z: number
}

/** 촘촘히 겹치는 연속 체인 — w는 t를 따라 부드럽게 변한다 (가까울수록 큼) */
function chain(
  p0: Pt,
  p1: Pt,
  p2: Pt,
  n: number,
  wFrom: number,
  wTo: number,
  accentAt: number[] = [],
): Bead[] {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    const [x, y] = bez(t, p0, p1, p2)
    const w = wFrom + (wTo - wFrom) * t + 14 * Math.sin(i * 1.7)
    const depth: Bead['depth'] = w > 210 ? 'near' : w > 115 ? 'mid' : 'far'
    return { x, y, rot: tangent(t, p0, p1, p2), w, depth, accent: accentAt.includes(i), z: i }
  })
}

// 메인 체인: 우상단 화면 밖에서 들어와 중앙을 관통해 좌하단으로 빠진다 (카드 뒤를 지남)
const MAIN = chain([106, 2], [62, 30], [26, 112], 24, 250, 78, [15])
// 보조 체인: 좌상단 구석을 스치는 작은 원경
const SUB = chain([-6, 22], [12, 8], [28, -8], 9, 96, 58)

// 초대형 전경 비드 — 화면 모서리에 걸쳐 크게 잘림, 강한 블러 (사진의 전경 보케)
const GIANTS = [
  { x: 74, y: -14, w: 560, rot: -24, blur: 34, tone: 'peach' },
  { x: -6, y: 102, w: 500, rot: 18, blur: 30, tone: 'glass' },
] as const

export function FlowChain() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return
    const ctx = gsap.context(() => {
      // 체인은 강체처럼 통째로, 아주 느리게 호흡한다 (개별 부유 금지 — 연속성 유지)
      gsap.to('.fc-rig', {
        y: -22,
        rotate: -1.2,
        duration: 20,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })
      gsap.to(el, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div className="flow-chain" ref={ref} aria-hidden>
      <div className="fc-rig">
        {[...SUB, ...MAIN].map((b, i) => (
          <span
            className={`fc-bead is-${b.depth} ${b.accent ? 'is-accent' : ''}`}
            key={i}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.w,
              height: b.w * 0.66,
              rotate: `${b.rot}deg`,
              zIndex: b.z,
            }}
          />
        ))}
        {GIANTS.map((g, i) => (
          <span
            className={`fc-giant is-${g.tone}`}
            key={i}
            style={{
              left: `${g.x}%`,
              top: `${g.y}%`,
              width: g.w,
              height: g.w * 0.62,
              rotate: `${g.rot}deg`,
              filter: `blur(${g.blur}px)`,
            }}
          />
        ))}
        {/* 체인에 매달린 산출물 태그 — 타임스탬프 문법의 유쳐 번역 */}
        <span className="fc-tag" style={{ left: '48%', top: '60%' }}>
          <span className="fc-thumb">
            <i />
            <i />
            <i className="is-accent" />
          </span>
          <em />
          <span className="tag mono">주간 리포트 · 자동 발송</span>
        </span>
      </div>
    </div>
  )
}
