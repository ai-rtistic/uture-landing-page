/**
 * 내러티브 3단계(pain)와 1:1로 짝지어지는 장면 패널 — uture-motion-diagrams 문법.
 * 구조: 번호+태그 헤더 → 다이어그램 스테이지. 강조(펄스 오렌지)는 장면당 하나.
 * 각 장면은 pain의 "이야기"를 도식으로 재연한다 (7s 마이크로 루프, base = 최종 프레임).
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

/** 01 — 같은 강의: 하나의 공통 강의가 서로 다른 네 직무에 똑같이 복사되어 내려간다.
 *  긴장 = "직무는 다른데(칩 4종) 받는 건 전부 동일(같은 미니 카드)". 강조 = 소스 강의 카드. */
function SceneLecture() {
  return (
    <Panel n="01" tag="같은 강의">
      <div className="nsd-cast">
        <div className="nsd-doc is-src ns-s1">
          <span className="nsd-doc-title">전사 공통 강의</span>
          <span className="nsd-doc-lines" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="nsd-doc-meta nsd-mono">180min · 전 직군 공통</span>
        </div>
        <div className="nsd-recvrow">
          {['영업', '개발', '재무', '인사'].map((t, i) => (
            <div className="nsd-recv" style={{ '--i': i } as React.CSSProperties} key={t}>
              <i className="nsd-dropwire" aria-hidden />
              <span className="nsd-copy" aria-hidden>
                <i />
                <i />
              </span>
              <span className="nsd-team">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}

/** 02 — 실무 단절: 수료 노트와 월요일의 실제 업무가 어긋난 채 끊겨 있다.
 *  두 카드는 좌우로 어긋나고(오프셋), 연결선도 어긋난 지점에서 ✕로 끊긴다. 강조 = ✕. */
function SceneGap() {
  return (
    <Panel n="02" tag="실무 단절">
      <div className="nsd-break">
        <div className="nsd-doc sm off-l ns-s1">
          <span className="nsd-doc-title">강의 수료 노트</span>
          <span className="nsd-doc-lines" aria-hidden>
            <i />
            <i />
          </span>
        </div>
        <div className="nsd-gapwire" aria-hidden>
          <i className="nsd-dash off-l ns-d1" />
          <span className="nsd-x">✕</span>
          <i className="nsd-dash off-r ns-d2" />
        </div>
        <div className="nsd-doc sm off-r is-dim ns-s3">
          <span className="nsd-doc-title">월요일 아침, 내 실제 업무</span>
          <span className="nsd-doc-rows" aria-hidden>
            <i />
            <i />
          </span>
        </div>
      </div>
    </Panel>
  )
}

/** 03 — 안 맞는 툴: 범용 툴은 정책의 벽에 막히고, 맞는 도구 자리는 비어 있다.
 *  툴 칩이 벽에 다가갔다 튕겨나는 루프. 강조 = 비어 있는 자리(앰버 파선 슬롯). */
function SceneMisfit() {
  return (
    <Panel n="03" tag="안 맞는 툴">
      <div className="nsd-fit">
        <span className="nsd-tool ns-s1">범용 AI 툴</span>
        <div className="nsd-wall ns-s2" aria-hidden>
          <span className="nsd-brick">보안 정책 ✕</span>
          <span className="nsd-brick">사내 데이터 ✕</span>
        </div>
        <span className="nsd-slot ns-s3">우리 업무에 맞는 도구 — 아직 없음</span>
      </div>
    </Panel>
  )
}

export const narrativeScenes = [SceneLecture, SceneGap, SceneMisfit]
