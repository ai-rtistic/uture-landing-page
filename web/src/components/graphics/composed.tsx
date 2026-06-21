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

export const serviceGraphics = [PlanGraphic, BuildGraphic, WorkflowGraphic]

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
