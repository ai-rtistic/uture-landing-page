/**
 * Sized placeholder for image/video slots. Shows the required dimensions on
 * the surface so real assets can be dropped in later at the right size.
 * Swap with <img>/<video> using the documented size (see design-system 자산 스펙).
 */
export function Placeholder({
  w,
  h,
  label,
  kind = 'image',
}: {
  w: number
  h: number
  label?: string
  kind?: 'image' | 'video'
}) {
  return (
    <div
      className="ph"
      data-kind={kind}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <span className="ph-grid" aria-hidden />
      <span className="ph-tag mono">
        {kind === 'video' ? '▶ ' : ''}
        {label ? `${label} · ` : ''}
        {w}×{h}
      </span>
    </div>
  )
}
