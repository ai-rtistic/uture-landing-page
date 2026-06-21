import { features } from '../data/content'
import { Container } from '../ui/primitives'
import { Icon } from '../ui/Icon'

export function FeatureCards() {
  return (
    <section className="section features">
      <Container>
        <div className="features-grid">
          {features.items.map((f, i) => (
            <div className="feature-card reveal" key={f.title} data-delay={i * 90}>
              <div className="feature-icon">
                <Icon name={f.icon as never} />
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
