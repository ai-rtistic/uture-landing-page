import { useState } from 'react'
import { serviceTabs } from '../data/content'
import { Container } from '../ui/primitives'
import { Icon } from '../ui/Icon'

/**
 * "이렇게 일합니다" — AI 활용 데모(탭). 탭마다 해당 장면 영상이 왼쪽에 재생된다.
 * 영상: motion/ WorkDemo 장면별 클립(work-demo-*.webm).
 */
export function ServiceTabs() {
  const [active, setActive] = useState(0)
  const tab = serviceTabs.tabs[active]

  return (
    <section className="section services" id="services">
      <Container>
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
              <video
                key={tab.id}
                className="services-video"
                src={tab.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-hidden
              />
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
