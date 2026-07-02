import { useEffect, useRef } from 'react'
import { prefersReduced } from '../../lib/gsap'

/**
 * 히어로 배경 — 프로스트 글라스 타일 행렬 루프 (examples/TWL_Web_Generate 스타일의
 * 유쳐 재창작, motion/src/TileFlow.tsx에서 렌더).
 * 배경색(#f5f5f5)을 구운 H.264 → iOS 포함 전 기기 재생, 25s 심리스 루프.
 * reduced-motion: 포스터 스틸.
 */
export function HeroTilesVideo() {
  const ref = useRef<HTMLVideoElement>(null)

  // muted autoplay가 미뤄지는 경우(백그라운드 탭 등) 다시 재생을 찔러준다
  useEffect(() => {
    const v = ref.current
    if (!v) return
    const play = () => v.play().catch(() => {})
    play()
    const onVisible = () => document.visibilityState === 'visible' && play()
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  return (
    <div className="hero-tiles" aria-hidden>
      {prefersReduced ? (
        <img src="/assets/motion/hero-tiles-poster.jpg" alt="" />
      ) : (
        <video
          ref={ref}
          src="/assets/motion/hero-tiles.mp4"
          poster="/assets/motion/hero-tiles-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      )}
    </div>
  )
}
