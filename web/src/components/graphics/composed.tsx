import { GIcon } from './icons'
import { GFrame, GNode, GConn, GTile, GStrip, GStack } from './primitives'

/* ============================================================
   Composed spot-graphics — built from primitives, brand-themed.
   One illustration per service tab (Plan / Build / Workflow).
   ============================================================ */

/** Plan: a diagnosis query → board of items, top priority highlighted. */
export function PlanGraphic() {
  return (
    <GFrame tint="peach">
      <GStack>
        <GNode icon="target">조직 진단 · 우선순위</GNode>
        <GConn />
        <div className="g-grid-tiles">
          <GTile active tag="P1" icon="gear" />
          <GTile icon="flow" />
          <GTile icon="text" />
          <GTile icon="image" />
          <GTile icon="video" />
          <GTile icon="audio" />
        </div>
      </GStack>
    </GFrame>
  )
}

/** Build: field requirement → uture agent → deployed in-house tool. */
export function BuildGraphic() {
  return (
    <GFrame tint="lilac">
      <GStack>
        <GNode icon="build">현장 요구</GNode>
        <GConn />
        <GNode icon="sparkle">uture agent</GNode>
        <GConn />
        <div className="g-doc">
          <span className="g-doc-spark">
            <GIcon name="gear" size={16} />
          </span>
          <GStrip cells={[5, 3]} fill={[0]} />
          <GStrip cells={[4, 4, 2]} />
          <GNode tone="dark" icon="build">
            deployed · on-prem
          </GNode>
        </div>
      </GStack>
    </GFrame>
  )
}

/** Workflow: in-house tools wired into one AI flow. */
export function WorkflowGraphic() {
  return (
    <GFrame tint="sky" grid>
      <GStack>
        <GNode icon="flow">Slack 메시지 수집</GNode>
        <GConn />
        <GNode tone="dark" icon="sparkle">
          uture Agent 분석
        </GNode>
        <GConn />
        <GNode icon="text">Confluence 자동 업로드</GNode>
      </GStack>
    </GFrame>
  )
}

/** 구성원 교육: 직무·숙련도 진단 → 직무별 맞춤 트랙(각기 다른 진척). */
export function EducateGraphic() {
  return (
    <GFrame tint="peach">
      <GStack>
        <GNode icon="target">직무 · 숙련도 진단</GNode>
        <GConn />
        <div className="g-scene-grid">
          <GStrip cells={[3, 4, 2]} fill={[0, 1]} />
          <GStrip cells={[2, 3, 3]} fill={[0]} />
          <GStrip cells={[4, 2, 3]} fill={[0, 1]} />
        </div>
      </GStack>
    </GFrame>
  )
}

/** 프로젝트형 교육: 내 실제 업무 안건 → 1:1 코칭·함께 구축 → 내 결과물. */
export function ProjectGraphic() {
  return (
    <GFrame tint="rose">
      <GStack>
        <GNode icon="text">내 실제 업무 안건</GNode>
        <GConn />
        <GNode tone="dark" icon="sparkle">
          1:1 코칭 · 함께 구축
        </GNode>
        <GConn />
        <GTile active tag="DONE" icon="gear" />
      </GStack>
    </GFrame>
  )
}

// service tabs = 유쳐 3축: 구성원 교육 / 프로젝트형 교육 / 기업 맞춤 AX 엔지니어링.
// 엔지니어링은 기존 BuildGraphic(현장 요구 → uture agent → on-prem 배포) 재사용.
export const serviceGraphics = [EducateGraphic, ProjectGraphic, BuildGraphic]

/* ---- Feature-card scene illustrations — uture-motion-diagrams 패널 ----
   구조: 번호+태그 헤더 → 다이어그램 스테이지. 강조(펄스 오렌지)는 카드당 하나.
   6초 CSS 마이크로 루프 (fs-*), base 상태 = 최종 프레임. */

const cssVars = (v: Record<string, string | number>) => v as React.CSSProperties

const DIAG_TILES = ['메일', '보고서', 'VOC', '일정', '정산', '회의록']

type Scene = { n: string; tag: string; body: JSX.Element }

const SCENES: Record<string, Scene> = {
  /* 진단: 스캔 라인이 업무 타일을 훑고, 우선순위(P1)가 점등된다 */
  target: {
    n: '01',
    tag: '진단',
    body: (
      <div className="fsd-col">
        <div className="fs-scanwrap">
          <div className="fs-tiles">
            {DIAG_TILES.map((t, i) => (
              <span className="fs-tile" style={cssVars({ '--i': i })} key={t}>
                {t}
                {t === '정산' && <span className="fs-p1tag">P1</span>}
              </span>
            ))}
          </div>
          <span className="fs-scan" aria-hidden />
        </div>
      </div>
    ),
  },
  /* 현장 실행: 워킹 미팅에서 실무 타일로 체크가 하나씩 퍼진다 */
  people: {
    n: '02',
    tag: '실행',
    body: (
      <div className="fsd-col">
        <span className="fsd-pill">현장 워킹 미팅</span>
        <span className="fsd-wire" aria-hidden />
        <div className="fs-tiles">
          {['메일 정리', '견적 초안', 'VOC 분류'].map((t, i) => (
            <span className="fs-tile" style={cssVars({ '--i': i })} key={t}>
              {t}
              <span className="fs-checkdot" style={cssVars({ '--i': i })}>
                ✓
              </span>
            </span>
          ))}
        </div>
      </div>
    ),
  },
  /* 공동 구축: 블록이 순서대로 조립되고 사내 도구가 배포된다 */
  build: {
    n: '03',
    tag: '구축',
    body: (
      <div className="fsd-col">
        <div className="fs-blocks">
          {[0, 1, 2].map((i) => (
            <span className="fs-block" style={cssVars({ '--i': i })} key={i} />
          ))}
        </div>
        <span className="fsd-wire" aria-hidden />
        <span className="fsd-pill is-fill fs-toolnode">사내 도구 배포</span>
      </div>
    ),
  },
  /* 정착: 분기 리뷰 사이클이 돌고 활용 지표가 차오른다 */
  cloud: {
    n: '04',
    tag: '정착',
    body: (
      <div className="fsd-col">
        <div className="fs-ring">
          분기
          <br />
          리뷰
          <span className="fs-ringdot" aria-hidden />
        </div>
        <span className="fsd-wire" aria-hidden />
        <div className="fs-meters">
          <span className="fs-meter">
            <span style={cssVars({ '--i': 0, '--w': '84%' })} />
          </span>
          <span className="fs-meter">
            <span style={cssVars({ '--i': 1, '--w': '62%' })} />
          </span>
        </div>
      </div>
    ),
  },
}

export function SceneGraphic({ name }: { name: string }) {
  const scene = SCENES[name] ?? SCENES.target
  return (
    <div className="fsd-panel">
      <div className="fsd-head">
        <span className="fsd-num">{scene.n}</span>
        <span className="fsd-tag">{scene.tag}</span>
      </div>
      <div className="fsd-stage">{scene.body}</div>
    </div>
  )
}

/* ============================================================
   AX 에셋 예시 — concrete uture deliverables (detailed, minimal)
   ============================================================ */

/** 사내 문서 검색 (Search형): 자연어 질의 → 문서 타일 그리드, 적중 1개. */
export function AssetSearchGraphic() {
  return (
    <GFrame tint="peach">
      <GStack>
        <GNode icon="search">정산 규정 어디 있더라?</GNode>
        <GConn />
        <div className="g-grid-tiles">
          <GTile active tag="HIT" icon="text" />
          <GTile icon="text" />
          <GTile icon="image" />
          <GTile icon="text" />
          <GTile icon="image" />
          <GTile icon="text" />
        </div>
      </GStack>
    </GFrame>
  )
}

/** 리포트 자동 생성 (Analyze형): 업무 로그 → AI 생성 → 산출 문서. */
export function AssetReportGraphic() {
  return (
    <GFrame tint="amber">
      <GStack>
        <GNode icon="text">주간 업무 로그</GNode>
        <GConn />
        <GNode tone="dark" icon="sparkle">
          AI 자동 생성
        </GNode>
        <GConn />
        <div className="g-doc">
          <span className="g-doc-spark">
            <GIcon name="sparkle" size={16} />
          </span>
          <GStrip cells={[5, 3]} fill={[0]} />
          <GStrip cells={[4, 4, 2]} />
          <GStrip cells={[6, 2]} />
          <GStrip cells={[3]} />
        </div>
      </GStack>
    </GFrame>
  )
}

/** VOC 분류 파이프라인: 인입 → AI 분류 → 카테고리 버킷. */
export function AssetPipelineGraphic() {
  return (
    <GFrame tint="sky" grid>
      <GStack>
        <GNode icon="flow">VOC 인입</GNode>
        <GConn />
        <GNode tone="dark" icon="sparkle">
          AI 자동 분류
        </GNode>
        <GConn />
        <div className="g-buckets">
          <span className="tag">불만</span>
          <span className="tag">문의</span>
          <span className="tag">칭찬</span>
        </div>
      </GStack>
    </GFrame>
  )
}

export const axAssets = [
  { id: 'search', label: '사내 문서 검색', desc: '자연어로 묻고 사내 문서에서 바로 찾기', Comp: AssetSearchGraphic },
  { id: 'report', label: '리포트 자동 생성', desc: '업무 로그 → AI가 주간 리포트로', Comp: AssetReportGraphic },
  { id: 'pipeline', label: 'VOC 분류 파이프라인', desc: '인입 즉시 AI가 카테고리로 분류', Comp: AssetPipelineGraphic },
]
