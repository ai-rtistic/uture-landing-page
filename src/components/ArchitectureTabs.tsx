import { useEffect, useRef, useState } from 'react'
import { architecture } from '../data/content'
import { Container, Pill } from '../ui/primitives'

/**
 * "이렇게 구축합니다" — AX 아키텍처 다이어그램 (uture-motion-diagrams 아티팩트).
 * 각 다이어그램은 자체 마스터 루프를 가진 단일 HTML(/diagrams/*.html)이라
 * iframe으로 임베드하고, 1600×900 캔버스를 컨테이너 폭에 맞춰 scale한다.
 * 활성 탭의 iframe만 마운트 — 나머지는 로드하지 않는다.
 */
const CANVAS_W = 1600
const CANVAS_H = 900

export function ArchitectureTabs() {
  const [active, setActive] = useState(0)
  const viewerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.8)
  const item = architecture.items[active]

  useEffect(() => {
    const el = viewerRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / CANVAS_W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <section className="section arch" id="architecture">
      <Container>
        <div className="services-head">
          <div className="reveal">
            <Pill>{architecture.badge}</Pill>
          </div>
          <h2 className="services-head-title reveal" data-delay="80">
            {architecture.title.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </h2>
          <p className="services-head-intro services-head-intro--lines reveal" data-delay="160">
            {architecture.intro.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </p>
        </div>

        <div className="arch-shell reveal">
          <div className="services-tabs arch-tabs">
            {architecture.items.map((t, i) => (
              <button
                key={t.id}
                className={`services-tab ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="arch-viewer" ref={viewerRef}>
            <iframe
              key={item.id}
              src={item.file}
              title={item.label}
              loading="lazy"
              style={{
                width: CANVAS_W,
                height: CANVAS_H,
                transform: `scale(${scale})`,
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
