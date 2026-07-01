import { useCallback } from 'react'
import { DemoStage, typeText, useLoopTimeline } from './stage'

/**
 * 사내 템플릿 생성 데모 — 요청 → 회사 템플릿 아웃라인 채움 → 슬라이드 초안.
 * amber 틴트. 마크업은 최종 프레임 그대로 렌더(reduced-motion 폴백).
 */
const QUERY = '주간 보고서, 회사 템플릿으로 만들어줘요.'

const SECTIONS = ['표지', '핵심 요약', '실적 지표', '다음 주 계획']

export function DemoReport() {
  const build = useCallback((tl: gsap.core.Timeline, root: HTMLDivElement) => {
    tl.set('.js-status, .js-outline, .js-slides', { autoAlpha: 0, y: 10 })
    tl.set('.js-fill', { scaleX: 0 })
    tl.set('.js-done', { autoAlpha: 0, scale: 0.7 })
    // 1막 — 요청
    typeText(tl, root.querySelector('.js-q'), QUERY)
    // 2막 — 템플릿 아웃라인이 채워짐
    tl.to('.js-status', { autoAlpha: 1, y: 0, duration: 0.4 }, '+=0.4')
    tl.to('.js-outline', { autoAlpha: 1, y: 0, duration: 0.4 }, '+=0.3')
    tl.to('.js-fill', { scaleX: 1, duration: 0.55, ease: 'power1.inOut', stagger: 0.38 }, '+=0.2')
    // 3막 — 슬라이드 초안 완성
    tl.to('.js-status', { autoAlpha: 0, y: -6, duration: 0.3 }, '+=0.3')
    tl.to('.js-slides', { autoAlpha: 1, y: 0, duration: 0.4 })
    tl.fromTo(
      '.js-slide',
      { autoAlpha: 0, scale: 0.8 },
      { autoAlpha: 1, scale: 1, duration: 0.3, stagger: 0.14 },
      '<',
    )
    tl.to('.js-done', { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, '+=0.15')
    tl.to({}, { duration: 2.4 }) // 홀드
  }, [])
  const ref = useLoopTimeline(build)

  return (
    <DemoStage tint="amber" label="uture · 사내 템플릿 생성" stageRef={ref}>
      <div className="dm-bubble">
        <span className="js-q">{QUERY}</span>
        <span className="dm-caret" />
      </div>
      <div className="dm-status js-status">
        <span className="dm-spin" />
        회사 표준 템플릿 · 로고 · 폰트 적용 중…
      </div>
      <div className="dm-card js-outline">
        {SECTIONS.map((s) => (
          <div className="dm-row" key={s}>
            <span className="dm-meta" style={{ width: 76 }}>
              {s}
            </span>
            <span className="dm-bar">
              <span className="js-fill" />
            </span>
          </div>
        ))}
      </div>
      <div className="dm-slides js-slides">
        {SECTIONS.map((s) => (
          <span className="dm-slide js-slide" key={s} title={s} />
        ))}
        <span className="dm-tag is-accent js-done">초안 완성</span>
      </div>
    </DemoStage>
  )
}
