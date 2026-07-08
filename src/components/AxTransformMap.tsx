import { useEffect, useRef } from 'react'
import { axMap } from '../data/content'
import { Container } from '../ui/primitives'
import { gsap, prefersReduced } from '../lib/gsap'

/**
 * 산업별 AX 전환 맵 — pinned, scroll-scrubbed.
 *
 * 3blue1brown 식으로 "구조가 눈으로 읽히는" 모션: 흩어진 회색 수작업 노드
 * 클라우드가 매끄럽게 변형되어 검색·생성·자동화 3단계 파이프라인으로 재조립된다.
 * 스크롤이 산업을 하나씩 훑고(각 산업마다 transform 재생), 마지막에 모든 분야가 점등.
 *
 * 좌표계: viewBox 0 0 100 50. 모든 모션은 progress(0..1)에서 imperative 계산 →
 * ref 직접 갱신(React 리렌더 없이 부드러운 scrub).
 */

const INDUS = axMap.industries
const DOTS = 12
const STAGE_X = [42, 63, 84]
const ROW_Y = 26

// deterministic scatter cloud (left region)
const SCATTER = Array.from({ length: DOTS }, (_, i) => ({
  x: 10 + ((i * 37) % 22),
  y: 9 + ((i * 53) % 30),
}))
// pipeline target = 3 stage clusters of 4 (2×2 each)
const TARGET = Array.from({ length: DOTS }, (_, i) => {
  const g = Math.floor(i / 4)
  const w = i % 4
  return {
    x: STAGE_X[g] + (w % 2) * 4 - 2,
    y: ROW_Y + Math.floor(w / 2) * 4 - 2,
  }
})

const GREY = [201, 199, 196]
const ORANGE = [255, 122, 51]

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
const smooth = (v: number, a: number, b: number) =>
  clamp01((v - a) / (b - a))
const mix = (c1: number[], c2: number[], t: number) =>
  `rgb(${c1.map((c, i) => Math.round(c + (c2[i] - c) * t)).join(',')})`

export function AxTransformMap() {
  const pinRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<(SVGCircleElement | null)[]>([])
  const connRefs = useRef<(SVGLineElement | null)[]>([])
  const stageRefs = useRef<(SVGGElement | null)[]>([])
  const pulseRef = useRef<SVGCircleElement>(null)
  const diagramRef = useRef<SVGSVGElement>(null)
  const capRef = useRef<HTMLDivElement>(null)
  const capFieldRef = useRef<HTMLSpanElement>(null)
  const capBeforeRef = useRef<HTMLParagraphElement>(null)
  const capAfterRef = useRef<HTMLParagraphElement>(null)
  const finaleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pin = pinRef.current
    if (!pin) return
    if (prefersReduced) return // static fallback (see markup)

    let lastIdx = -1
    const n = INDUS.length
    const finaleStart = 0.86

    const render = (p: number) => {
      const inFinale = p >= finaleStart
      if (diagramRef.current)
        diagramRef.current.style.opacity = inFinale
          ? `${1 - smooth(p, finaleStart, finaleStart + 0.05)}`
          : '1'
      if (capRef.current && inFinale) capRef.current.style.opacity = '0'
      if (finaleRef.current)
        finaleRef.current.style.opacity = inFinale
          ? `${smooth(p, finaleStart + 0.02, finaleStart + 0.1)}`
          : '0'

      if (inFinale) return

      const fp = (p / finaleStart) * n
      const idx = Math.min(n - 1, Math.floor(fp))
      const local = fp - idx
      const tri =
        local < 0.5 ? local / 0.5 : local < 0.8 ? 1 : 1 - (local - 0.8) / 0.2
      const assemble = easeInOut(clamp01(tri))
      const capVis =
        smooth(local, 0.16, 0.32) * (1 - smooth(local, 0.82, 0.97))

      // dots morph scatter → pipeline
      for (let i = 0; i < DOTS; i++) {
        const el = dotRefs.current[i]
        if (!el) continue
        const x = SCATTER[i].x + (TARGET[i].x - SCATTER[i].x) * assemble
        const y = SCATTER[i].y + (TARGET[i].y - SCATTER[i].y) * assemble
        el.setAttribute('cx', x.toFixed(2))
        el.setAttribute('cy', y.toFixed(2))
        el.setAttribute('fill', mix(GREY, ORANGE, assemble))
        el.setAttribute('r', (1.5 + 0.4 * assemble).toFixed(2))
      }
      // connectors + stage boxes appear with assemble
      connRefs.current.forEach((l) => {
        if (l) l.style.opacity = `${0.15 + 0.55 * assemble}`
      })
      stageRefs.current.forEach((g) => {
        if (g) g.style.opacity = `${assemble}`
      })
      // pulse travelling along backbone
      if (pulseRef.current) {
        const px = 34 + (((p * 2.4) % 1) * 60)
        pulseRef.current.setAttribute('cx', px.toFixed(2))
        pulseRef.current.style.opacity = `${0.5 * assemble}`
      }

      // text swaps on industry change
      if (idx !== lastIdx) {
        lastIdx = idx
        const it = INDUS[idx]
        if (capFieldRef.current) capFieldRef.current.textContent = it.field
        if (capBeforeRef.current) capBeforeRef.current.textContent = it.before
        if (capAfterRef.current) capAfterRef.current.textContent = it.after
      }
      if (capRef.current) capRef.current.style.opacity = `${capVis}`
    }

    const ctx = gsap.context(() => {
      ScrollTriggerRender(pin, n, render)
    }, pin)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section axmap" id="ax-map">
      <Container>
        <div className="axmap-head">
          <h2 className="axmap-title reveal">
            {axMap.title.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h2>
          <p className="axmap-intro reveal" data-delay="120">
            {axMap.intro}
          </p>
        </div>
      </Container>

      <div className="axmap-pin" ref={pinRef}>
        <div className="axmap-stage">
          <svg
            className="axmap-svg"
            ref={diagramRef}
            viewBox="0 0 100 50"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            {/* backbone */}
            <line
              x1="32"
              y1={ROW_Y}
              x2="94"
              y2={ROW_Y}
              stroke="var(--border)"
              strokeWidth="0.4"
            />
            {/* connectors between stage clusters */}
            {[0, 1].map((k) => (
              <line
                key={k}
                ref={(el) => (connRefs.current[k] = el)}
                x1={STAGE_X[k] + 3}
                y1={ROW_Y}
                x2={STAGE_X[k + 1] - 3}
                y2={ROW_Y}
                stroke="var(--brand)"
                strokeWidth="0.5"
                opacity="0"
              />
            ))}
            {/* input / output caps */}
            <text x="30" y={ROW_Y + 0.8} textAnchor="end" className="axmap-io">
              수작업
            </text>
            <text x="96" y={ROW_Y + 0.8} textAnchor="start" className="axmap-io">
              결과
            </text>
            <circle ref={pulseRef} cx="34" cy={ROW_Y} r="0.9" fill="var(--brand)" opacity="0" />

            {/* stage labels (dynamic per industry) */}
            {STAGE_X.map((x, k) => (
              <g key={k} ref={(el) => (stageRefs.current[k] = el)} opacity="0">
                <text
                  x={x}
                  y={ROW_Y - 6}
                  textAnchor="middle"
                  className="axmap-stage-label"
                >
                  {axMap.method[k].label}
                </text>
                <text x={x} y={ROW_Y - 10} textAnchor="middle" className="axmap-stage-step">
                  {axMap.method[k].step}
                </text>
              </g>
            ))}

            {/* task dots */}
            {Array.from({ length: DOTS }, (_, i) => (
              <circle
                key={i}
                ref={(el) => (dotRefs.current[i] = el)}
                cx={SCATTER[i].x}
                cy={SCATTER[i].y}
                r="1.5"
                fill="rgb(201,199,196)"
              />
            ))}
          </svg>

          <div className="axmap-caption" ref={capRef}>
            <div className="axmap-cap-top">
              <span className="axmap-cap-field" ref={capFieldRef}>
                {INDUS[0].field}
              </span>
            </div>
            <p className="axmap-cap-before" ref={capBeforeRef}>
              {INDUS[0].before}
            </p>
            <p className="axmap-cap-after" ref={capAfterRef}>
              {INDUS[0].after}
            </p>
          </div>

          <div className="axmap-finale" ref={finaleRef}>
            <p className="axmap-finale-lead">{axMap.finale.lead}</p>
            <h3 className="axmap-finale-head">{axMap.finale.headline}</h3>
            <div className="axmap-finale-chips">
              {INDUS.map((it) => (
                <span className="axmap-chip" key={it.id}>
                  {it.field} · {it.after}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* reduced-motion / no-JS static fallback */}
        <div className="axmap-static">
          {INDUS.map((it) => (
            <div className="axmap-static-row" key={it.id}>
              <span className="axmap-cap-field">{it.field}</span>
              <span className="axmap-static-after">{it.after}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// keep the ScrollTrigger wiring out of the component body for readability
function ScrollTriggerRender(
  pin: HTMLElement,
  n: number,
  render: (p: number) => void,
) {
  const end = `+=${n * 78 + 90}%`
  gsap.to(
    {},
    {
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end,
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => render(self.progress),
      },
    },
  )
  render(0)
}
