import { useEffect, useRef, useState } from 'react'
import { prefersReduced } from './gsap'

/** Counts from 0 → value once the element scrolls into view.
 *  reduced-motion이면 카운트업 없이 최종값을 즉시 표기한다. */
export function useCountUp(value: number, decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null)
  const format = (n: number) =>
    n.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  const [display, setDisplay] = useState(() => (prefersReduced ? format(value) : '0'))

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReduced) return
    let done = false

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done) {
            done = true
            const dur = 1500
            const start = performance.now()
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / dur)
              const eased = 1 - Math.pow(1 - t, 3)
              setDisplay(format(value * eased))
              if (t < 1) requestAnimationFrame(tick)
              else setDisplay(format(value))
            }
            requestAnimationFrame(tick)
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, decimals])

  return { ref, display }
}
