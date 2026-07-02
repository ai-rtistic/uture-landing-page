import { useCallback } from 'react'
import { DemoStage, typeText, useLoopTimeline } from './stage'

/**
 * 사내 템플릿 생성 데모 — 요청 한 번이면 서브에이전트들이 분담해서
 * (데이터 집계 · 차트 생성 · 슬라이드 작성) 완성본을 만들고
 * 메일 발송 + 대시보드 게시까지 끝낸다. amber 틴트.
 * 마크업은 최종 프레임 그대로 렌더(reduced-motion 폴백).
 */
const QUERY = '주간 보고서, 회사 템플릿으로 만들어줘요.'

const AGENTS = [
  { label: '데이터 집계 에이전트', count: '4개 시트' },
  { label: '차트 생성 에이전트', count: '지표 6종' },
  { label: '슬라이드 작성 에이전트', count: '4장' },
]

const SECTIONS = ['표지', '핵심 요약', '실적 지표', '다음 주 계획']

export function DemoReport() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLDivElement) => {
    tl.set('.js-agent, .js-slides, .js-deliver', { autoAlpha: 0, y: 10 })
    tl.set('.dm-agent-state .dm-spin', { autoAlpha: 0 })
    tl.set('.js-check', { autoAlpha: 0, scale: 0.5 })
    tl.set('.js-count', { autoAlpha: 0 })

    // 1막 — 요청은 한 번뿐
    typeText(tl, root.querySelector('.js-q'), QUERY)

    // 2막 — 서브에이전트 분담 작업 (병렬)
    tl.to('.js-agent', { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.12 }, '+=0.4')
    tl.to('.dm-agent-state .dm-spin', { autoAlpha: 1, duration: 0.2 }, '<')
    tl.to({}, { duration: 0.9 })
    AGENTS.forEach((_, i) => {
      tl.to(`.js-agent-${i} .dm-spin`, { autoAlpha: 0, duration: 0.15 }, i ? '+=0.35' : '+=0')
      tl.to(`.js-agent-${i} .js-check`, { autoAlpha: 1, scale: 1, duration: 0.28, ease: 'back.out(2.2)' }, '<')
      tl.to(`.js-agent-${i} .js-count`, { autoAlpha: 1, duration: 0.25 }, '<')
    })

    // 3막 — 슬라이드 완성 → 메일 + 대시보드로
    tl.to('.js-slides', { autoAlpha: 1, y: 0, duration: 0.4 }, '+=0.3')
    tl.fromTo(
      '.js-slide',
      { autoAlpha: 0, scale: 0.8 },
      { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.14 },
      '<',
    )
    tl.to('.js-deliver', { autoAlpha: 1, y: 0, duration: 0.4 }, '+=0.2')
    tl.to({}, { duration: 2.6 }) // 홀드
  }, [])
  const ref = useLoopTimeline(build)

  return (
    <DemoStage tint="amber" label="uture · 사내 템플릿 생성" stageRef={ref}>
      <div className="dm-bubble">
        <span className="js-q">{QUERY}</span>
        <span className="dm-caret" />
      </div>
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
      <div className="dm-slides js-slides">
        {SECTIONS.map((s) => (
          <span className="dm-slide js-slide" key={s} title={s} />
        ))}
        <span className="dm-tag is-tint">회사 템플릿 · 로고 · 폰트 적용</span>
      </div>
      <div className="dm-deliver js-deliver">
        <span className="dm-tag is-accent">✉ 팀장에게 메일 발송</span>
        <span className="dm-tag is-tint">▦ 주간 대시보드 게시</span>
      </div>
    </DemoStage>
  )
}
