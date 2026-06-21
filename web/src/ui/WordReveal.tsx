import { useEffect, useRef } from 'react'
import { gsap, prefersReduced } from '../lib/gsap'

const PALETTE = [
  'var(--c-orange)',
  'var(--c-peach)',
  'var(--c-amber)',
  'var(--c-rose)',
  'var(--c-lilac)',
  'var(--c-sky)',
  'var(--c-mint)',
]
const BASE = '#c7c5c2'

type Props = {
  text: string
  className?: string
  /** scroll distance over which the reveal plays, in viewport heights */
  scrub?: boolean
}

/**
 * twelvelabs signature: a quote whose words fill in from grey → palette colour
 * as the section scrolls through the viewport.
 */
export function WordReveal({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'))

    if (prefersReduced) {
      words.forEach((w) => (w.style.color = 'var(--text)'))
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(words, { color: BASE })
      gsap.to(words, {
        color: 'var(--text)',
        ease: 'none',
        stagger: 1,
        scrollTrigger: {
          trigger: el,
          start: 'top 78%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
      })
      // a few words pop into palette colour for the multicolour accent
      words.forEach((w, i) => {
        if (i % 3 === 1) {
          gsap.fromTo(
            w,
            { color: BASE },
            {
              color: PALETTE[i % PALETTE.length],
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: el,
                start: 'top 78%',
                end: 'bottom 55%',
                scrub: 0.6,
              },
            },
          )
        }
      })
    }, el)

    return () => ctx.revert()
  }, [text])

  const tokens = text.split(/(\s+)/)
  return (
    <p ref={ref} className={className}>
      {tokens.map((tok, i) =>
        /\s+/.test(tok) ? (
          <span key={i}> </span>
        ) : (
          <span data-word key={i} style={{ transition: 'none' }}>
            {tok}
          </span>
        ),
      )}
    </p>
  )
}
