import { About } from './components/About'
import { CtaSection } from './components/CtaSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HighlightsCarousel } from './components/HighlightsCarousel'
import { Services } from './components/Services'
import { WhyUs } from './components/WhyUs'
import { useT } from './lib/i18n'

function App() {
  const t = useT()

  return (
    <div className="relative overflow-hidden">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-sage focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        href="#main-content"
      >
        {t('accessibility.skipToContent')}
      </a>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(circle_at_top_left,rgba(168,182,138,0.14),transparent_24%),linear-gradient(180deg,#f6f2ec_0%,rgba(255,255,255,0)_100%)]" />
      <div className="pointer-events-none absolute left-[-120px] top-[220px] h-[360px] w-[360px] rounded-full bg-olive/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-120px] top-[540px] h-[320px] w-[320px] rounded-full bg-sage/10 blur-[120px]" />
      <Header />
      <main className="relative z-10" id="main-content">
        <Hero />
        <Services />
        <WhyUs />
        <About />
        <HighlightsCarousel />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
