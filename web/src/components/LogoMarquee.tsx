import { logoCount, testimonial } from '../data/content'
import { Pill } from '../ui/primitives'

const logos = Array.from({ length: logoCount }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return `/assets/customer-logos/logo-${n}.png`
})

export function LogoMarquee() {
  const row = [...logos, ...logos]
  return (
    <section className="logo-marquee">
      <div className="container">
        <div className="logo-marquee-head reveal">
          <Pill>{testimonial.badgeLogos}</Pill>
          <p className="logo-marquee-sub">
            통신 · 제조 · 금융 · 공공 — <strong>50+ 기업</strong>이 유쳐와 함께합니다
          </p>
        </div>
      </div>
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {row.map((src, i) => (
            <div className="marquee-item" key={i}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
