import { useEffect, useRef, useState } from 'react'
import { serviceTabs } from '../data/content'
import { Container, Pill } from '../ui/primitives'
import { Icon } from '../ui/Icon'
import { DemoSearch } from './demos/DemoSearch'
import { DemoAssistant } from './demos/DemoAssistant'
import { DemoReport } from './demos/DemoReport'

/**
 * "이렇게 일합니다" — AI 활용 데모(탭). 탭마다 해당 장면의 인페이지 GSAP
 * 시퀀스(components/demos/)가 왼쪽에서 재생된다.
 */
const DEMOS: Record<string, () => JSX.Element> = {
  search: DemoSearch,
  assistant: DemoAssistant,
  report: DemoReport,
}

export function ServiceTabs() {
  const [active, setActive] = useState(0)
  const tab = serviceTabs.tabs[active]
  const videoRef = useRef<HTMLVideoElement>(null)

  // Reliably play the active demo clip when it (re)mounts and whenever the
  // section is in view — muted autoplay alone can be deferred by the browser.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const play = () => v.play().catch(() => {})
    play()
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? play() : v.pause()),
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [active])

  return (
    <section className="section services" id="services">
      <Container>
        <div className="services-head">
          <div className="reveal">
            <Pill>{serviceTabs.badge}</Pill>
          </div>
          <h2 className="services-head-title reveal" data-delay="80">
            {serviceTabs.title.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h2>
          <p className="services-head-intro reveal" data-delay="160">
            {serviceTabs.intro}
          </p>
        </div>
        <div className="services-shell reveal">
          <div className="services-tabs">
            {serviceTabs.tabs.map((t, i) => (
              <button
                key={t.id}
                className={`services-tab ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <Icon name={t.icon as never} size={16} />
                {t.label}
              </button>
            ))}
          </div>

          <div className="services-body">
            <div className="services-demo">
              {DEMOS[tab.id] ? (
                (() => {
                  const Demo = DEMOS[tab.id]
                  return <Demo key={tab.id} />
                })()
              ) : (
                <video
                  key={tab.id}
                  ref={videoRef}
                  className="services-video"
                  src={tab.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-hidden
                />
              )}
            </div>
            <div className="services-text">
              <h2 className="services-title">
                {tab.title.map((l, i) => (
                  <span key={i}>{l}</span>
                ))}
              </h2>
              <p className="services-desc">{tab.desc}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
