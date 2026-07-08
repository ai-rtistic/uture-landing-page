import type { ReactNode } from 'react'

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`container ${className}`}>{children}</div>
}

export function Pill({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>
}

export function Arrow({ up = true }: { up?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d={up ? 'M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5' : 'M2.5 7h8.5M8 3.5L11.5 7L8 10.5'}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Button({
  href,
  children,
  variant = 'dark',
}: {
  href: string
  children: ReactNode
  variant?: 'dark' | 'ghost'
}) {
  return (
    <a href={href} className={`btn btn-${variant}`}>
      {children}
      <Arrow />
    </a>
  )
}
