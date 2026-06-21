import { useState } from 'react'
import { serviceTabs } from '../data/content'
import { Container } from '../ui/primitives'
import { Icon } from '../ui/Icon'

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
            <div className="services-demo" key={tab.id}>
              <ServiceDemo index={active} />
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

function ServiceDemo({ index }: { index: number }) {
  const tab = serviceTabs.tabs[index]
  if (tab.items) {
    return (
      <div className="demo-plan">
        {tab.items.map((it, i) => (
          <div className={`demo-row ${it.done ? 'is-done' : ''}`} key={i} style={{ animationDelay: `${i * 90}ms` }}>
            <span className="demo-check">{it.done ? '✓' : '+'}</span>
            <span>{it.text}</span>
          </div>
        ))}
      </div>
    )
  }
  if (tab.code) {
    return (
      <pre className="demo-code mono">
        {tab.code.map((line, i) => (
          <div key={i} style={{ animationDelay: `${i * 60}ms` }}>
            {line || ' '}
          </div>
        ))}
      </pre>
    )
  }
  if (tab.flow) {
    return (
      <div className="demo-flow">
        {tab.flow.map((f, i) => (
          <div className="demo-flow-step" key={i} style={{ animationDelay: `${i * 120}ms` }}>
            <span className="demo-flow-k mono">{f.k}</span>
            <span className="demo-flow-v">{f.v}</span>
          </div>
        ))}
        <div className="demo-flow-blob" aria-hidden />
      </div>
    )
  }
  return null
}
