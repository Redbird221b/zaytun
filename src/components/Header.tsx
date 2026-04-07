import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { siteConfig } from '../config/site'
import { useMessages, useT } from '../lib/i18n'
import { Button } from './ui/Button'
import { Container } from './ui/Container'
import { LocaleSwitcher } from './ui/LocaleSwitcher'
import { ArrowIcon } from './ui/icons'

type NavItems = Record<string, string>

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const nav = useMessages<NavItems>('header.nav')
  const t = useT()

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <Container className="space-y-2">
        <div className="hidden items-center justify-between rounded-[22px] border border-white/10 bg-sage px-6 py-2.5 text-white shadow-[0_18px_40px_rgba(23,35,28,0.18)] xl:flex">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/72">{t('header.tagline')}</p>
          <div className="flex items-center gap-4 text-[12px] text-white/78">
            <a className="transition hover:text-white" href={siteConfig.phoneHref}>
              {siteConfig.phoneDisplay}
            </a>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <a className="transition hover:text-white" href={siteConfig.emailHref}>
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="flex min-h-[88px] items-center justify-between gap-5 rounded-[30px] border border-white/70 bg-white/95 px-4 shadow-[0_26px_80px_rgba(25,37,31,0.12)] backdrop-blur-xl sm:px-5 lg:px-6 xl:min-h-[94px]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-sage/10 bg-bone text-sm font-semibold tracking-[0.24em] text-sage shadow-soft xl:h-12 xl:w-12">
              {t('common.brandShort')}
            </div>
            <div>
              <a className="block whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.28em] text-ink xl:text-[12px]" href="#hero">
                {t('common.brand')}
              </a>
              <p className="max-w-[12rem] text-[11px] leading-4 text-sage/60 xl:text-[12px]">{t('header.tagline')}</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 xl:flex 2xl:gap-7">
            {Object.entries(nav).map(([key, label]) => (
              <a
                key={key}
                className="whitespace-nowrap text-[14px] font-medium text-sage/72 transition hover:text-ink"
                href={`#${key}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              className="whitespace-nowrap rounded-full border border-sage/10 bg-bone px-4 py-3 text-[13px] font-medium text-sage shadow-soft transition hover:text-ink xl:px-5"
              href={siteConfig.phoneHref}
            >
              {siteConfig.phoneDisplay}
            </a>
            <LocaleSwitcher />
            <Button className="whitespace-nowrap px-6 text-[13px] xl:px-7" href={siteConfig.primaryCtaHref} icon={<ArrowIcon className="h-4 w-4" />} variant="primary">
              {t('header.cta')}
            </Button>
          </div>

          <button
            aria-expanded={isMenuOpen}
            aria-label={t('accessibility.header.toggleMenu')}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-sage/10 bg-bone text-sage shadow-soft lg:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            type="button"
          >
            <span className="sr-only">{t('accessibility.header.toggleMenu')}</span>
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </Container>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }}
            className="mx-3 mt-3 overflow-hidden rounded-[28px] border border-white/70 bg-white/90 shadow-[0_24px_80px_rgba(25,37,31,0.12)] backdrop-blur xl:hidden sm:mx-4"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Container className="flex flex-col gap-5 py-5">
              <nav className="flex flex-col gap-3">
                {Object.entries(nav).map(([key, label]) => (
                  <a
                    key={key}
                    className="rounded-2xl border border-sage/10 bg-bone/70 px-4 py-3 text-sm font-medium text-sage shadow-soft"
                    href={`#${key}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <LocaleSwitcher className="w-fit" />
                <Button href={siteConfig.primaryCtaHref} icon={<ArrowIcon className="h-4 w-4" />}>
                  {t('header.cta')}
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
