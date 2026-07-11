import { useEffect, useRef } from 'react'
import { narrative } from '../data/content'
import { Container } from '../ui/primitives'
import { gsap, ScrollTrigger, prefersReduced } from '../lib/gsap'

/**
 * 내러티브 — 센터 스테이트먼트 변형 (TWL 문법 + uture-motion-diagrams).
 * 문구가 화면 중앙(번호 칩 + 리더 라인)에 고정되고, 스크롤로 3개 pain이 블러 디졸브 교체.
 * 문구 아래엔 씬별 정렬 다이어그램(씬당 filled 강조 1개)이 내러티브 순서로 조립되고,
 * 대형 아웃라인 캡슐 + 오로라 글로우가 핀 구간 전체를 느리게 통과한다.
 * 모든 모션은 스크롤 진행도의 순수 함수 — 검증된 목업(mockups/statement.html)의 이식.
 */

/** 센터 변형 전용 수제 줄바꿈 — 자동 개행은 단어 중간이 깨진다("숙련/도도").
 *  목업(mockups/statement.html)에서 검증한 3행 구성 그대로. */
const STMT_LINES: Record<string, string[]> = {
  '01': ['모두에게 같은 강의만 반복되는 교육.', '직무도 숙련도도 다른데, 정작', '"내 업무에 어떻게?"가 빠집니다.'],
  '02': ['강의는 들었지만 다음 날', '자기 일에 적용할 길이 막막한,', '실무로 이어지지 않는 학습.'],
  '03': ['AI 기술은 매주 쏟아지는데,', '우리 회사는 어디서부터 어떻게', '시작해야 할지 막막합니다.'],
}

function renderLines(n: string, fallback: string) {
  const lines = STMT_LINES[n]
  if (!lines) return fallback.replace(/\*\*/g, '')
  return lines.map((l, i) => (
    <span key={i}>
      {l}
      {i < lines.length - 1 && <br />}
    </span>
  ))
}

const clamp01 = (t: number) => Math.max(0, Math.min(1, t))
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

export function NarrativeCenter() {
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pin = pinRef.current
    if (!pin || prefersReduced) return

    const stmts = Array.from(pin.querySelectorAll<HTMLElement>('.nc-stmt'))
    const scenes = Array.from(pin.querySelectorAll<HTMLElement>('.nc-scene'))
    const dots = Array.from(pin.querySelectorAll<HTMLElement>('.nc-dots i'))
    const drift = pin.querySelector<HTMLElement>('.nc-drift-inner')
    const n = stmts.length

    const render = (p: number) => {
      if (drift) {
        const dh = drift.offsetHeight - window.innerHeight
        drift.style.transform = `translateY(${(-p * dh).toFixed(1)}px)`
      }
      let active = 0
      let best = Infinity
      stmts.forEach((el, i) => {
        const center = (i + 0.5) / n
        const d = Math.abs(p - center) * n // 0=밴드 중심, 0.5=경계
        const vis = clamp01((0.6 - d) / 0.2) // 홀드 후 경계 크로스페이드
        const dir = p < center ? 1 : -1
        el.style.opacity = vis.toFixed(3)
        el.style.filter = `blur(${((1 - vis) * 6).toFixed(1)}px)`
        el.style.transform = `translateY(calc(-50% + ${((1 - vis) * 42 * dir).toFixed(1)}px))`
        el.style.visibility = vis <= 0 ? 'hidden' : 'visible'
        if (d < best) {
          best = d
          active = i
        }
        // 씬 스트립 — 문구보다 좁은 밴드(먼저 떠나고 늦게 도착) + 내러티브 순서 스태거
        const visS = clamp01((0.5 - d) / 0.14)
        const lp = clamp01((p - i / n) * n)
        scenes[i]?.querySelectorAll<HTMLElement>('[data-k]').forEach((node) => {
          const k = Number(node.dataset.k)
          const ev = easeOut(clamp01((lp - 0.06 - k * 0.07) / 0.22))
          const o = Math.min(ev, visS)
          node.style.opacity = o.toFixed(3)
          node.style.visibility = o <= 0 ? 'hidden' : 'visible'
          const off = node.classList.contains('is-off') ? 16 : 0 // 단절 — 의도된 축 어긋남
          node.style.transform = `translateY(${(off + (1 - ev) * 10 + (1 - visS) * 14 * dir).toFixed(1)}px)`
        })
      })
      dots.forEach((el, i) => el.classList.toggle('on', i === active))
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pin,
        start: 'top top',
        end: '+=320%',
        pin: true,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => render(self.progress),
      })
      render(0)
    }, pin)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section narrative narrative-center">
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

      <div className="nc-pin" ref={pinRef}>
        {/* 연속 드리프트 — 대형 캡슐 아웃라인 + 오로라 1곳, 가장자리 배치 */}
        <div className="nc-drift" aria-hidden>
          <div className="nc-drift-inner">
            <span className="nc-cap" style={{ top: '6vh', left: '-14vw', width: '44vw', height: '15vw' }} />
            <span className="nc-aurora" style={{ top: '30vh', right: '-12vw', width: '36vw', height: '13vw' }} />
            <span className="nc-cap" style={{ top: '96vh', right: '-16vw', width: '46vw', height: '16vw' }} />
            <span className="nc-cap" style={{ top: '165vh', left: '-12vw', width: '40vw', height: '14vw' }} />
          </div>
        </div>

        {/* 씬 01 — 같은 강의: filled 소스 캡슐(강조 1) → 와이어 → 네 직무 필 */}
        <div className="nc-scene" aria-hidden>
          <div className="nc-strip">
            <span className="nc-pill is-fill" data-k={0}>전사 공통 강의 · 180min</span>
            <i className="nc-wire" data-k={1} />
            <span className="nc-teams" data-k={2}>
              <span className="nc-pill">영업</span>
              <span className="nc-pill">개발</span>
              <span className="nc-pill">재무</span>
              <span className="nc-pill">인사</span>
            </span>
          </div>
        </div>

        {/* 씬 02 — 실무 단절: 카드 – 파선 – ✕(강조 1) – 파선 – 어긋난 카드 */}
        <div className="nc-scene" aria-hidden>
          <div className="nc-strip">
            <span className="nc-doc" data-k={0}><b>강의 수료 노트</b><i /><i /></span>
            <i className="nc-wire is-dash" data-k={1} />
            <span className="nc-x" data-k={2}>✕</span>
            <i className="nc-wire is-dash" data-k={3} />
            <span className="nc-doc is-dim is-off" data-k={4}><b>월요일 아침, 내 실제 업무</b><i /><i /></span>
          </div>
        </div>

        {/* 씬 03 — 방향 부재: 쏟아지는 신기술들 → 파선 → 비어 있는 시작점(오렌지 파선 = 강조 1) */}
        <div className="nc-scene" aria-hidden>
          <div className="nc-strip">
            <span className="nc-bricks" data-k={0}>
              <span className="nc-brick">생성형 AI</span>
              <span className="nc-brick">에이전트</span>
              <span className="nc-brick">자동화</span>
              <span className="nc-brick">RAG</span>
            </span>
            <i className="nc-wire is-dash" data-k={1} />
            <span className="nc-x" data-k={2}>?</span>
            <i className="nc-wire is-dash" data-k={3} />
            <span className="nc-pill is-slot" data-k={4}>우리 회사의 시작점 — 아직 못 찾음</span>
          </div>
        </div>

        {/* 센터 스테이트먼트 */}
        {narrative.steps.map((s) => (
          <article className="nc-stmt" key={s.n}>
            <div className="nc-stmt-inner">
              <span className="nc-chip mono">{s.n}</span>
              <span className="nc-leader" aria-hidden />
              <p className="nc-text">{renderLines(s.n, s.text)}</p>
            </div>
          </article>
        ))}

        <div className="nc-dots" aria-hidden>
          <i />
          <i />
          <i />
        </div>
      </div>
    </section>
  )
}
