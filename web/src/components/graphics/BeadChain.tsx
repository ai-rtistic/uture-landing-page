/**
 * Flowing gradient "bead chain" — twelvelabs' signature background motif:
 * a row of small soft gradient capsules strung along a gentle curve.
 * Place several at different angles/positions and parallax them on scroll.
 */
const GRADS = [
  'linear-gradient(90deg, var(--c-mint), var(--c-amber))',
  'linear-gradient(90deg, var(--c-peach), var(--c-rose))',
  'linear-gradient(90deg, var(--c-amber), var(--c-mint))',
  'linear-gradient(90deg, var(--c-rose), var(--c-lilac))',
  'linear-gradient(90deg, var(--c-lilac), var(--c-sky))',
  'linear-gradient(90deg, var(--c-sky), var(--c-mint))',
  'linear-gradient(90deg, var(--c-amber), var(--c-peach))',
]

export function BeadChain({
  count = 11,
  curve = 0,
}: {
  count?: number
  /** vertical bow of the chain, in px (0 = straight) */
  curve?: number
}) {
  return (
    <div className="bead-chain">
      {Array.from({ length: count }).map((_, i) => {
        // parabolic offset so the chain bows like a curve
        const t = count > 1 ? i / (count - 1) : 0
        const y = curve * (1 - Math.pow(2 * t - 1, 2))
        return (
          <span
            key={i}
            className="bead"
            style={{ background: GRADS[i % GRADS.length], transform: `translateY(${-y}px)` }}
          />
        )
      })}
    </div>
  )
}
