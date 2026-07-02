import { hero, stats } from '../data/content'
import { Button, Pill } from '../ui/primitives'
import { HeroAutomation } from './demos/HeroAutomation'
import { HeroTilesVideo } from './graphics/HeroTilesVideo'

// 히어로 하단 신뢰 스트립 — 스탯 섹션의 핵심 3개만 미리 보여준다
const PROOF = stats.slice(0, 3)
const fmt = (v: number, decimals?: number) =>
  v.toLocaleString('ko-KR', { minimumFractionDigits: decimals ?? 0, maximumFractionDigits: decimals ?? 0 })

export function Hero() {
  return (
    <section className="hero" id="top">
      <HeroTilesVideo />
      <div className="container hero-inner">
        <div className="hero-badge reveal">
          <Pill>{hero.badge}</Pill>
        </div>
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
        <div className="hero-proof reveal" data-delay="420">
          {PROOF.map((s) => (
            <div className="hero-proof-item" key={s.label}>
              <strong>
                {fmt(s.value, 'decimals' in s ? s.decimals : 0)}
                <em>{s.suffix}</em>
              </strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <HeroAutomation />
      <div className="hero-aura" aria-hidden />
    </section>
  )
}
