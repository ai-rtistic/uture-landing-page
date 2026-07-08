import { useLenis } from './lib/useLenis'
import { useReveal } from './lib/useReveal'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { PinnedNarrative } from './components/PinnedNarrative'
import { LogoMarquee } from './components/LogoMarquee'
import { Testimonial } from './components/Testimonial'
import { FeatureCards } from './components/FeatureCards'
import { IndustryCards } from './components/IndustryCards'
// import { ServiceTabs } from './components/ServiceTabs' // 히어로 캐러셀로 흡수 — 복구용 보존
import { ArchitectureTabs } from './components/ArchitectureTabs'
import { CaseQuote } from './components/CaseQuote'
// import { GlowCTA } from './components/GlowCTA' // PblSection으로 대체 — 복구용 보존
import { PblSection } from './components/PblSection'
import { ProcessColumns } from './components/ProcessColumns'
import { StatsStrip } from './components/StatsStrip'
import { Philosophy } from './components/Philosophy'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

export default function App() {
  useLenis()
  useReveal()

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PinnedNarrative />
        <LogoMarquee />
        <Testimonial />
        <FeatureCards />
        {/* 섹션 순서 = 내비 순서 (솔루션 → 고객 사례), 2026-07-08 오너 지시 */}
        {/* ServiceTabs('이렇게 일합니다') — 히어로 쇼케이스 캐러셀로 흡수되어 비활성 (2026-07-07 오너 지시).
            복구하려면 아래 주석 해제. */}
        {/* <ServiceTabs /> */}
        <ArchitectureTabs />
        <IndustryCards />
        <CaseQuote />
        <PblSection />
        <ProcessColumns />
        <StatsStrip />
        <Philosophy />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
