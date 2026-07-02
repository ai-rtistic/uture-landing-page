import { useCallback } from 'react'
import { DemoStage, drawWire, useLoopTimeline } from './stage'

/**
 * 종합 업무 어시스턴트 데모 — 챗봇이 아니라 "예약된 자율 에이전트".
 * 요청 없이 아침마다 스스로 실행 → 메일·메신저·캘린더 에이전트가 병렬 수집
 * → 우선순위 브리핑을 만들어 메일로 발송. lilac 틴트.
 * 마크업은 최종 프레임 그대로 렌더(reduced-motion 폴백).
 */
const AGENTS = [
  { label: '메일 에이전트', count: '12건' },
  { label: '메신저 에이전트', count: '5건' },
  { label: '캘린더 에이전트', count: '3건' },
]

const TODOS = [
  { p: 'P1', text: '경비정산 마감 회신 — 오늘 17:00', accent: true },
  { p: 'P2', text: '신규 입사자 온보딩 미팅 14:00', accent: false },
  { p: 'P3', text: '주간 리포트 초안 검토', accent: false },
]

export function DemoAssistant() {
  const build = useCallback((tl: gsap.core.Timeline) => {
    tl.set('.js-wire1, .js-wire2', { scaleY: 0 })
    tl.set('.js-run, .js-agent, .js-brief, .js-deliver', { autoAlpha: 0, y: 10 })
    tl.set('.dm-agent-state .dm-spin', { autoAlpha: 0 })
    tl.set('.js-check', { autoAlpha: 0, scale: 0.5 })
    tl.set('.js-count', { autoAlpha: 0 })
    tl.set('.js-todo', { autoAlpha: 0, x: -8 })

    // 1막 — 요청 없이, 예약된 실행
    tl.to('.js-run', { autoAlpha: 1, y: 0, duration: 0.45 })
    tl.to({}, { duration: 0.6 })

    // 2막 — 연결선이 그려지며 에이전트 3개가 병렬 수집
    drawWire(tl, '.js-wire1')
    tl.to('.js-agent', { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.12 })
    tl.to('.dm-agent-state .dm-spin', { autoAlpha: 1, duration: 0.2 }, '<')
    tl.to({}, { duration: 0.9 })
    AGENTS.forEach((_, i) => {
      tl.to(`.js-agent-${i} .dm-spin`, { autoAlpha: 0, duration: 0.15 }, i ? '+=0.35' : '+=0')
      tl.to(`.js-agent-${i} .js-check`, { autoAlpha: 1, scale: 1, duration: 0.28, ease: 'back.out(2.2)' }, '<')
      tl.to(`.js-agent-${i} .js-count`, { autoAlpha: 1, duration: 0.25 }, '<')
    })

    // 3막 — 브리핑으로 흘러간다 → 메일 발송
    drawWire(tl, '.js-wire2', '+=0.4')
    tl.to('.js-brief', { autoAlpha: 1, y: 0, duration: 0.45 })
    tl.to('.js-todo', { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.22 })
    tl.fromTo('.js-p1', { scale: 1 }, { scale: 1.12, duration: 0.25, yoyo: true, repeat: 1 }, '+=0.15')
    tl.to('.js-deliver', { autoAlpha: 1, y: 0, duration: 0.4 }, '+=0.2')
    tl.to({}, { duration: 2.6 }) // 홀드
  }, [])
  const ref = useLoopTimeline(build)

  return (
    <DemoStage tint="lilac" label="uture · 종합 업무 어시스턴트" stageRef={ref}>
      <div className="dm-status js-run">
        <span className="dm-tag is-tint">오전 8:00</span>
        예약 실행 — 요청하지 않아도 스스로 시작
      </div>
      <span className="dm-wire js-wire1" />
      <div className="dm-agents">
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
      <span className="dm-wire js-wire2" />
      <div className="dm-card js-brief">
        <div className="dm-row">
          <span className="dm-title">오늘의 우선순위 브리핑</span>
        </div>
        {TODOS.map((t) => (
          <div className="dm-row js-todo" key={t.p}>
            <span className={`dm-tag ${t.accent ? 'js-p1' : ''}`}>{t.p}</span>
            <span className="dm-meta">{t.text}</span>
          </div>
        ))}
      </div>
      <div className="dm-deliver js-deliver">
        <span className="dm-tag is-accent">✉ 출근 전 메일로 발송됨</span>
      </div>
    </DemoStage>
  )
}
