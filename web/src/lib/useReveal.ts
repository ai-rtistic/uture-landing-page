import { useEffect } from 'react'

/**
 * Reveals `.reveal` elements as they enter the viewport.
 * - Elements entering in the same frame are staggered by vertical position, so
 *   groups (cards, lists, headline lines) cascade instead of popping together.
 * - An explicit `data-delay` overrides the auto-stagger.
 * - GPU hints (`will-change`) and the transition delay are cleared once the
 *   entrance has played, so nothing lingers on the compositor.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }

    const timers = new Set<number>()

    const io = new IntersectionObserver(
      (entries) => {
        const incoming = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        incoming.forEach((entry, i) => {
          const el = entry.target as HTMLElement
          const manual = el.dataset.delay
          const delay = manual != null ? Number(manual) : Math.min(i * 85, 420)
          el.style.transitionDelay = `${delay}ms`
          el.classList.add('is-in')
          io.unobserve(el)
          const t = window.setTimeout(() => {
            el.style.willChange = 'auto'
            el.style.transitionDelay = ''
            timers.delete(t)
          }, delay + 1150)
          timers.add(t)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -12% 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [])
}
