import type { ReactNode } from 'react'
import { GIcon, type GIconName } from './icons'

/**
 * Spot-graphic primitives — the shared vocabulary for branded UI illustrations
 * (the "diagram" panels seen in twelvelabs-style sections).
 * Everything is SVG/HTML + CSS, themed via brand tokens. See graphics.css.
 */

export type Tint = 'peach' | 'amber' | 'sky' | 'rose' | 'lilac' | 'mint' | 'neutral'

/** Rounded panel with a soft brand-tinted radial glow behind the content. */
export function GFrame({
  tint = 'neutral',
  grid = false,
  compact = false,
  children,
}: {
  tint?: Tint
  grid?: boolean
  compact?: boolean
  children: ReactNode
}) {
  return (
    <div className={`g-frame g-tint-${tint} ${compact ? 'is-compact' : ''}`}>
      <span className="g-glow" aria-hidden />
      {grid && <span className="g-grid" aria-hidden />}
      <div className="g-stage">{children}</div>
    </div>
  )
}

/** Small pill node with optional leading icon — search bars, media chips, tags. */
export function GNode({
  icon,
  children,
  tone = 'default',
}: {
  icon?: GIconName
  children?: ReactNode
  tone?: 'default' | 'dark' | 'ghost'
}) {
  return (
    <span className={`g-node g-node-${tone}`}>
      {icon && (
        <span className="g-node-ico">
          <GIcon name={icon} />
        </span>
      )}
      {children != null && <span className="g-node-label">{children}</span>}
    </span>
  )
}

/** Thin connector line with a flowing accent pulse. Vertical by default. */
export function GConn({ length = 34, flow = true }: { length?: number; flow?: boolean }) {
  return (
    <span
      className={`g-conn ${flow ? 'is-flow' : ''}`}
      style={{ height: length }}
      aria-hidden
    />
  )
}

/** Rounded media tile. `active` fills it with a brand gradient + glow. */
export function GTile({
  active = false,
  icon = 'play',
  tag,
  thumb,
}: {
  active?: boolean
  icon?: GIconName | null
  tag?: string
  thumb?: string
}) {
  return (
    <div className={`g-tile ${active ? 'is-active' : ''}`}>
      {tag && <span className="g-tile-tag mono">{tag}</span>}
      {thumb ? (
        <img className="g-tile-thumb" src={thumb} alt="" />
      ) : (
        icon && (
          <span className="g-tile-ico">
            <GIcon name={icon} />
          </span>
        )
      )}
    </div>
  )
}

/** A row of bars (a stylised scene / waveform strip). `cells` = bar weights;
 *  indices in `fill` render in the accent colour. */
export function GStrip({
  cells,
  fill = [],
  dashed = false,
}: {
  cells: number[]
  fill?: number[]
  dashed?: boolean
}) {
  return (
    <div className={`g-strip ${dashed ? 'is-dashed' : ''}`}>
      {cells.map((w, i) => (
        <span
          key={i}
          className={`g-bar ${fill.includes(i) ? 'is-fill' : ''}`}
          style={{ flexGrow: w }}
        />
      ))}
    </div>
  )
}

/** Embedding space: a grid with scattered square dots + a centred glyph node. */
export function GDots({ center = 'text' }: { center?: GIconName }) {
  const dots = [
    [22, 30],
    [70, 18],
    [82, 52],
    [60, 70],
    [30, 64],
    [14, 50],
    [46, 22],
    [88, 78],
    [38, 84],
  ]
  return (
    <div className="g-dots">
      <span className="g-grid" aria-hidden />
      {dots.map(([x, y], i) => (
        <span
          key={i}
          className="g-dot"
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.3}s` }}
        />
      ))}
      <span className="g-dots-center">
        <GIcon name={center} size={16} />
      </span>
    </div>
  )
}

/** Vertical stack helper used by most diagrams (centres + spaces children). */
export function GStack({ children }: { children: ReactNode }) {
  return <div className="g-stack">{children}</div>
}
