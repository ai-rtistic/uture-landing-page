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
        <WordReveal className="testimonial-quote" text={`“${testimonial.quote}”`} />
        <div className="testimonial-author reveal">
          <img
            src={testimonial.quoteAvatar}
            alt={testimonial.quoteAuthor}
            className="testimonial-avatar"
          />
          <div>
            <div className="testimonial-name">{testimonial.quoteAuthor}</div>
            <div className="testimonial-role">{testimonial.quoteRole}</div>
          </div>
        </div>
        <p className="testimonial-philosophy reveal">{testimonial.philosophy}</p>
      </div>
    </section>
  )
}
