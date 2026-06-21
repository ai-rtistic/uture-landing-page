/**
 * Embeds a Remotion-rendered WebM (self-contained branded panel) full-bleed
 * inside a rounded frame. Use for motion pieces too heavy for CSS/SVG.
 * Render source: motion/ (see uture-spot-graphics skill).
 */
export function MotionGraphic({ src, poster }: { src: string; poster?: string }) {
  return (
    <div className="g-video-frame">
      <video
        className="g-video"
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  )
}
