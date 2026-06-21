import { testimonial } from '../data/content'
import { Pill } from '../ui/primitives'
import { WordReveal } from '../ui/WordReveal'

export function Testimonial() {
  return (
    <section className="section testimonial">
      <div className="container testimonial-inner">
        <div className="testimonial-badge reveal">
          <Pill>{testimonial.badgeQuote}</Pill>
        </div>
        <WordReveal className="testimonial-quote" text={testimonial.quote} />
        <div className="testimonial-author reveal">
          <img src={testimonial.avatar} alt={testimonial.author} className="testimonial-avatar" />
          <div>
            <div className="testimonial-name">{testimonial.author}</div>
            <div className="testimonial-role">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
