import { philosophy } from '../data/content'
import { Pill } from '../ui/primitives'

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
        <p className="philosophy-sub philosophy-sub--last reveal" data-delay="160">
          {philosophy.sub}
        </p>
        <div className="philosophy-founder reveal" data-delay="240">
          <p className="philosophy-founder-quote">{philosophy.founder.quote}</p>
          <div className="philosophy-founder-meta">
            <img src={philosophy.founder.avatar} alt={`${philosophy.founder.name} 대표 프로필`} />
            <div className="philosophy-founder-id">
              <span className="philosophy-founder-name">{philosophy.founder.name}</span>
              <span className="philosophy-founder-role">{philosophy.founder.role}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
