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

// service tabs now show concrete AX assets (검색 / 생성 / 자동화);
// tab 0 (검색) uses the rendered Remotion video, others use these SVG assets.
export const serviceGraphics = [AssetSearchGraphic, AssetReportGraphic, AssetPipelineGraphic]

/* ---- Feature-card scene illustrations (tinted mini panels) ---- */

type Scene = { tint: Parameters<typeof GFrame>[0]['tint']; body: JSX.Element }

const SCENES: Record<string, Scene> = {
  target: {
    tint: 'peach',
    body: (
      <GStack>
        <GNode icon="target">진단</GNode>
        <GConn length={20} />
        <GStrip cells={[2, 4, 3]} fill={[1]} />
        <GStrip cells={[5, 2]} fill={[0]} />
      </GStack>
    ),
  },
  people: {
    tint: 'rose',
    body: (
      <div className="g-scene-grid">
        <GStrip cells={[2, 3, 1]} fill={[1]} />
        <GStrip cells={[3, 2, 2]} fill={[0]} />
        <GStrip cells={[1, 4, 2]} fill={[2]} />
        <GStrip cells={[4, 1, 2]} fill={[1]} />
      </div>
    ),
  },
  build: {
    tint: 'lilac',
    body: (
      <GStack>
        <GNode icon="build">co-build</GNode>
        <GConn length={20} />
        <GTile active icon="gear" />
      </GStack>
    ),
  },
  cloud: {
    tint: 'amber',
    body: (
      <div className="g-scene-grid g-scene-dashed">
        <GStrip cells={[2, 2, 3]} fill={[2]} dashed />
        <GStrip cells={[3, 2, 2]} fill={[0]} dashed />
        <GStrip cells={[2, 3, 2]} fill={[1]} dashed />
      </div>
    ),
  },
}

export function SceneGraphic({ name }: { name: string }) {
  const scene = SCENES[name] ?? SCENES.target
  return (
    <GFrame tint={scene.tint} compact>
      {scene.body}
    </GFrame>
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
