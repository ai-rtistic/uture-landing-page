import { useCallback } from 'react'
import { drawWire, typeText, useLoopTimeline } from './stage'

/**
 * 히어로 메인 비주얼 — "에이전트 오케스트레이션" 플로우.
 * 3막 크로스페이드 대신 한 화면에서 작업이 아래로 흘러간다:
 * 요청 타이핑 → 연결선 → 서브에이전트 3개 병렬 작업 → 연결선 → 메일 발송 + 자산 보드.
 * 마크업은 최종 프레임 그대로 렌더(reduced-motion 폴백).
 */
const QUERY = '이번 달 경비정산 마감 보고서 부탁해요.'

const AGENTS = [
  { label: '문서 검색', count: '12건' },
  { label: '데이터 정리', count: '842행' },
  { label: '초안 작성', count: '6쪽' },
]

export function HeroAutomation() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLDivElement) => {
    tl.set('.js-wire1, .js-wire2', { scaleY: 0 })
    tl.set('.js-agent', { autoAlpha: 0, y: 8 })
    tl.set('.dm-agent-state .dm-spin', { autoAlpha: 0 })
    tl.set('.js-check', { autoAlpha: 0, scale: 0.5 })
    tl.set('.js-count', { autoAlpha: 0 })
    tl.set('.js-mail', { autoAlpha: 0, y: 10 })
    tl.set('.js-newrow', { autoAlpha: 0, y: 12 })
    tl.set('.js-badge', { autoAlpha: 0, scale: 0.6 })

    // 1. 요청 타이핑
    typeText(tl, root.querySelector('.js-q'), QUERY)
    tl.to({}, { duration: 0.4 })

    // 2. 연결선이 그려지며 에이전트 팀으로 흘러간다
    drawWire(tl, '.js-wire1')
    tl.to('.js-agent', { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.14 })
    tl.to('.dm-agent-state .dm-spin', { autoAlpha: 1, duration: 0.2 }, '<')
    tl.to({}, { duration: 0.9 }) // 병렬 작업 중
    AGENTS.forEach((_, i) => {
      tl.to(`.js-agent-${i} .dm-spin`, { autoAlpha: 0, duration: 0.15 }, i ? '+=0.35' : '+=0')
      tl.to(`.js-agent-${i} .js-check`, { autoAlpha: 1, scale: 1, duration: 0.28, ease: 'back.out(2.2)' }, '<')
      tl.to(`.js-agent-${i} .js-count`, { autoAlpha: 1, duration: 0.25 }, '<')
    })

    // 3. 결과로 흘러간다: 메일 발송 → 자산 보드에 행 추가
    drawWire(tl, '.js-wire2', '+=0.3')
    tl.to('.js-mail', { autoAlpha: 1, y: 0, duration: 0.45 })
    tl.to('.js-newrow', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '+=0.4')
    tl.fromTo(
      '.js-newrow',
      { backgroundColor: 'rgba(255, 138, 60, 0.14)' },
      { backgroundColor: 'rgba(255, 138, 60, 0)', duration: 1.2 },
      '<',
    )
    tl.to('.js-badge', { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2.2)' }, '-=0.9')
    tl.to({}, { duration: 2.6 }) // 홀드
  }, [])
  const ref = useLoopTimeline(build)

  return (
    <div className="hero-seq" aria-hidden>
      <div className="ha-card" ref={ref}>
        <div className="dm-chrome">
          <span className="dm-dot" />
          <span className="dm-dot" />
          <span className="dm-dot" />
          <span className="dm-chrome-label mono">uture agent</span>
        </div>
        <div className="ha-flow">
          {/* 1. 요청 */}
          <div className="dm-bubble">
            <span className="js-q">{QUERY}</span>
            <span className="dm-caret" />
          </div>

          {/* 2. 에이전트 팀으로 */}
          <span className="dm-wire js-wire1" />
          <div className="dm-agents ha-agents">
            {AGENTS.map((a, i) => (
              <span className={`dm-agent js-agent js-agent-${i}`} key={a.label}>
                <span className="dm-agent-state">
                  <span className="dm-spin" />
                  <span className="dm-agent-check js-check">✓</span>
                </span>
                {a.label}
                <span className="dm-agent-count js-count">{a.count}</span>
              </span>
            ))}
          </div>

          {/* 3. 결과 */}
          <span className="dm-wire js-wire2" />
          <div className="dm-card is-hit js-mail">
            <div className="dm-row">
              <span className="dm-tag is-accent">✉ 메일 발송</span>
              <span className="dm-title">경비정산 마감 보고서 완성본</span>
            </div>
          </div>
          <div className="ha-row js-newrow">
            <span className="ha-row-name">경비정산 보고 자동화</span>
            <span className="ha-row-team">재무팀</span>
            <span className="tag ha-live js-badge">운영중</span>
          </div>
        </div>
      </div>
      <span className="tag ha-cap mono">요청 → 에이전트 팀 → 메일 · 자산으로</span>
    </div>
  )
}
