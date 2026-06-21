import { industries } from '../data/content'
import { Container, Arrow } from '../ui/primitives'

export function IndustryCards() {
  return (
    <section className="section industries" id="cases">
      <Container>
        <div className="split-head">
          <h2 className="split-title reveal">
            {industries.title.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h2>
          <div className="split-intro reveal" data-delay="120">
            {industries.intro.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </div>
        </div>

        <div className="industry-grid">
          {industries.cards.map((c, i) => (
            <article className="industry-card reveal" key={c.title} data-delay={i * 100}>
              <span className="industry-tag mono">{c.tag}</span>
              <h3 className="industry-title">{c.title}</h3>
              <p className="industry-desc">{c.desc}</p>
              <div className="industry-stat">
                <span className="industry-stat-num geist">{c.stat}</span>
                <span className="industry-stat-label">{c.statLabel}</span>
              </div>
              <a className="industry-link" href="#contact">
                더 알아보기 <Arrow up={false} />
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
