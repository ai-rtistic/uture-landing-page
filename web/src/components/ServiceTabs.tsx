import { useState } from 'react'
import { serviceTabs } from '../data/content'
import { Container } from '../ui/primitives'
import { Icon } from '../ui/Icon'
import { serviceGraphics } from './graphics/composed'

export function ServiceTabs() {
  const [active, setActive] = useState(0)
  const tab = serviceTabs.tabs[active]
  const Graphic = serviceGraphics[active] ?? serviceGraphics[0]

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
            <div className="services-demo" key={tab.id}>
              <Graphic />
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
