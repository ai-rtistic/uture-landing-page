import { features } from '../data/content'
import { Container } from '../ui/primitives'
import { SceneGraphic } from './graphics/composed'

export function FeatureCards() {
  return (
    <section className="section features" id="fde">
      <Container>
        <div className="features-grid">
          {features.items.map((f, i) => (
            <div className="feature-card reveal" key={f.title} data-delay={i * 90}>
              <div className="feature-art">
                <SceneGraphic name={f.icon} />
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
