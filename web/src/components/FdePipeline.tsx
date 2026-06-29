import { fde } from '../data/content'
import { Container } from '../ui/primitives'

export function FdePipeline() {
  return (
    <section className="section fde" id="fde">
      <Container>
        <div className="split-head">
          <h2 className="split-title reveal">
            {fde.title.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h2>
          <div className="split-intro reveal" data-delay="120">
            {fde.intro.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
        </div>

        <div className="pipeline reveal" data-delay="120">
          <span className="pipe-cap mono">수작업 흐름</span>
          <span className="pipe-line" aria-hidden />

          {fde.nodes.map((n, i) => (
            <div className="pipe-node-wrap" key={n.id}>
              <div className="pipe-node">
                <span className="pipe-node-tag mono">{n.tag}</span>
                <span className="pipe-node-num mono">{n.n}</span>
                <span className="pipe-node-label">{n.label}</span>
                <span className="pipe-flow" aria-hidden />
              </div>
              {i < fde.nodes.length - 1 && <span className="pipe-line" aria-hidden />}
            </div>
          ))}

          <span className="pipe-line" aria-hidden />
          <span className="pipe-cap pipe-cap-strong mono">현장 정착 완료</span>
        </div>

        <div className="pipe-tools">
          <p className="pipe-tools-label reveal">함께 만들어 온 도구들</p>
          <div className="pipe-tools-grid">
            {fde.tools.map((t, i) => (
              <span className="pipe-tool reveal" key={t} data-delay={i * 60}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
