type IconName = 'target' | 'people' | 'build' | 'cloud' | 'flow' | 'search'

const paths: Record<IconName, JSX.Element> = {
  target: (
    <>
      <circle cx="20" cy="20" r="14" />
      <circle cx="20" cy="20" r="7.5" />
      <circle cx="20" cy="20" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  people: (
    <>
      <circle cx="14.5" cy="16" r="4.5" />
      <circle cx="26" cy="17.5" r="3.6" />
      <path d="M7 30c0-4.4 3.4-7.5 7.5-7.5S22 25.6 22 30" />
      <path d="M23.5 29.5c0-3.2 2-5.5 5-5.5s5 2 5 5" />
    </>
  ),
  build: (
    <>
      <path d="M16 12l-7 8 7 8" />
      <path d="M24 12l7 8-7 8" />
      <path d="M22 9l-4 22" />
    </>
  ),
  cloud: (
    <>
      <path d="M13 27a6 6 0 0 1-.4-12A8 8 0 0 1 28 16.5a5.5 5.5 0 0 1 .5 11H13z" />
      <path d="M20 30v-9M20 21l-3.2 3.2M20 21l3.2 3.2" />
    </>
  ),
  flow: (
    <>
      <rect x="7" y="14" width="10" height="12" rx="2" />
      <rect x="23" y="14" width="10" height="12" rx="2" />
      <path d="M17 20h6" />
    </>
  ),
  search: (
    <>
      <circle cx="18" cy="18" r="9" />
      <path d="M25 25l7 7" />
    </>
  ),
}

export function Icon({ name, size = 40 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  )
}
