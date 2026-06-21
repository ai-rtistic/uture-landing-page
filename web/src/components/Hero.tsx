import { hero } from '../data/content'
import { Button } from '../ui/primitives'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <p className="hero-badge reveal">{hero.badge}</p>
        <h1 className="hero-title">
          {hero.titleLines.map((line, i) => (
            <span
              key={i}
              className="reveal hero-line"
              data-delay={i * 90}
            >
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-sub reveal" data-delay="220">
          {hero.sub}
        </p>
        <div className="hero-cta reveal" data-delay="320">
          <Button href={hero.cta.href}>{hero.cta.label}</Button>
          <Button href={hero.ctaGhost.href} variant="ghost">
            {hero.ctaGhost.label}
          </Button>
        </div>
      </div>
      <div className="hero-aura" aria-hidden />
    </section>
  )
}
