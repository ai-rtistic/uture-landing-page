import { Placeholder } from './graphics/Placeholder'

/**
 * Floating hero "library" card — uture's analogue of twelvelabs' raw-video-library
 * table. A concrete product-UI spot-graphic anchoring the hero (not just an aura).
 */
const ROWS = [
  { name: '주간 리포트 자동화 에이전트', team: '재무팀', status: '운영중', tone: 'live' },
  { name: 'VOC 분류 파이프라인', team: 'CS팀', status: '운영중', tone: 'live' },
  { name: '회의록 → 액션아이템 봇', team: '전사', status: '운영중', tone: 'live' },
  { name: '견적서 초안 생성기', team: '영업팀', status: '베타', tone: 'beta' },
  { name: '사내 문서 검색 어시스턴트', team: '전사', status: '운영중', tone: 'live' },
  { name: '정산 데이터 검증 자동화', team: '재무팀', status: '구축중', tone: 'wip' },
]

export function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden>
      <div className="hv-card">
        <div className="hv-row hv-head">
          <span>사내 도구</span>
          <span>팀</span>
          <span className="hv-col-status">상태</span>
        </div>
        {ROWS.map((r) => (
          <div className="hv-row" key={r.name}>
            <span className="hv-thumb">
              <Placeholder w={40} h={28} />
            </span>
            <span className="hv-name">{r.name}</span>
            <span className="hv-team">{r.team}</span>
            <span className={`tag hv-status hv-${r.tone}`}>{r.status}</span>
          </div>
        ))}
      </div>
      <span className="tag hv-cap mono">사내 AX 도입 현황</span>
    </div>
  )
}
