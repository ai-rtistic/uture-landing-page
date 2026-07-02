import { useEffect, useRef } from 'react'
import { gsap, prefersReduced } from '../../lib/gsap'

/**
 * 히어로 배경 — 트웰브랩스 시그니처의 유쳐 버전.
 * 거대한 프로스트 글라스 비드(라운드 타일)가 곡선을 따라 흐른다.
 * 무채색 기조 + 오렌지 비드 소수(섹션 단일 틴트 원칙), 크기별 블러로 피사계심도.
 * 전부 CSS 그라디언트 — 이미지/영상 에셋 불필요.
 */

type Pt = [number, number]
const bez = (t: number, p0: Pt, p1: Pt, p2: Pt): Pt => {
  const u = 1 - t
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ]
}
const angle = (t: number, p0: Pt, p1: Pt, p2: Pt) => {
  const [x1, y1] = bez(Math.max(0, t - 0.02), p0, p1, p2)
  const [x2, y2] = bez(Math.min(1, t + 0.02), p0, p1, p2)
  return (Math.atan2(y2 - y1, (x2 - x1) * 1.6) * 180) / Math.PI
}

type Bead = { x: number; y: number; rot: number; w: number; blur: number; accent?: boolean }

function chain(p0: Pt, p1: Pt, p2: Pt, n: number, accentAt: number[], scale = 1): Bead[] {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    const [x, y] = bez(t, p0, p1, p2)
    // 크기·블러 변주 — 큰 비드일수록 가깝고 흐릿하게 (피사계심도)
    const w = (150 + 90 * Math.sin(i * 2.1 + 1)) * scale
    const blur = w > 190 * scale ? 16 : w > 150 * scale ? 7 : 3
    return { x, y, rot: angle(t, p0, p1, p2), w, blur, accent: accentAt.includes(i) }
  })
}

// 우측을 크게 감아 도는 메인 체인 + 좌하단 짧은 꼬리 (텍스트 영역은 비운다)
const MAIN = chain([62, -16], [116, 42], [40, 122], 13, [2])
const TAIL = chain([-8, 72], [10, 96], [34, 118], 5, [2], 0.7)

const TAGS = [
  { x: 47, y: 8, label: '경비정산 자동화 · 운영중' },
  { x: 17, y: 80, label: 'VOC 분류 · 운영중' },
]

export function FlowChain() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return
    const ctx = gsap.context(() => {
      // 아주 느린 드리프트 — 살아있되 시선을 뺏지 않게
      gsap.to(el, { y: -26, duration: 16, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to('.fc-bead', {
        y: 14,
        duration: 7,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: { each: 0.35, from: 'random' },
      })
      // 스크롤 시 체인이 카피보다 느리게 밀려 올라가는 패럴랙스
      gsap.to(el, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div className="flow-chain" ref={ref} aria-hidden>
      {[...MAIN, ...TAIL].map((b, i) => (
        <span
          className={`fc-bead ${b.accent ? 'is-accent' : ''}`}
          key={i}
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.w,
            height: b.w * 0.62,
            rotate: `${b.rot}deg`,
            filter: `blur(${b.blur}px)`,
          }}
        />
      ))}
      {TAGS.map((t) => (
        <span className="fc-tag" key={t.label} style={{ left: `${t.x}%`, top: `${t.y}%` }}>
          <i />
          <span className="tag mono">{t.label}</span>
        </span>
      ))}
    </div>
  )
}
