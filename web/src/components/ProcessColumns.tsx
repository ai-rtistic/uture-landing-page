import { process } from '../data/content'
import { Container } from '../ui/primitives'

export function ProcessColumns() {
  return (
    <section className="section process" id="process">
      <Container>
        <div className="split-head">
          <h2 className="split-title reveal">
            {process.title.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h2>
          <div className="split-intro reveal" data-delay="120">
            <span>{process.intro}</span>
          </div>
        </div>

        <div className="process-grid">
          {process.steps.map((s, i) => (
            <div className="process-col reveal" key={s.n} data-delay={i * 70}>
              <span className="process-num mono">{s.n}</span>
              <h3 className="process-title">{s.title}</h3>
              <p className="process-desc">{s.desc}</p>
              <div className="process-tags">
                {s.tags.map((t) => (
                  <span className="process-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="process-duration mono">{s.duration}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
