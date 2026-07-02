import { useCallback } from 'react'
import { typeText, useLoopTimeline } from './stage'

/**
 * 히어로 메인 비주얼 — "업무 자동화" 3막 시퀀스.
 *  1막(sky)   요청 도착: 구성원이 자연어로 부탁
 *  2막(lilac) AI 처리: 문서 검색 → 표 작성 → 초안 완성
 *  3막(mint)  자산화: 사내 AX 도입 현황 보드에 새 도구가 '운영중'으로 추가
 * reduced-motion: 타임라인 없이 3막(보드)만 정적 표시(CSS 기본 상태).
 */
const QUERY = '이번 달 경비정산 마감 보고서 부탁해요.'

const STEPS = ['사내 문서 검색', '정산 데이터 표 작성', '보고서 초안 완성']

const ROWS = [
  { name: '주간 리포트 자동화 에이전트', team: '재무팀' },
  { name: 'VOC 분류 파이프라인', team: 'CS팀' },
  { name: '회의록 → 액션아이템 봇', team: '전사' },
]

export function HeroAutomation() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLDivElement) => {
    tl.set('.js-act', { autoAlpha: 0, y: 0 })
    tl.set('.js-step', { autoAlpha: 0.3 })
    tl.set('.js-spin', { autoAlpha: 0 })
    tl.set('.js-check', { autoAlpha: 0, scale: 0.5 })
    tl.set('.js-newrow', { autoAlpha: 0, y: 14 })
    tl.set('.js-badge', { autoAlpha: 0, scale: 0.6 })

    // 1막 — 요청 도착
    tl.to('.js-act1', { autoAlpha: 1, duration: 0.5 })
    typeText(tl, root.querySelector('.js-q'), QUERY)
    tl.to({}, { duration: 0.9 })

    // 2막 — AI 처리 단계
    tl.to('.js-act1', { autoAlpha: 0, y: -10, duration: 0.4 })
    tl.to('.js-act2', { autoAlpha: 1, duration: 0.5 })
    STEPS.forEach((_, i) => {
      tl.to(`.js-step-${i}`, { autoAlpha: 1, duration: 0.3 }, '+=0.2')
      tl.to(`.js-step-${i} .js-spin`, { autoAlpha: 1, duration: 0.15 }, '<')
      tl.to(`.js-step-${i} .js-spin`, { autoAlpha: 0, duration: 0.15 }, '+=0.85')
      tl.to(
        `.js-step-${i} .js-check`,
        { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(2.2)' },
        '<',
      )
    })
    tl.to({}, { duration: 0.7 })

    // 3막 — 조직 자산으로
    tl.to('.js-act2', { autoAlpha: 0, y: -10, duration: 0.4 })
    tl.to('.js-act3', { autoAlpha: 1, duration: 0.5 })
    tl.to('.js-newrow', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '+=0.5')
    tl.fromTo(
      '.js-newrow',
      { backgroundColor: 'rgba(255, 122, 51, 0.12)' },
      { backgroundColor: 'rgba(255, 122, 51, 0)', duration: 1.3 },
      '<',
    )
    tl.to('.js-badge', { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2.2)' }, '-=1.0')
    tl.to({}, { duration: 3 })
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
        <div className="ha-body">
          {/* 1막 — 요청 */}
          <div className="ha-act js-act js-act1 dm-sky">
            <span className="dm-meta">재무팀 김대리 · 오전 9:12</span>
            <div className="dm-bubble">
              <span className="js-q">{QUERY}</span>
              <span className="dm-caret" />
            </div>
          </div>
          {/* 2막 — AI 처리 */}
          <div className="ha-act js-act js-act2 dm-lilac">
            <span className="dm-meta">AI가 처리 중</span>
            {STEPS.map((s, i) => (
              <div className={`ha-step js-step js-step-${i}`} key={s}>
                <span className="ha-step-state">
                  <span className="dm-spin js-spin" />
                  <span className="ha-check js-check">✓</span>
                </span>
                {s}
              </div>
            ))}
          </div>
          {/* 3막 — 사내 자산 보드 */}
          <div className="ha-act ha-final js-act js-act3 dm-mint">
            <span className="dm-meta">사내 AX 도입 현황</span>
            {ROWS.map((r) => (
              <div className="ha-row" key={r.name}>
                <span className="ha-row-name">{r.name}</span>
                <span className="ha-row-team">{r.team}</span>
                <span className="tag ha-live">운영중</span>
              </div>
            ))}
            <div className="ha-row js-newrow">
              <span className="ha-row-name">경비정산 보고 자동화</span>
              <span className="ha-row-team">재무팀</span>
              <span className="tag ha-live js-badge">운영중</span>
            </div>
          </div>
        </div>
      </div>
      <span className="tag ha-cap mono">요청 → 처리 → 사내 자산으로</span>
    </div>
  )
}
