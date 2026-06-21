// Tiny 16px line icons used inside spot-graphics (nodes, tiles).
type GIconName =
  | 'search'
  | 'play'
  | 'audio'
  | 'video'
  | 'image'
  | 'text'
  | 'sparkle'
  | 'gear'
  | 'target'
  | 'build'
  | 'flow'

const P: Record<GIconName, JSX.Element> = {
  search: (
    <>
      <circle cx="7" cy="7" r="4" />
      <path d="M10 10l4 4" />
    </>
  ),
  play: <path d="M6 4l6 4-6 4z" fill="currentColor" stroke="none" />,
  audio: (
    <>
      <path d="M3 6h2l3-2.5v9L5 10H3z" />
      <path d="M11 6c1 1.2 1 3.8 0 5" />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="4" width="8" height="8" rx="1.5" />
      <path d="M10.5 7l3-1.5v5L10.5 9z" />
    </>
  ),
  image: (
    <>
      <rect x="2.5" y="3.5" width="11" height="9" rx="1.5" />
      <circle cx="6" cy="7" r="1.2" />
      <path d="M4 12l3-3 3 2.5 2-2 1.5 1.5" />
    </>
  ),
  text: (
    <>
      <path d="M3 4.5h10M3 8h10M3 11.5h6" />
    </>
  ),
  sparkle: (
    <path
      d="M8 2l1.3 3.7L13 7l-3.7 1.3L8 12l-1.3-3.7L3 7l3.7-1.3z"
      fill="currentColor"
      stroke="none"
    />
  ),
  gear: (
    <>
      <circle cx="8" cy="8" r="2.2" />
      <path d="M8 1.5v2M8 12.5v2M14.5 8h-2M3.5 8h-2M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4M12.6 12.6l-1.4-1.4M4.8 4.8L3.4 3.4" />
    </>
  ),
  target: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <circle cx="8" cy="8" r="2.4" />
    </>
  ),
  build: (
    <>
      <path d="M6 4L2.5 8 6 12" />
      <path d="M10 4l3.5 4L10 12" />
    </>
  ),
  flow: (
    <>
      <rect x="2" y="6" width="4.5" height="4" rx="1" />
      <rect x="9.5" y="6" width="4.5" height="4" rx="1" />
      <path d="M6.5 8h3" />
    </>
  ),
}

export function GIcon({ name, size = 14 }: { name: GIconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {P[name]}
    </svg>
  )
}

export type { GIconName }
