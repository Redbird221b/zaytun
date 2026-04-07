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
const activeThumbOverlayClassName =
  'bg-[linear-gradient(180deg,rgba(18,27,23,0.18)_0%,rgba(18,27,23,0.72)_100%)]'
const idleThumbOverlayClassName =
  'bg-[linear-gradient(180deg,rgba(18,27,23,0.28)_0%,rgba(18,27,23,0.86)_100%)]'
const lazyLoadingValue = 'lazy'

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
            className="mt-8 overflow-hidden rounded-[40px] bg-[#17241d] shadow-[0_32px_100px_rgba(23,35,28,0.18)]"
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
            <div className="grid xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
              <div className="relative min-h-[460px] overflow-hidden xl:min-h-[620px]">
                <ParallaxMedia overlayClassName={highlightsOverlayClassName} speed={38} src={currentMedia} />

                <AnimatePresence custom={direction} initial={false} mode="wait">
                  <motion.div
                    key={currentSlide.title}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className="relative flex h-full min-h-[460px] items-end p-5 text-white sm:p-8 xl:min-h-[620px] xl:p-10"
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
                    <div className="max-w-[36rem] rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(18,27,23,0.58))] p-5 backdrop-blur-lg sm:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">{currentSlide.category}</p>
                      <h3 className="mt-4 max-w-[11ch] text-balance text-[clamp(2.5rem,4.2vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-white">
                        {currentSlide.title}
                      </h3>
                      <p className="mt-4 max-w-[34rem] text-base leading-7 text-white/82 xl:text-[1.04rem]">{currentSlide.body}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-6 px-5 py-6 text-white sm:px-6 sm:py-7 xl:px-8 xl:py-8">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-white/12">
                    <motion.div
                      animate={{ width: `${(progress || (prefersReducedMotion ? 1 : 0)) * 100}%` }}
                      className="h-full rounded-full bg-gradient-to-r from-[#d7dfc7] via-olive to-white"
                      transition={{ duration: 0.12, ease: 'linear' }}
                    />
                  </div>
                  <button
                    aria-label={t('accessibility.carousel.previous')}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
                    onClick={goToPrevious}
                    type="button"
                  >
                    <ArrowIcon className="h-4 w-4 rotate-180" />
                  </button>
                  <button
                    aria-label={t('accessibility.carousel.next')}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white text-sage transition hover:bg-bone"
                    onClick={goToNext}
                    type="button"
                  >
                    <ArrowIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/52">{t('highlights.label')}</p>
                    <p className="mt-3 text-sm text-white/68">
                      {t('accessibility.carousel.slideStatus', {
                        current: activeIndex + 1,
                        total: slides.length,
                      })}
                    </p>
                  </div>
                  <span className="font-display text-5xl italic tracking-[-0.05em] text-white/22">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                </div>

                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={`${currentSlide.title}-details`}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    initial={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/52">{currentSlide.statLabel}</p>
                    <p className="mt-3 text-[2.7rem] font-semibold tracking-[-0.06em] text-white">{currentSlide.statValue}</p>
                    <p className="mt-4 max-w-[28rem] text-sm leading-6 text-white/74">{currentSlide.detail}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {currentSlide.points.map((point) => (
                        <span key={point} className="inline-flex rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm text-white/84">
                          {point}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                      <span>{currentSlide.cta}</span>
                      <ArrowIcon className="h-4 w-4" />
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="grid gap-3 sm:grid-cols-2">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.title}
                      aria-label={t('accessibility.carousel.goToSlide', { index: index + 1 })}
                      className={`group relative overflow-hidden rounded-[24px] border text-left transition ${
                        index === activeIndex ? 'border-white/18 shadow-[0_20px_48px_rgba(12,20,16,0.2)]' : 'border-white/8'
                      }`}
                      onClick={() => goToSlide(index)}
                      type="button"
                    >
                      <div className="absolute inset-0">
                        <img
                          alt=""
                          aria-hidden={true}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading={lazyLoadingValue}
                          src={slideMedia[index] ?? slideMedia[0]}
                        />
                        <div className={`absolute inset-0 ${index === activeIndex ? activeThumbOverlayClassName : idleThumbOverlayClassName}`} />
                      </div>
                      <div className="relative min-h-[140px] p-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/56">{slide.category}</p>
                        <p className="mt-3 max-w-[14ch] text-sm font-semibold leading-5 tracking-[-0.02em] text-white">{slide.title}</p>
                      </div>
                    </button>
                  ))}
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
