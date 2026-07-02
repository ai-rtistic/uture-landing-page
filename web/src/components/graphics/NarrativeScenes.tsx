/**
 * 내러티브 3단계(pain)와 1:1로 짝지어지는 장면 패널 — uture-motion-diagrams 문법.
 * 구조: 번호+태그 헤더 → 다이어그램 스테이지. 강조(펄스 오렌지)는 장면당 하나.
 * 전환(크로스페이드)은 PinnedNarrative의 스크럽 타임라인이 담당한다.
 */

function Panel({ n, tag, children }: { n: string; tag: string; children: React.ReactNode }) {
  return (
    <div className="fsd-panel ns-card">
      <div className="fsd-head">
        <span className="fsd-num">{n}</span>
        <span className="fsd-tag">{tag}</span>
      </div>
      <div className="fsd-stage">{children}</div>
    </div>
  )
}

/** 01 — 모두에게 같은 강의: 똑같은 강의만 기계적으로 반복된다. */
function SceneLecture() {
  return (
    <Panel n="01" tag="같은 강의">
      <div className="fsd-col">
        {[1, 2, 3].map((k) => (
          <span className={`fsd-pill ns-s${k}`} key={k}>
            전사 공통 강의 <span className="nsd-mono">{k}회차</span>
          </span>
        ))}
      </div>
    </Panel>
  )
}

/** 02 — 실무 단절: 강의와 월요일의 실제 업무 사이가 끊겨 있다 (유일한 강조 = ✕). */
function SceneGap() {
  return (
    <Panel n="02" tag="실무 단절">
      <div className="fsd-col" style={{ gap: 0 }}>
        <span className="fsd-pill ns-s1">강의 수료 노트</span>
        <span className="nsd-dash ns-d1" aria-hidden />
        <span className="nsd-x" aria-hidden>
          ✕
        </span>
        <span className="nsd-dash ns-d2" aria-hidden />
        <span className="fsd-pill ns-s3">월요일 아침, 내 실제 업무</span>
      </div>
    </Panel>
  )
}

/** 03 — 안 맞는 범용 툴: 정책에 막히고, 맞는 도구는 비어 있다. */
function SceneMisfit() {
  return (
    <Panel n="03" tag="안 맞는 툴">
      <div className="fsd-col">
        <span className="fsd-pill ns-s1">범용 AI 툴</span>
        <div className="nsd-row ns-s2">
          <span className="nsd-mono nsd-chip">보안 정책 ✕</span>
          <span className="nsd-mono nsd-chip">사내 데이터 ✕</span>
        </div>
        <span className="nsd-slot ns-s3">우리 업무에 맞는 도구 — 아직 없음</span>
      </div>
    </Panel>
  )
}

export const narrativeScenes = [SceneLecture, SceneGap, SceneMisfit]
