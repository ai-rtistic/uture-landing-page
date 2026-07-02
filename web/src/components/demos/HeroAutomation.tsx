import { useCallback } from 'react'
import { typeText, useLoopTimeline } from './stage'

/**
 * 히어로 메인 비주얼 — "에이전트 오케스트레이션" 3막 시퀀스.
 *  1막(sky)   요청 도착: 구성원이 자연어로 부탁
 *  2막(lilac) 서브에이전트 3개가 병렬로 일함 (검색 · 데이터 · 작성)
 *  3막(mint)  딜리버리: 완성본이 메일로 발송되고, 도입 현황 보드에 자산으로 쌓임
 * reduced-motion: 타임라인 없이 3막(딜리버리)만 정적 표시(CSS 기본 상태).
 */
const QUERY = '이번 달 경비정산 마감 보고서 부탁해요.'

const AGENTS = [
  { label: '문서 검색 에이전트', count: '규정 12건' },
  { label: '데이터 정리 에이전트', count: '842행' },
  { label: '초안 작성 에이전트', count: '6쪽' },
]

const ROWS = [
  { name: '주간 리포트 자동화 에이전트', team: '재무팀' },
  { name: 'VOC 분류 파이프라인', team: 'CS팀' },
]

export function HeroAutomation() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLDivElement) => {
    tl.set('.js-act', { autoAlpha: 0, y: 0 })
    tl.set('.js-agent', { autoAlpha: 0, y: 8 })
    tl.set('.dm-agent-state .dm-spin', { autoAlpha: 0 })
    tl.set('.js-check', { autoAlpha: 0, scale: 0.5 })
    tl.set('.js-count', { autoAlpha: 0 })
    tl.set('.js-mail', { autoAlpha: 0, y: 10 })
    tl.set('.js-newrow', { autoAlpha: 0, y: 14 })
    tl.set('.js-badge', { autoAlpha: 0, scale: 0.6 })

    // 1막 — 요청 도착
    tl.to('.js-act1', { autoAlpha: 1, duration: 0.5 })
    typeText(tl, root.querySelector('.js-q'), QUERY)
    tl.to({}, { duration: 0.9 })

    // 2막 — 서브에이전트 병렬 작업 (동시에 돌다가 하나씩 완료)
    tl.to('.js-act1', { autoAlpha: 0, y: -10, duration: 0.4 })
    tl.to('.js-act2', { autoAlpha: 1, duration: 0.5 })
    tl.to('.js-agent', { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.12 })
    tl.to('.dm-agent-state .dm-spin', { autoAlpha: 1, duration: 0.2 }, '<')
    tl.to({}, { duration: 1.0 }) // 셋이 동시에 작업 중
    AGENTS.forEach((_, i) => {
      tl.to(`.js-agent-${i} .dm-spin`, { autoAlpha: 0, duration: 0.15 }, i ? '+=0.4' : '+=0')
      tl.to(`.js-agent-${i} .js-check`, { autoAlpha: 1, scale: 1, duration: 0.28, ease: 'back.out(2.2)' }, '<')
      tl.to(`.js-agent-${i} .js-count`, { autoAlpha: 1, duration: 0.25 }, '<')
    })
    tl.to({}, { duration: 0.7 })

    // 3막 — 딜리버리: 메일 발송 + 조직 자산 보드
    tl.to('.js-act2', { autoAlpha: 0, y: -10, duration: 0.4 })
    tl.to('.js-act3', { autoAlpha: 1, duration: 0.5 })
    tl.to('.js-mail', { autoAlpha: 1, y: 0, duration: 0.45 }, '+=0.2')
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
          {/* 2막 — 서브에이전트 병렬 작업 */}
          <div className="ha-act js-act js-act2 dm-lilac">
            <span className="dm-meta">서브에이전트 3개가 동시에 일하는 중</span>
            {AGENTS.map((a, i) => (
              <div className={`ha-step js-agent js-agent-${i}`} key={a.label}>
                <span className="dm-agent-state">
                  <span className="dm-spin" />
                  <span className="dm-agent-check js-check">✓</span>
                </span>
                {a.label}
                <span className="dm-agent-count js-count">{a.count}</span>
              </div>
            ))}
          </div>
          {/* 3막 — 딜리버리 + 사내 자산 보드 */}
          <div className="ha-act ha-final js-act js-act3 dm-mint">
            <span className="dm-meta">결과가 도착했습니다</span>
            <div className="dm-card is-hit js-mail">
              <div className="dm-row">
                <span className="dm-tag is-accent">✉ 메일 발송</span>
                <span className="dm-title">경비정산 마감 보고서 완성본</span>
              </div>
              <span className="dm-meta">김대리에게 전달 · 대시보드에 게시됨</span>
            </div>
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
      <span className="tag ha-cap mono">요청 → 에이전트 팀 → 메일 · 대시보드로</span>
    </div>
  )
}
