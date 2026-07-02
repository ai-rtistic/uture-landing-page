import { useEffect, useRef } from 'react'
import { gsap, prefersReduced } from '../../lib/gsap'

/**
 * 히어로 배경 = 두 레이어. 전부 코드 — 영상/이미지 에셋 불필요.
 *  ① 뉴럴 메시(뒤): 얇은 엣지로 연결된 노드망 + 엣지를 타고 흐르는 오렌지 신호 펄스
 *  ② 글라스 체인(앞): 겹쳐 이어진 프로스트 비드가 베지어 곡선을 따라
 *     컨베이어처럼 실제로 흘러간다 (매 프레임 transform 갱신 — GPU 안전)
 */

type Pt = [number, number]
const bez = (t: number, p0: Pt, p1: Pt, p2: Pt): Pt => {
  const u = 1 - t
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ]
}

/* ---- 체인 경로: 우상단 화면 밖 → 중앙 관통 → 좌하단 화면 밖 (양끝이 밖이라 루프가 안 보임) ---- */
const P0: Pt = [108, -4]
const P1: Pt = [62, 32]
const P2: Pt = [22, 116]
const N_MAIN = 24
const W_BASE = 250 // 마크업 기준 폭 — 실제 크기는 scale로 조절 (repaint 없이)

// 좌상단 구석의 정적 보조 체인
const SUB = Array.from({ length: 9 }, (_, i) => {
  const t = i / 8
  const [x, y] = bez(t, [-6, 22], [12, 8], [28, -8])
  return { x, y, w: 96 - 38 * t + 8 * Math.sin(i * 1.7), rot: -34 + 18 * t }
})

const GIANTS = [
  { x: 74, y: -14, w: 560, rot: -24, blur: 34, tone: 'peach' },
  { x: -6, y: 102, w: 500, rot: 18, blur: 30, tone: 'glass' },
] as const

/* ---- 뉴럴 메시: 하단 여백 위주, 옅게 ---- */
const NODES: Pt[] = [
  [6, 64], [17, 84], [28, 62], [40, 82], [36, 50],
  [52, 72], [60, 48], [70, 88], [84, 60], [92, 84],
]
const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [4, 6], [5, 6], [5, 7], [6, 8], [7, 9], [8, 9],
]
// 각 펄스: 고정 엣지를 서로 다른 주기로 왕복 없이 흐른다
const PULSES = [
  { edge: 1, dur: 5.2, delay: 0 },
  { edge: 4, dur: 6.4, delay: 1.6 },
  { edge: 6, dur: 4.6, delay: 3.1 },
  { edge: 9, dur: 7.0, delay: 0.8 },
]

export function FlowChain() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || prefersReduced) return

    const beads = Array.from(root.querySelectorAll<HTMLElement>('.fc-main'))
    const pulses = Array.from(root.querySelectorAll<HTMLElement>('.nm-pulse'))
    let W = root.clientWidth
    let H = root.clientHeight
    const onResize = () => {
      W = root.clientWidth
      H = root.clientHeight
    }
    window.addEventListener('resize', onResize)

    gsap.set([...beads, ...pulses], { xPercent: -50, yPercent: -50 })

    const setters = beads.map((el) => ({
      el,
      x: gsap.quickSetter(el, 'x', 'px') as (v: number) => void,
      y: gsap.quickSetter(el, 'y', 'px') as (v: number) => void,
      r: gsap.quickSetter(el, 'rotation', 'deg') as (v: number) => void,
      s: gsap.quickSetter(el, 'scale') as (v: number) => void,
      bucket: '',
    }))
    const pSetters = pulses.map((el) => ({
      x: gsap.quickSetter(el, 'x', 'px') as (v: number) => void,
      y: gsap.quickSetter(el, 'y', 'px') as (v: number) => void,
      o: gsap.quickSetter(el, 'opacity') as (v: number) => void,
    }))

    const DUR = 60 // 체인 1회전(초) — 느긋한 컨베이어
    const state = { p: 0 }
    let clock = 0

    const render = () => {
      // ① 체인 컨베이어
      for (let i = 0; i < beads.length; i++) {
        const t = (i / beads.length + state.p) % 1
        const [bx, by] = bez(t, P0, P1, P2)
        // 접선 각도
        const [ax, ay] = bez(Math.max(0, t - 0.015), P0, P1, P2)
        const [cx, cy] = bez(Math.min(1, t + 0.015), P0, P1, P2)
        const rot = (Math.atan2((cy - ay) * (H / 100) * 0.62, (cx - ax) * (W / 100)) * 180) / Math.PI
        const w = 250 - 172 * t + 14 * Math.sin(i * 1.7)
        const st = setters[i]
        st.x((bx / 100) * W)
        st.y((by / 100) * H)
        st.r(rot)
        st.s(w / W_BASE)
        const bucket = w > 210 ? 'is-near' : w > 115 ? 'is-mid' : 'is-far'
        if (st.bucket !== bucket) {
          st.el.classList.remove('is-near', 'is-mid', 'is-far')
          st.el.classList.add(bucket)
          st.bucket = bucket
        }
      }
      // ② 신호 펄스
      PULSES.forEach((p, k) => {
        const local = (clock - p.delay) / p.dur
        if (local < 0) {
          pSetters[k].o(0)
          return
        }
        const t = local % 1
        const [a, b] = EDGES[p.edge]
        const x = NODES[a][0] + (NODES[b][0] - NODES[a][0]) * t
        const y = NODES[a][1] + (NODES[b][1] - NODES[a][1]) * t
        pSetters[k].x((x / 100) * W)
        pSetters[k].y((y / 100) * H)
        pSetters[k].o(Math.sin(Math.PI * t) * 0.9) // 양끝에서 페이드
      })
    }

    const tick = () => {
      const dt = gsap.ticker.deltaRatio(60) / 60
      state.p = (state.p + dt / DUR) % 1
      clock += dt
      render()
    }

    const ctx = gsap.context(() => {
      render()
      gsap.ticker.add(tick)
      gsap.to(root, { autoAlpha: 1, duration: 0.9, ease: 'power2.out' })
      // 강체 호흡 + 스크롤 패럴랙스
      gsap.to('.fc-rig', { y: -18, rotate: -1, duration: 20, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      gsap.to(root, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
    }, root)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('resize', onResize)
      ctx.revert()
    }
  }, [])

  return (
    <div className="flow-chain" ref={ref} aria-hidden>
      {/* ① 뉴럴 메시 — 얇은 엣지 + 노드 + 흐르는 신호 */}
      <svg className="nm-edges" viewBox="0 0 100 100" preserveAspectRatio="none">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {NODES.map(([x, y], i) => (
        <span className="nm-node" key={i} style={{ left: `${x}%`, top: `${y}%` }} />
      ))}
      {PULSES.map((_, i) => (
        <span className="nm-pulse" key={i} />
      ))}

      {/* ② 글라스 체인 */}
      <div className="fc-rig">
        {SUB.map((b, i) => (
          <span
            className="fc-bead is-far"
            key={`s${i}`}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.w,
              height: b.w * 0.66,
              rotate: `${b.rot}deg`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
        {Array.from({ length: N_MAIN }, (_, i) => (
          <span
            className={`fc-bead fc-main ${i === 15 ? 'is-accent' : ''}`}
            key={i}
            style={{ width: W_BASE, height: W_BASE * 0.66, zIndex: 30 - (i % 24) }}
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
        {/* 체인에 매달린 산출물 태그 */}
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
