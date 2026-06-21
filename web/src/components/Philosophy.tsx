import { philosophy } from '../data/content'
import { Button, Pill } from '../ui/primitives'

export function Philosophy() {
  return (
    <section className="section philosophy">
      <div className="container philosophy-inner">
        <div className="reveal">
          <Pill>{philosophy.badge}</Pill>
        </div>
        <h2 className="philosophy-title reveal" data-delay="80">
          {philosophy.title.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </h2>
        <p className="philosophy-sub reveal" data-delay="160">
          {philosophy.sub}
        </p>
        <div className="reveal" data-delay="240">
          <Button href={philosophy.cta.href}>{philosophy.cta.label}</Button>
        </div>
      </div>
    </section>
  )
}
