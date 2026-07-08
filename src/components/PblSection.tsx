import { pbl } from '../data/content'
import { Container, Pill, Button } from '../ui/primitives'

/**
 * PBL(프로젝트형 교육) 설명 — glowCTA 슬롯 대체.
 * "교육 문의" CTA가 가리키는 상품이 무엇인지, 강의식과의 대비 다이어그램으로 답한다.
 * 문법: uture-motion-diagrams 라이트 — 헤어라인 캡슐, filled 강조는 PBL 결과물 하나.
 * 모션: 7s CSS 마스터 루프 — 내러티브 순서 스태거(강의식 먼저, PBL이 응답),
 *       커넥터 드로우 + 오렌지 팝. base 상태 = 최종 프레임 (reduced-motion 폴백).
 */
export function PblSection() {
  // 등장 순서 = 설명 순서 (초 단위 딜레이) — 강의식 경로가 먼저 흐려지고, PBL이 답한다
  const D1 = [0.2, 0.5, 0.8, 1.1, 1.4] // 강의식: 라벨, pill, wire, pill, wire+end
  const D2 = [2.4, 2.7, 3.0, 3.3, 3.7] // PBL: 라벨, pill, wire, pill, 오렌지 팝
  const d = (v: number) => ({ '--d': `${v}s` }) as React.CSSProperties

  return (
    <section className="section pbl" id="pbl">
      <Container>
        <div className="pbl-inner">
          <div className="reveal">
            <Pill>{pbl.badge}</Pill>
          </div>
          <h2 className="pbl-title reveal" data-delay="80">
            {pbl.title.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h2>
          <p className="pbl-sub reveal" data-delay="160">
            {pbl.sub}
          </p>

          <div className="pbl-compare reveal" data-delay="240" aria-hidden>
            {/* 강의식 — 파선 경로, 회귀로 끝난다 */}
            <div className="pbl-row is-dim">
              <span className="pbl-row-label mono pb-in" style={d(D1[0])}>
                {pbl.rows[0].label}
              </span>
              <div className="pbl-flow">
                <span className="nc-pill pb-in" style={d(D1[1])}>{pbl.rows[0].steps[0]}</span>
                <i className="nc-wire is-dash pb-draw" style={d(D1[2])} />
                <span className="nc-pill pb-in" style={d(D1[2])}>{pbl.rows[0].steps[1]}</span>
                <i className="nc-wire is-dash pb-draw" style={d(D1[3])} />
                <span className="nc-pill is-fade pb-in" style={d(D1[4])}>{pbl.rows[0].end}</span>
              </div>
            </div>
            {/* 유쳐 PBL — 선명한 경로, 완성물(오렌지 = 유일 강조)로 끝난다 */}
            <div className="pbl-row">
              <span className="pbl-row-label mono pb-in" style={d(D2[0])}>
                {pbl.rows[1].label}
              </span>
              <div className="pbl-flow">
                <span className="nc-pill pb-in" style={d(D2[1])}>{pbl.rows[1].steps[0]}</span>
                <i className="nc-wire pb-draw" style={d(D2[2])} />
                <span className="nc-pill pb-in" style={d(D2[2])}>{pbl.rows[1].steps[1]}</span>
                <i className="nc-wire pb-draw" style={d(D2[3])} />
                <span className="nc-pill is-fill pb-pop" style={d(D2[4])}>{pbl.rows[1].end}</span>
              </div>
            </div>
          </div>

          <div className="pbl-cta reveal" data-delay="320">
            <Button href={pbl.cta.href}>{pbl.cta.label}</Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
