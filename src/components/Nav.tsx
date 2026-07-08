import { useEffect, useState } from 'react'
import { nav } from '../data/content'
import { Arrow } from '../ui/primitives'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll + close on Escape while the mobile sheet is open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`nav ${scrolled || open ? 'is-scrolled' : ''}`}>
      <div className="nav-inner container">
        {/* 정식 브랜드 로고 — 스파클 심볼 + 라운드 워드마크 (brand-asset SVG, 레티나 무손실) */}
        <a href="#top" className="nav-brand" aria-label="유쳐 홈" onClick={() => setOpen(false)}>
          <img className="nav-symbol" src="/assets/brand/symbol.svg" alt="" aria-hidden />
          <img className="nav-logotype" src="/assets/brand/wordmark.svg" alt="유쳐" />
        </a>

        <nav className="nav-links">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href={nav.cta.href} className="btn btn-dark nav-cta">
            {nav.cta.label}
            <Arrow />
          </a>
          <button
            className={`nav-burger ${open ? 'is-open' : ''}`}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            aria-controls="nav-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <button
        className={`nav-scrim ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
      <div id="nav-sheet" className={`nav-sheet ${open ? 'is-open' : ''}`}>
        <nav className="nav-sheet-links">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
              <Arrow />
            </a>
          ))}
        </nav>
        <a href={nav.cta.href} className="btn btn-dark nav-sheet-cta" onClick={() => setOpen(false)}>
          {nav.cta.label}
          <Arrow />
        </a>
      </div>
    </header>
  )
}
