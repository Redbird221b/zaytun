import { siteConfig } from '../config/site'
import { useMessages, useT } from '../lib/i18n'
import { Container } from './ui/Container'
import { LocaleSwitcher } from './ui/LocaleSwitcher'

type FooterNav = Record<string, string>

export function Footer() {
  const footer = useMessages<{
    contactLabel: string
    description: string
    legal: string
    locationLabel: string
    navigationLabel: string
    phoneLabel: string
  }>('footer')
  const nav = useMessages<FooterNav>('header.nav')
  const t = useT()

  return (
    <footer className="mt-16 pb-8">
      <Container>
        <div className="dark-shell rounded-[40px] px-6 py-8 text-white sm:px-8 sm:py-10">
          <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">{t('header.tagline')}</p>
            <div className="flex flex-wrap items-center gap-3 text-[15px] text-white/72">
              <a className="transition hover:text-white" href={siteConfig.phoneHref}>
                {siteConfig.phoneDisplay}
              </a>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <a className="transition hover:text-white" href={siteConfig.emailHref}>
                {siteConfig.email}
              </a>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_repeat(2,minmax(0,0.7fr))]">
            <div className="space-y-5">
              <div>
                <p className="text-[15px] font-semibold uppercase tracking-[0.3em] text-white">{t('common.brand')}</p>
                <p className="mt-4 max-w-[30rem] text-[15px] leading-7 text-white/74">{footer.description}</p>
              </div>
              <LocaleSwitcher />
            </div>

            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-white/50">{footer.navigationLabel}</p>
              <nav className="mt-4 grid gap-3">
                {Object.entries(nav).map(([key, label]) => (
                  <a key={key} className="text-[15px] text-white/78 transition hover:text-white" href={`#${key}`}>
                    {label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.24em] text-white/50">{footer.contactLabel}</p>
                <a className="mt-4 block text-[15px] text-white/78 transition hover:text-white" href={siteConfig.phoneHref}>
                  {`${footer.phoneLabel}: ${siteConfig.phoneDisplay}`}
                </a>
                <a className="mt-2 block text-[15px] text-white/78 transition hover:text-white" href={siteConfig.emailHref}>
                  {siteConfig.email}
                </a>
                <a className="mt-2 block text-[15px] text-white/78 transition hover:text-white" href={siteConfig.mapHref} rel="noreferrer" target="_blank">
                  {`${footer.locationLabel}: ${siteConfig.location}`}
                </a>
              </div>
              <p className="text-[14px] leading-6 text-white/52">{footer.legal}</p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
