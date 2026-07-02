import { GNode } from './primitives'

/**
 * 내러티브 3단계(pain)와 1:1로 짝지어지는 장면 카드.
 * 스팟 그래픽 문법(뉴트럴 + 파스텔 한 방울) — 틴트는 amber/sky/rose 로테이션.
 * 전환(크로스페이드)은 PinnedNarrative의 스크럽 타임라인이 담당한다.
 */

/** 01 — 모두에게 같은 강의: 똑같은 강의만 기계적으로 쌓인다. */
function SceneLecture() {
  return (
    <div className="ns-card g-tint-amber">
      <span className="ns-glow" aria-hidden />
      <div className="ns-rows">
        {[1, 2, 3].map((n) => (
          <div className="ns-row" key={n}>
            <GNode icon="video">전사 공통 강의</GNode>
            <span className="tag mono">{n}회차</span>
          </div>
        ))}
      </div>
      <GNode tone="dark" icon="target">
        그래서, 내 업무에는 어떻게?
      </GNode>
    </div>
  )
}

/** 02 — 실무 단절: 강의 노트와 월요일의 실제 업무 사이가 끊겨 있다. */
function SceneGap() {
  return (
    <div className="ns-card g-tint-sky">
      <span className="ns-glow" aria-hidden />
      <GNode icon="text">강의 수료 노트</GNode>
      <span className="ns-break" aria-hidden>
        <i>✕</i>
      </span>
      <GNode icon="build">월요일 아침, 내 실제 업무</GNode>
    </div>
  )
}

/** 03 — 안 맞는 범용 툴: 정책에 막히고, 정작 맞는 도구는 없다. */
function SceneMisfit() {
  return (
    <div className="ns-card g-tint-rose">
      <span className="ns-glow" aria-hidden />
      <GNode icon="sparkle">범용 AI 툴</GNode>
      <div className="ns-tags">
        <span className="tag ns-no">보안 정책 ✕</span>
        <span className="tag ns-no">사내 데이터 ✕</span>
        <span className="tag ns-no">내부 시스템 ✕</span>
      </div>
      <div className="ns-slot">우리 업무에 맞는 도구 — 아직 없음</div>
    </div>
  )
}

export const narrativeScenes = [SceneLecture, SceneGap, SceneMisfit]
