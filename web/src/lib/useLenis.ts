import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger, prefersReduced } from './gsap'

/** Smooth scroll wired into GSAP ScrollTrigger. */
export function useLenis() {
  useEffect(() => {
    if (prefersReduced) return
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // anchor links → lenis scroll
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')!
      if (id.length < 2) return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -80 })
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [])
}
