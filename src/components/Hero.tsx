import { motion, useReducedMotion } from 'framer-motion'
import { siteConfig } from '../config/site'
import { useMessages, useT } from '../lib/i18n'
import { Button } from './ui/Button'
import { Container } from './ui/Container'
import { ParallaxMedia } from './ui/ParallaxMedia'
import { Reveal } from './ui/Reveal'
import { ArrowIcon } from './ui/icons'

type HeroMetric = {
  label: string
  value: string
}

type HeroPanel = {
  badge: string
  items: Array<{ description: string; title: string }>
  title: string
}

const heroDesktopOverlayClassName =
  'bg-[linear-gradient(90deg,rgba(18,28,23,0.98)_0%,rgba(18,28,23,0.94)_38%,rgba(18,28,23,0.58)_62%,rgba(18,28,23,0.36)_100%)]'

export function Hero() {
  const t = useT()
  const metrics = Object.values(useMessages<Record<string, HeroMetric>>('hero.metrics'))
  const panel = useMessages<HeroPanel>('hero.panel')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section-shell overflow-hidden pb-8 pt-2 sm:pb-10 sm:pt-4" id="hero">
      <Container>
        <div className="relative overflow-hidden rounded-[42px] shadow-[0_40px_120px_rgba(23,35,28,0.18)]">
          <ParallaxMedia overlayClassName={heroDesktopOverlayClassName} priority speed={40} src="/media/hero-team.jpg" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,182,138,0.18),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0)_40%)]" />

          <div className="relative z-10 grid min-h-[600px] gap-8 px-5 py-6 sm:px-7 sm:py-7 xl:grid-cols-[minmax(0,1.16fr)_400px] xl:px-8 xl:py-8 2xl:grid-cols-[minmax(0,1.2fr)_440px] 2xl:px-10 2xl:py-10">
            <div className="flex flex-col justify-between">
              <div className="max-w-[46rem] space-y-7">
                <Reveal mode="immediate">
                  <span className="eyebrow-inverse">{t('hero.eyebrow')}</span>
                </Reveal>

                <Reveal delay={0.05} mode="immediate">
                  <div className="space-y-5">
                    <h1 className="max-w-[10.5ch] text-balance text-[clamp(2.95rem,5vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-white">
                      {t('hero.titleLine1')}
                      <span className="mt-2 block font-display text-[0.92em] font-semibold italic tracking-[-0.04em] text-[#d7dfc7]">
                        {t('hero.titleLine2')}
                      </span>
                    </h1>
                    <p className="text-pretty max-w-[35rem] text-[1.02rem] leading-7 text-white/90 xl:text-[1.08rem] xl:text-white/88">
                      {t('hero.subtitle')}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.1} mode="immediate">
                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                    <Button
                      className="!bg-white !text-sage hover:!bg-bone"
                      href={siteConfig.primaryCtaHref}
                      icon={<ArrowIcon className="h-4 w-4" />}
                    >
                      {t('hero.primaryCta')}
                    </Button>
                    <Button className="border-white/10 bg-white/10 text-white hover:bg-white/20" href="#services" variant="ghost">
                      {t('hero.secondaryCta')}
                    </Button>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.14} mode="immediate">
                <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-black/25 backdrop-blur-xl">
                  <div className="grid gap-0 md:grid-cols-3">
                    {metrics.map((metric, index) => (
                      <div
                        key={metric.label}
                        className={`border-white/10 px-5 py-4 text-white/88 ${index < metrics.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''}`}
                      >
                        <p className="text-[1.85rem] font-semibold tracking-[-0.05em] text-white">{metric.value}</p>
                        <p className="mt-2 max-w-[16rem] text-[13px] leading-5 text-white/76">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal className="relative" delay={0.18} mode="immediate">
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [-4, 6, -4] }}
                className="flex h-full w-full items-end xl:justify-end"
                transition={{ duration: 10, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="w-full rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(18,28,23,0.64))] p-5 text-white shadow-[0_32px_90px_rgba(12,20,16,0.28)] backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">{panel.badge}</p>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                      {t('hero.panelStatus')}
                    </span>
                  </div>

                  <h2 className="mt-4 max-w-[12ch] text-balance text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
                    {panel.title}
                  </h2>

                  <div className="mt-6 space-y-3">
                    {panel.items.map((item, index) => (
                      <div key={item.title} className="flex items-start gap-3 border-t border-white/10 py-3 first:border-t-0 first:pt-0 last:pb-0">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-xs font-semibold text-sage">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div>
                          <p className="text-sm font-semibold leading-5 text-white">{item.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/56">{t('hero.quoteLabel')}</p>
                    <p className="mt-3 text-sm leading-6 text-white/86">{t('hero.quote')}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
