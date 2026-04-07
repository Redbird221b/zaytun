import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useEffectEvent, useState } from 'react'
import { useMessages, useT } from '../lib/i18n'
import { Container } from './ui/Container'
import { ParallaxMedia } from './ui/ParallaxMedia'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { ArrowIcon } from './ui/icons'

type HighlightSlide = {
  body: string
  category: string
  cta: string
  detail: string
  points: string[]
  statLabel: string
  statValue: string
  title: string
}

type HighlightSection = {
  description: string
  eyebrow: string
  title: string
}

const autoplayDuration = 6800
const slideMedia = [
  '/media/hero-team.jpg',
  '/media/strategy-session.jpg',
  '/media/architecture.jpg',
  '/media/boardroom.jpg',
]
const highlightsOverlayClassName =
  'bg-[linear-gradient(180deg,rgba(18,27,23,0.12)_0%,rgba(18,27,23,0.34)_38%,rgba(18,27,23,0.84)_100%)]'

export function HighlightsCarousel() {
  const section = useMessages<HighlightSection>('highlights')
  const slides = Object.values(useMessages<Record<string, HighlightSlide>>('highlights.slides'))
  const t = useT()
  const prefersReducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goToSlide = (nextIndex: number) => {
    setDirection(nextIndex > activeIndex ? 1 : -1)
    setActiveIndex(nextIndex)
    setProgress(0)
  }

  const goToNext = () => {
    setDirection(1)
    setActiveIndex((current) => (current + 1) % slides.length)
    setProgress(0)
  }

  const advanceSlide = useEffectEvent(() => {
    goToNext()
  })

  const goToPrevious = () => {
    setDirection(-1)
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length)
    setProgress(0)
  }

  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      return
    }

    let lastTimestamp = performance.now()
    const intervalId = window.setInterval(() => {
      const currentTimestamp = performance.now()
      const delta = currentTimestamp - lastTimestamp
      lastTimestamp = currentTimestamp

      let shouldAdvance = false

      setProgress((current) => {
        const next = current + delta / autoplayDuration
        if (next >= 1) {
          shouldAdvance = true
          return 0
        }

        return next
      })

      if (shouldAdvance) {
        advanceSlide()
      }
    }, 120)

    return () => window.clearInterval(intervalId)
  }, [activeIndex, isPaused, prefersReducedMotion, slides.length])

  const currentSlide = slides[activeIndex]
  const currentMedia = slideMedia[activeIndex] ?? slideMedia[0]

  return (
    <section className="section-shell overflow-hidden" id="highlights">
      <Container>
        <Reveal mode="immediate">
          <SectionHeading
            className="max-w-[62rem]"
            description={section.description}
            eyebrow={section.eyebrow}
            title={section.title}
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div
            aria-label={t('accessibility.carousel.region')}
            aria-roledescription={t('accessibility.carousel.role')}
            className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_minmax(360px,0.88fr)]"
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsPaused(false)
              }
            }}
            onFocusCapture={() => setIsPaused(true)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight') {
                goToNext()
              }

              if (event.key === 'ArrowLeft') {
                goToPrevious()
              }
            }}
            tabIndex={0}
          >
            <div className="relative min-h-[460px] overflow-hidden rounded-[40px] shadow-[0_28px_90px_rgba(23,35,28,0.14)] xl:min-h-[560px]">
              <ParallaxMedia
                overlayClassName={highlightsOverlayClassName}
                speed={38}
                src={currentMedia}
              />

              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.div
                  key={currentSlide.title}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className="relative flex h-full min-h-[460px] items-end p-6 text-white sm:p-8 xl:min-h-[560px]"
                  custom={direction}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -48 : 48, scale: 0.98 }}
                  initial={{ opacity: 0, x: direction > 0 ? 48 : -48, scale: 0.98 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) {
                      goToNext()
                    }

                    if (info.offset.x > 80) {
                      goToPrevious()
                    }
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="max-w-[34rem] rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(18,27,23,0.56))] p-5 backdrop-blur-lg">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">{currentSlide.category}</p>
                    <h3 className="mt-4 max-w-[12ch] text-balance text-[clamp(2.4rem,3.8vw,4.3rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-white">
                      {currentSlide.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-white/82 xl:text-[1.05rem]">
                      {currentSlide.body}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-bone">
                  <motion.div
                    animate={{ width: `${(progress || (prefersReducedMotion ? 1 : 0)) * 100}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-[#d7dfc7] via-olive to-sage"
                    transition={{ duration: 0.12, ease: 'linear' }}
                  />
                </div>
                <button
                  aria-label={t('accessibility.carousel.previous')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-sage/10 bg-white text-sage shadow-soft transition hover:bg-bone"
                  onClick={goToPrevious}
                  type="button"
                >
                  <ArrowIcon className="h-4 w-4 rotate-180" />
                </button>
                <button
                  aria-label={t('accessibility.carousel.next')}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-sage/10 bg-sage text-white shadow-soft transition hover:bg-[#405148]"
                  onClick={goToNext}
                  type="button"
                >
                  <ArrowIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="bg-white/72 p-6 shadow-[0_18px_44px_rgba(23,35,28,0.06)] backdrop-blur">
                <div className="flex items-end gap-3 text-sage">
                  <span className="font-display text-5xl italic tracking-[-0.05em] text-sage/25">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="pb-2 text-sm text-sage/55">
                    {t('accessibility.carousel.slideStatus', {
                      current: activeIndex + 1,
                      total: slides.length,
                    })}
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sage/45">{t('highlights.label')}</p>
                  {slides.map((slide, index) => (
                    <button
                      key={slide.title}
                      aria-label={t('accessibility.carousel.goToSlide', { index: index + 1 })}
                      className={`w-full border px-4 py-4 text-left transition ${
                        index === activeIndex
                          ? 'border-sage/15 bg-sage text-white shadow-[0_18px_40px_rgba(26,38,31,0.12)]'
                          : 'border-sage/10 bg-white text-sage/80 hover:bg-bone/70'
                      }`}
                      onClick={() => goToSlide(index)}
                      type="button"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-60">{slide.category}</p>
                      <p className="mt-2 text-sm font-semibold tracking-[-0.02em]">{slide.title}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-sage p-6 text-white shadow-[0_22px_60px_rgba(23,35,28,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/55">{currentSlide.statLabel}</p>
                <p className="mt-3 text-[2.65rem] font-semibold tracking-[-0.06em] text-white">{currentSlide.statValue}</p>
                <p className="mt-4 text-sm leading-6 text-white/76">{currentSlide.detail}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {currentSlide.points.map((point) => (
                    <span key={point} className="inline-flex border border-white/10 bg-white/10 px-3 py-2 text-sm text-white/86">
                      {point}
                    </span>
                  ))}
                </div>
                <div className="mt-5 inline-flex items-center gap-2 border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold">
                  <span>{currentSlide.cta}</span>
                  <ArrowIcon className="h-4 w-4" />
                </div>
              </div>
            </div>

            <p aria-live="polite" className="sr-only">
              {t('accessibility.carousel.slideStatus', {
                current: activeIndex + 1,
                total: slides.length,
              })}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
