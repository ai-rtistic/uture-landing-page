import { stats } from '../data/content'
import { Container } from '../ui/primitives'
import { useCountUp } from '../lib/useCountUp'

function Stat({
  value,
  suffix,
  label,
  decimals,
}: {
  value: number
  suffix: string
  label: string
  decimals?: number
}) {
  const { ref, display } = useCountUp(value, decimals ?? 0)
  return (
    <div className="stat reveal">
      <div className="stat-num geist">
        <span ref={ref}>{display}</span>
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export function StatsStrip() {
  return (
    <section className="section stats-strip">
      <Container>
        <div className="stats-grid">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
        <p className="stats-note reveal">2026년 상반기 기준 · 교육 · 프로젝트 누적 집계</p>
      </Container>
    </section>
  )
}
