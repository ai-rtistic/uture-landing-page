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
              {'photo' in c && c.photo && (
                <img className="industry-photo" src={c.photo} alt="실제 교육 현장" loading="lazy" />
              )}
              <div className="fsd-head">
                <span className="fsd-num">0{i + 1}</span>
                <span className="fsd-tag">{c.tag}</span>
              </div>
              <h3 className="industry-title">{c.title}</h3>
              <p className="industry-desc">{c.desc}</p>
              <div className="industry-stat">
                <span className="industry-stat-num geist">{c.stat}</span>
                <span className="industry-stat-label">{c.statLabel}</span>
              </div>
              <a className="industry-link" href="#contact">
                도입 문의 <Arrow up={false} />
              </a>
            </article>
          ))}
        </div>

        <div className="industry-proof reveal" data-delay="120">
          <span className="industry-proof-label">{industries.proof.label}</span>
          {industries.proof.items.map((p) => (
            <span className="industry-proof-item" key={p.label}>
              <strong className="geist">{p.num}</strong>
              {p.label}
            </span>
          ))}
        </div>
      </Container>
    </section>
  )
}
