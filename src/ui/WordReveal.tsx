import { useEffect, useRef } from 'react'
import { gsap, prefersReduced } from '../lib/gsap'

// soft, low-saturation accents — twelvelabs tints only a few words, gently
const PALETTE = [
  '#f0a878',
  '#f3c79a',
  '#ecca8a',
  '#f2a9bb',
  '#c2b6ee',
  '#a9c6ee',
  '#9bd3ba',
]
const BASE = '#c7c5c2'
// which word indices get a colour accent (sparse, like the reference)
const ACCENT_AT = (i: number) => i % 5 === 2

type Props = {
  text: string
  className?: string
  /** words to accent explicitly; falls back to the sparse decorative pattern */
  accentWords?: string[]
  /** scroll distance over which the reveal plays, in viewport heights */
  scrub?: boolean
}

/**
 * twelvelabs signature: a quote whose words fill in from grey → palette colour
 * as the section scrolls through the viewport.
 */
export function WordReveal({ text, className, accentWords }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-word]'))

    const shouldAccent = (word: HTMLElement, index: number) =>
      accentWords?.length
        ? accentWords.includes(word.textContent ?? '')
        : ACCENT_AT(index)

    if (prefersReduced) {
      words.forEach((word, index) => {
        word.style.color = shouldAccent(word, index)
          ? PALETTE[index % PALETTE.length]
          : 'var(--text)'
      })
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
      // a few words pop into a soft palette colour for the multicolour accent
      words.forEach((w, i) => {
        if (shouldAccent(w, i)) {
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
  }, [accentWords, text])

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
