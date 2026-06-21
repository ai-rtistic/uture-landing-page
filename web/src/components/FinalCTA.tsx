import { finalCTA } from '../data/content'
import { Button } from '../ui/primitives'

const CAPSULES = Array.from({ length: 9 })

export function FinalCTA() {
  return (
    <section className="section final-cta" id="contact">
      <div className="final-cta-field" aria-hidden>
        {CAPSULES.map((_, i) => (
          <span className={`capsule capsule-${i % 5}`} key={i} />
        ))}
      </div>
      <div className="container final-cta-inner">
        <h2 className="final-cta-title reveal">
          {finalCTA.title.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </h2>
        <p className="final-cta-sub reveal" data-delay="120">
          {finalCTA.sub}
        </p>
        <div className="final-cta-actions reveal" data-delay="200">
          <Button href={finalCTA.primary.href}>{finalCTA.primary.label}</Button>
          <Button href={finalCTA.secondary.href} variant="ghost">
            {finalCTA.secondary.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
