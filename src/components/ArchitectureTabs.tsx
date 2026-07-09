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
// 모바일: 데스크톱 캔버스를 축소하면 글자가 뭉개진다 → 세로형 전용 아티팩트(390×560)로 교체
const CANVAS_M_W = 390
const CANVAS_M_H = 560

export function ArchitectureTabs() {
  const [active, setActive] = useState(0)
  const viewerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.8)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 720px)').matches,
  )
  const item = architecture.items[active]
  const cw = isMobile ? CANVAS_M_W : CANVAS_W
  const ch = isMobile ? CANVAS_M_H : CANVAS_H

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)')
    const onMq = () => setIsMobile(mq.matches)
    mq.addEventListener('change', onMq)
    return () => mq.removeEventListener('change', onMq)
  }, [])

  useEffect(() => {
    const el = viewerRef.current
    if (!el) return
    const update = () => setScale(el.clientWidth / cw)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [cw])

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
              <span key={i}>
                {l}
                {i < architecture.intro.length - 1 && ' '}
              </span>
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
          <div className={`arch-viewer${isMobile ? ' is-mobile' : ''}`} ref={viewerRef}>
            <iframe
              key={`${item.id}-${isMobile ? 'm' : 'd'}`}
              src={isMobile && item.fileMobile ? item.fileMobile : item.file}
              title={item.label}
              loading="lazy"
              style={{
                width: cw,
                height: ch,
                transform: `scale(${scale})`,
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
