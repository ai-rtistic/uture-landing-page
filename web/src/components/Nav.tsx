import { useEffect, useState } from 'react'
import { nav, brand } from '../data/content'
import { Arrow } from '../ui/primitives'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner container">
        <a href="#top" className="nav-brand" aria-label="유쳐 홈">
          <img src={brand.logo} alt="유쳐" />
        </a>

        <nav className="nav-links">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="nav-lang" aria-label="언어">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="10" cy="10" r="7.5" />
              <path d="M2.5 10h15M10 2.5c2.5 2.4 2.5 12.6 0 15M10 2.5c-2.5 2.4-2.5 12.6 0 15" />
            </svg>
            <span>KO</span>
          </button>
          <a href={nav.cta.href} className="btn btn-dark nav-cta">
            {nav.cta.label}
            <Arrow />
          </a>
        </div>
      </div>
    </header>
  )
}
