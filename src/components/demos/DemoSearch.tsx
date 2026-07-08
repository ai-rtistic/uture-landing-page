import { useCallback } from 'react'
import { DemoStage, drawWire, typeText, useLoopTimeline } from './stage'

/**
 * 사내 문서 검색 데모 — 질문 타이핑 → 연결선 → 문서 탐색(적중 채움) → 연결선 → 답.
 * sky 틴트. 마크업은 최종 프레임 그대로 렌더(reduced-motion 폴백).
 */
const QUERY = '지난달에 경비정산 규정이 바뀌었다던데, 뭐가 달라졌어요?'

const DOCS = [
  { title: '경비정산 규정 v3.2', meta: '재무팀 · 2026.03 개정', hit: true },
  { title: '국내 출장 가이드', meta: '총무팀 · 사내위키', hit: false },
  { title: '법인카드 사용 매뉴얼', meta: '재무팀 · PDF', hit: false },
]

export function DemoSearch() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLDivElement) => {
    // 초기 상태는 타임라인에서만 숨긴다 (no-timeline = 최종 프레임)
    tl.set('.js-wire1, .js-wire2', { scaleY: 0 })
    tl.set('.js-doc, .js-answer', { autoAlpha: 0, y: 10 })
    tl.set('.js-hittag', { autoAlpha: 0, scale: 0.7 })
    // 1. 질문 입력
    typeText(tl, root.querySelector('.js-q'), QUERY)
    tl.to({}, { duration: 0.4 })
    // 2. 문서 탐색으로 흘러간다
    drawWire(tl, '.js-wire1')
    tl.to('.js-doc', { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.16 })
    tl.to('.js-hit', { scale: 1.02, duration: 0.25, yoyo: true, repeat: 1 }, '+=0.4')
    tl.to('.js-hittag', { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, '<')
    // 3. 근거와 함께 답으로
    drawWire(tl, '.js-wire2', '+=0.3')
    tl.to('.js-answer', { autoAlpha: 1, y: 0, duration: 0.5 })
    tl.to({}, { duration: 2.4 }) // 홀드
  }, [])
  const ref = useLoopTimeline(build)

  return (
    <DemoStage tint="sky" label="uture · 사내 문서 검색" stageRef={ref}>
      <div className="dm-bubble">
        <span className="js-q">{QUERY}</span>
        <span className="dm-caret" />
      </div>
      <span className="dm-wire js-wire1" />
      {DOCS.map((d) => (
        <div className={`dm-card js-doc ${d.hit ? 'is-hit js-hit' : ''}`} key={d.title}>
          <div className="dm-row">
            <span className="dm-title">{d.title}</span>
            {d.hit && <span className="dm-tag is-accent js-hittag">근거</span>}
          </div>
          <span className="dm-meta">{d.meta}</span>
        </div>
      ))}
      <span className="dm-wire js-wire2" />
      <div className="dm-card js-answer">
        <div className="dm-row">
          <span className="dm-tag">답변</span>
          <span className="dm-title">숙박비 상한이 12만원 → 15만원으로 올랐어요.</span>
        </div>
        <span className="dm-meta">근거 · 경비정산 규정 v3.2 §4 (2026.03 개정)</span>
      </div>
    </DemoStage>
  )
}
