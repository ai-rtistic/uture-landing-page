import { useEffect, useRef } from 'react'
import { hero } from '../data/content'
import { Button, Pill } from '../ui/primitives'
import { HeroVisual } from './HeroVisual'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Muted autoplay can be deferred by the browser (backgrounded tab, power
  // saving). Nudge playback on mount and whenever the tab regains focus so the
  // ambient background motion is actually visible. Honors reduced-motion.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const play = () => v.play().catch(() => {})
    play()
    const onVisible = () => document.visibilityState === 'visible' && play()
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  return (
    <section className="hero" id="top">
      <video
        ref={videoRef}
        className="hero-motion"
        src="/assets/motion/hero-flow.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
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
      </div>
      <HeroVisual />
      <div className="hero-aura" aria-hidden />
    </section>
  )
}
