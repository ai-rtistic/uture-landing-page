import { useCallback, useRef, useState } from 'react'
import { drawWire, typeText, useLoopTimeline } from './stage'
import { AutomationCard } from './HeroAutomation'

/**
 * 히어로 쇼케이스 — 유스케이스 데모 카드 캐러셀 (오로라 프레임 안).
 * 상단 라벨 칩 클릭 · 좌우 스와이프 · 시퀀스 완주 시 자동 전환(호버/조작 중 정지).
 * 활성 슬라이드만 마운트(key 재발급) → GSAP 시퀀스가 항상 처음(타이핑)부터 재생.
 * reduced-motion: 자동 순환 없음 (칩/스와이프 수동 탐색은 유지).
 */


/* ---- 슬라이드 2: 사내 문서 검색 — 질문 → 근거 문서 → 답변 ---- */
const SEARCH_Q = '연차 이월 규정이 어떻게 되나요?'

function SearchCard({ onLoop }: { onLoop?: () => void }) {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLDivElement) => {
    tl.set('.js-swire1, .js-swire2', { scaleY: 0 })
    tl.set('.js-src', { autoAlpha: 0, y: 8 })
    tl.set('.js-answer', { autoAlpha: 0, y: 10 })
    tl.set('.js-cite', { autoAlpha: 0, scale: 0.6 })

    typeText(tl, root.querySelector('.js-sq'), SEARCH_Q)
    tl.to({}, { duration: 0.4 })
    drawWire(tl, '.js-swire1')
    tl.to('.js-src', { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.16 })
    tl.to({}, { duration: 0.7 })
    drawWire(tl, '.js-swire2', '+=0.2')
    tl.to('.js-answer', { autoAlpha: 1, y: 0, duration: 0.45 })
    tl.to('.js-cite', { autoAlpha: 1, scale: 1, duration: 0.32, ease: 'back.out(2.2)' }, '-=0.1')
    tl.to({}, { duration: 2.8 }) // 홀드
  }, [])
  const ref = useLoopTimeline(build, onLoop)

  return (
    <div className="ha-card" ref={ref}>
      <div className="dm-chrome">
        <span className="dm-dot" />
        <span className="dm-dot" />
        <span className="dm-dot" />
        <span className="dm-chrome-label mono">uture agent</span>
      </div>
      <div className="ha-flow">
        <div className="dm-bubble">
          <span className="js-sq">{SEARCH_Q}</span>
          <span className="dm-caret" />
        </div>
        <span className="dm-wire js-swire1" />
        <div className="dm-agents ha-agents">
          <span className="dm-agent js-src">📄 인사규정 v3 · 12조</span>
          <span className="dm-agent js-src">📄 복무 지침 FAQ</span>
        </div>
        <span className="dm-wire js-swire2" />
        <div className="dm-card is-hit js-answer">
          <div className="dm-row">
            <span className="dm-tag is-accent">답변</span>
            <span className="dm-title">미사용 연차는 최대 5일까지 이월됩니다</span>
          </div>
          <div className="dm-row">
            <span className="dm-tag js-cite">근거 문서 2건 · 원문 링크 첨부</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- 슬라이드 3: 아침 브리핑 — 요청 없이 예약 실행 → 소스 종합 → P1 브리핑 발송 ---- */
const BRIEF_SOURCES = [
  { label: '메일', count: '12' },
  { label: '메신저', count: '5' },
  { label: '일정', count: '3' },
]

function BriefingCard({ onLoop }: { onLoop?: () => void }) {
  const build = useCallback((tl: gsap.core.Timeline) => {
    tl.set('.js-bwire1, .js-bwire2', { scaleY: 0 })
    tl.set('.js-bsrc', { autoAlpha: 0, y: 8 })
    tl.set('.js-bsrc .dm-spin', { autoAlpha: 1 })
    tl.set('.js-bsrc .js-bcheck', { autoAlpha: 0, scale: 0.5 })
    tl.set('.js-bsrc .js-bcount', { autoAlpha: 0 })
    tl.set('.js-brief', { autoAlpha: 0, y: 10 })
    tl.set('.js-p1', { autoAlpha: 0, x: -8 })
    tl.set('.js-sent', { autoAlpha: 0, scale: 0.6 })

    // 요청 없이 스스로 — 예약 태그 펄스로 시작
    tl.fromTo('.js-sched', { scale: 0.94 }, { scale: 1, duration: 0.45, ease: 'back.out(2)' })
    tl.to({}, { duration: 0.4 })
    drawWire(tl, '.js-bwire1')
    tl.to('.js-bsrc', { autoAlpha: 1, y: 0, duration: 0.32, stagger: 0.14 })
    tl.to({}, { duration: 0.8 })
    BRIEF_SOURCES.forEach((_, i) => {
      tl.to(`.js-bsrc-${i} .dm-spin`, { autoAlpha: 0, duration: 0.15 }, i ? '+=0.25' : '+=0')
      tl.to(`.js-bsrc-${i} .js-bcheck`, { autoAlpha: 1, scale: 1, duration: 0.26, ease: 'back.out(2.2)' }, '<')
      tl.to(`.js-bsrc-${i} .js-bcount`, { autoAlpha: 1, duration: 0.22 }, '<')
    })
    drawWire(tl, '.js-bwire2', '+=0.3')
    tl.to('.js-brief', { autoAlpha: 1, y: 0, duration: 0.45 })
    tl.to('.js-p1', { autoAlpha: 1, x: 0, duration: 0.32, stagger: 0.18 })
    tl.to('.js-sent', { autoAlpha: 1, scale: 1, duration: 0.32, ease: 'back.out(2.2)' })
    tl.to({}, { duration: 2.6 }) // 홀드
  }, [])
  const ref = useLoopTimeline(build, onLoop)

  return (
    <div className="ha-card" ref={ref}>
      <div className="dm-chrome">
        <span className="dm-dot" />
        <span className="dm-dot" />
        <span className="dm-dot" />
        <span className="dm-chrome-label mono">uture agent</span>
      </div>
      <div className="ha-flow">
        <div className="dm-row" style={{ justifyContent: 'flex-end' }}>
          <span className="dm-tag js-sched">⏰ 매일 07:30 · 요청 없이 예약 실행</span>
        </div>
        <span className="dm-wire js-bwire1" />
        <div className="dm-agents ha-agents">
          {BRIEF_SOURCES.map((s, i) => (
            <span className={`dm-agent js-bsrc js-bsrc-${i}`} key={s.label}>
              <span className="dm-agent-state">
                <span className="dm-spin" />
                <span className="dm-agent-check js-bcheck">✓</span>
              </span>
              {s.label}
              <span className="dm-agent-count js-bcount">{s.count}건</span>
            </span>
          ))}
        </div>
        <span className="dm-wire js-bwire2" />
        <div className="dm-card is-hit js-brief">
          <div className="dm-row">
            <span className="dm-tag is-accent js-p1">P1</span>
            <span className="dm-title js-p1">경비정산 마감 회신 — 오늘 17:00</span>
          </div>
          <div className="dm-row">
            <span className="dm-tag js-p1">P2</span>
            <span className="dm-title js-p1" style={{ fontWeight: 500 }}>월간 리포트 초안 검토</span>
          </div>
          <div className="dm-row">
            <span className="dm-tag js-sent">✉ 출근 전 브리핑 발송됨</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- 캐러셀 ---- */
const SLIDES = [
  { id: 'auto', label: '업무 자동화', Card: AutomationCard },
  { id: 'search', label: '사내 문서 검색', Card: SearchCard },
  { id: 'brief', label: '아침 브리핑', Card: BriefingCard },
]

export function HeroShowcase() {
  const [active, setActive] = useState(0)
  const [round, setRound] = useState(0) // 재방문 시 시퀀스 재시작용 key
  const paused = useRef(false)
  const dragX = useRef<number | null>(null)

  const go = useCallback((i: number) => {
    setActive((prev) => {
      const next = (i + SLIDES.length) % SLIDES.length
      if (next !== prev) setRound((r) => r + 1)
      return next
    })
  }, [])

  // 자동 전환 — 활성 카드의 시퀀스가 한 사이클을 완주하면 다음으로 (시간 타이머 아님).
  // reduced-motion이면 타임라인이 없어 onLoop가 오지 않음 → 자동 전환 없음 (의도).
  const activeRef = useRef(active)
  activeRef.current = active
  const handleLoop = useCallback(() => {
    if (!paused.current) go(activeRef.current + 1)
  }, [go])

  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX
    paused.current = true
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current != null) {
      const dx = e.clientX - dragX.current
      if (Math.abs(dx) > 42) go(activeRef.current + (dx < 0 ? 1 : -1))
      dragX.current = null
    }
    paused.current = false
  }

  const { Card } = SLIDES[active]

  return (
    <div
      className="hero-seq hero-showcase"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => ((dragX.current = null), (paused.current = false))}
    >
      {/* 유스케이스 라벨 칩 — 인디케이터 겸 직접 탐색 */}
      <div className="hs-chips" role="tablist" aria-label="에이전트 활용 사례">
        {SLIDES.map((s, i) => (
          <button
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`hs-chip${i === active ? ' is-on' : ''}`}
            key={s.id}
            onClick={() => go(i)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="hs-stage" aria-hidden>
        <div className="hs-slide" key={`${active}-${round}`}>
          <Card onLoop={handleLoop} />
        </div>
      </div>

      <div className="hs-dots" aria-hidden>
        {SLIDES.map((s, i) => (
          <i className={i === active ? 'on' : ''} key={s.id} />
        ))}
      </div>
    </div>
  )
}
