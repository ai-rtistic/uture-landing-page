import { useLenis } from './lib/useLenis'
import { useReveal } from './lib/useReveal'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { PinnedNarrative } from './components/PinnedNarrative'
import { LogoMarquee } from './components/LogoMarquee'
import { Testimonial } from './components/Testimonial'
import { FeatureCards } from './components/FeatureCards'
import { IndustryCards } from './components/IndustryCards'
import { ServiceTabs } from './components/ServiceTabs'
import { CaseQuote } from './components/CaseQuote'
import { GlowCTA } from './components/GlowCTA'
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
        <IndustryCards />
        <ServiceTabs />
        <CaseQuote />
        <GlowCTA />
        <ProcessColumns />
        <StatsStrip />
        <Philosophy />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
