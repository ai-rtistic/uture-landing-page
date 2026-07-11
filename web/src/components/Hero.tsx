import { hero, stats } from '../data/content'
import { Button, Pill } from '../ui/primitives'
import { HeroAutomation } from './demos/HeroAutomation'
import { HeroShowcase } from './demos/HeroShowcase'
import { HeroTilesVideo } from './graphics/HeroTilesVideo'

/** 히어로 변형 스위치 — 2026-07 AI 기업 리서치(Sierra·Glean·Decagon·Linear·채널톡) 결론:
 *  배경은 침묵, 에너지는 컨테인드 제품 비주얼 하나(오로라 프레임 agent 패널)에 집중.
 *  'video'로 바꾸면 기존 타일 필드 영상 배경으로 복귀. */
const HERO_VARIANT: 'clean' | 'video' = 'clean'

// 히어로 하단 신뢰 스트립 — 스탯 섹션의 핵심 3개만 미리 보여준다
const PROOF = stats.slice(0, 3)
const fmt = (v: number, decimals?: number) =>
  v.toLocaleString('ko-KR', { minimumFractionDigits: decimals ?? 0, maximumFractionDigits: decimals ?? 0 })

export function Hero() {
  return (
    <section className={`hero${HERO_VARIANT === 'clean' ? ' hero--clean' : ''}`} id="top">
      {HERO_VARIANT === 'video' && <HeroTilesVideo />}
      {HERO_VARIANT === 'clean' && <div className="hero-rules" aria-hidden />}
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
      {HERO_VARIANT === 'clean' ? <HeroShowcase /> : <HeroAutomation />}
      <div className="hero-aura" aria-hidden />
    </section>
  )
}
