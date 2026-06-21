import { caseQuote } from '../data/content'
import { Pill } from '../ui/primitives'
import { WordReveal } from '../ui/WordReveal'

export function CaseQuote() {
  return (
    <section className="section case-quote">
      <div className="container case-quote-inner">
        <div className="reveal">
          <Pill>{caseQuote.badge}</Pill>
        </div>
        <WordReveal className="case-quote-text" text={caseQuote.quote} />
        <div className="case-quote-meta mono reveal">
          {caseQuote.author}
          <br />
          {caseQuote.org}
        </div>
      </div>
    </section>
  )
}
