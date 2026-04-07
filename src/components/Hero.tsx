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
  'bg-[linear-gradient(180deg,rgba(17,26,21,0.14)_0%,rgba(17,26,21,0.46)_42%,rgba(17,26,21,0.8)_100%)]'
const heroMobileOverlayClassName =
  'bg-[linear-gradient(180deg,rgba(18,27,23,0.16)_0%,rgba(18,27,23,0.34)_40%,rgba(18,27,23,0.82)_100%)]'

export function Hero() {
  const t = useT()
  const metrics = Object.values(useMessages<Record<string, HeroMetric>>('hero.metrics'))
  const panel = useMessages<HeroPanel>('hero.panel')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section-shell overflow-hidden pb-8 pt-2 sm:pb-10 sm:pt-4" id="hero">
      <Container>
        <div className="relative overflow-hidden rounded-[44px] bg-[#203128] shadow-[0_40px_120px_rgba(23,35,28,0.22)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,182,138,0.16),transparent_24%),linear-gradient(90deg,rgba(22,35,29,0.94)_0%,rgba(35,53,44,0.9)_44%,rgba(35,53,44,0.12)_72%,rgba(35,53,44,0)_100%)]" />
          <div className="absolute inset-y-0 right-0 hidden w-[48%] xl:block">
            <ParallaxMedia
              overlayClassName={heroDesktopOverlayClassName}
              priority
              speed={42}
              src="/media/hero-team.jpg"
            />
          </div>

          <div className="relative z-10 grid min-h-[660px] items-stretch gap-8 px-5 py-6 sm:px-8 sm:py-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(460px,0.92fr)] xl:px-10 xl:py-10 2xl:grid-cols-[minmax(0,1.16fr)_minmax(560px,0.84fr)]">
            <div className="flex flex-col justify-between">
              <div className="space-y-8">
                <Reveal mode="immediate">
                  <span className="eyebrow-inverse">{t('hero.eyebrow')}</span>
                </Reveal>

                <Reveal delay={0.05} mode="immediate">
                  <div className="max-w-[56rem] space-y-5">
                    <h1 className="max-w-[12ch] text-balance text-[clamp(3.35rem,5.8vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-white">
                      {t('hero.titleLine1')}
                      <span className="mt-2 block font-display text-[0.96em] font-semibold italic tracking-[-0.04em] text-[#d7dfc7]">
                        {t('hero.titleLine2')}
                      </span>
                    </h1>
                    <p className="text-pretty max-w-[39rem] text-base leading-7 text-white/88 xl:text-[1.06rem]">
                      {t('hero.subtitle')}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.1} mode="immediate">
                  <div className="flex flex-col items-start gap-4 sm:flex-row">
                    <Button className="!bg-white !text-sage hover:!bg-bone" href={siteConfig.primaryCtaHref} icon={<ArrowIcon className="h-4 w-4" />}>
                      {t('hero.primaryCta')}
                    </Button>
                    <Button className="border-white/10 bg-white/10 text-white hover:bg-white/20" href="#services" variant="ghost">
                      {t('hero.secondaryCta')}
                    </Button>
                  </div>
                </Reveal>

                <Reveal className="xl:hidden" delay={0.14} mode="immediate">
                  <div className="relative min-h-[280px] overflow-hidden rounded-[30px]">
                    <ParallaxMedia
                      overlayClassName={heroMobileOverlayClassName}
                      priority
                      speed={28}
                      src="/media/hero-team.jpg"
                    />
                    <div className="relative flex h-full min-h-[280px] items-end p-4">
                      <div className="max-w-[20rem] rounded-[24px] border border-white/10 bg-white/10 p-4 text-white backdrop-blur-lg">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{panel.badge}</p>
                        <p className="mt-3 text-xl font-semibold leading-[1.08] tracking-[-0.04em] text-white">{panel.title}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.16} mode="immediate">
                <div className="mt-8 grid gap-3 lg:grid-cols-3">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[24px] border border-white/10 bg-white/10 px-4 py-4 text-white/90 backdrop-blur"
                    >
                      <p className="text-[2rem] font-semibold tracking-[-0.05em] text-white">{metric.value}</p>
                      <p className="mt-2 text-[13px] leading-5 text-white/72">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal className="relative hidden xl:block" delay={0.18} mode="immediate">
              <motion.div
                animate={prefersReducedMotion ? undefined : { y: [-5, 7, -5] }}
                className="ml-auto flex h-full w-full max-w-[520px] items-end justify-end"
                transition={{ duration: 11, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="mb-2 mr-2 w-full max-w-[430px] rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(17,28,22,0.54))] p-5 text-white shadow-[0_32px_90px_rgba(12,20,16,0.32)] backdrop-blur-xl">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/65">{panel.badge}</p>
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                      {t('hero.panelStatus')}
                    </span>
                  </div>

                  <h2 className="mt-4 max-w-[12ch] text-balance text-[2.05rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
                    {panel.title}
                  </h2>

                  <div className="mt-6 grid gap-2.5">
                    {panel.items.map((item, index) => (
                      <div
                        key={item.title}
                        className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/10 px-3 py-3"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-xs font-semibold text-sage">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <p className="text-sm font-medium leading-5 text-white/92">{item.title}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[22px] border border-white/10 bg-black/20 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{t('hero.quoteLabel')}</p>
                    <p className="mt-3 text-sm leading-6 text-white/90">{t('hero.quote')}</p>
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
