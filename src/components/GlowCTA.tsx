import { glowCTA } from '../data/content'
import { Button } from '../ui/primitives'

export function GlowCTA() {
  return (
    <section className="section glow-cta-section">
      <div className="container">
        <div className="glow-cta reveal">
          <div className="glow-cta-border" aria-hidden />
          <div className="glow-cta-inner">
            <h2 className="glow-cta-title">{glowCTA.title}</h2>
            <p className="glow-cta-sub">{glowCTA.sub}</p>
            <Button href={glowCTA.cta.href}>{glowCTA.cta.label}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
