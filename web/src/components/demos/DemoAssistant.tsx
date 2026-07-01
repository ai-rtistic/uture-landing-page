import { useCallback } from 'react'
import { DemoStage, typeText, useLoopTimeline } from './stage'

/**
 * 종합 업무 어시스턴트 데모 — 요청 → 메일·메신저·일정 취합 → 우선순위 정리.
 * lilac 틴트. 마크업은 최종 프레임 그대로 렌더(reduced-motion 폴백).
 */
const QUERY = '오늘 꼭 챙겨야 할 일 정리해줘요.'

const SOURCES = ['메일 12건', '메신저 5건', '일정 3건']

const TODOS = [
  { p: 'P1', text: '경비정산 마감 회신 — 오늘 17:00', accent: true },
  { p: 'P2', text: '신규 입사자 온보딩 미팅 14:00', accent: false },
  { p: 'P3', text: '주간 리포트 초안 검토', accent: false },
]

export function DemoAssistant() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLDivElement) => {
    tl.set('.js-status, .js-src, .js-todo', { autoAlpha: 0, y: 10 })
    // 1막 — 요청
    typeText(tl, root.querySelector('.js-q'), QUERY)
    // 2막 — 흩어진 소스 취합
    tl.to('.js-status', { autoAlpha: 1, y: 0, duration: 0.4 }, '+=0.4')
    tl.to('.js-src', { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.22 }, '+=0.3')
    // 3막 — 우선순위 정리
    tl.to('.js-status', { autoAlpha: 0, y: -6, duration: 0.3 }, '+=0.5')
    tl.to('.js-todo', { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.24 })
    tl.fromTo('.js-p1', { scale: 1 }, { scale: 1.12, duration: 0.25, yoyo: true, repeat: 1 }, '+=0.2')
    tl.to({}, { duration: 2.4 }) // 홀드
  }, [])
  const ref = useLoopTimeline(build)

  return (
    <DemoStage tint="lilac" label="uture · 종합 업무 어시스턴트" stageRef={ref}>
      <div className="dm-bubble">
        <span className="js-q">{QUERY}</span>
        <span className="dm-caret" />
      </div>
      <div className="dm-status js-status">
        <span className="dm-spin" />
        메일 · 메신저 · 일정 확인 중…
      </div>
      <div className="dm-row">
        {SOURCES.map((s) => (
          <span className="dm-tag is-tint js-src" key={s}>
            {s}
          </span>
        ))}
      </div>
      {TODOS.map((t) => (
        <div className="dm-card js-todo" key={t.p}>
          <div className="dm-row">
            <span className={`dm-tag ${t.accent ? 'is-accent js-p1' : ''}`}>{t.p}</span>
            <span className="dm-title">{t.text}</span>
          </div>
        </div>
      ))}
    </DemoStage>
  )
}
