import { useEffect, useRef } from 'react'
import { prefersReduced } from '../../lib/gsap'

/**
 * 히어로 배경 — Remotion으로 렌더한 글라스 체인 루프 영상.
 * 페이지 배경(#f5f5f5)을 구운 H.264 MP4 → iOS 포함 전 기기 재생, 런타임 비용 0.
 * 산출물 태그는 DOM 오버레이(영상 위) — 한글이 압축에 뭉개지지 않게.
 * reduced-motion: 영상 대신 포스터 스틸.
 */
export function HeroChainVideo() {
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
    <div className="hero-chain" aria-hidden>
      {prefersReduced ? (
        <img src="/assets/motion/hero-chain-poster.jpg" alt="" />
      ) : (
        <video
          ref={ref}
          src="/assets/motion/hero-chain.mp4"
          poster="/assets/motion/hero-chain-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      )}
      {/* 체인에 매달린 산출물 태그 — 타임스탬프 문법의 유쳐 번역 */}
      <span className="fc-tag" style={{ left: '48%', top: '62%' }}>
        <span className="fc-thumb">
          <i />
          <i />
          <i className="is-accent" />
        </span>
        <em />
        <span className="tag mono">주간 리포트 · 자동 발송</span>
      </span>
    </div>
  )
}
