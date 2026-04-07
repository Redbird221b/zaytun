import { siteConfig } from '../config/site'
import { useMessages } from '../lib/i18n'
import { Button } from './ui/Button'
import { Container } from './ui/Container'
import { ParallaxMedia } from './ui/ParallaxMedia'
import { Reveal } from './ui/Reveal'
import { ArrowIcon } from './ui/icons'

type CtaMessages = {
  body: string
  eyebrow: string
  primary: string
  secondary: string
  title: string
}

const ctaOverlayClassName =
  'bg-[linear-gradient(90deg,rgba(20,32,26,0.9)_0%,rgba(20,32,26,0.78)_42%,rgba(20,32,26,0.42)_76%,rgba(20,32,26,0.62)_100%)]'

export function CtaSection() {
  const cta = useMessages<CtaMessages>('cta')

  return (
    <section className="section-shell pt-10" id="cta">
      <Container>
        <Reveal mode="immediate">
          <div className="relative overflow-hidden rounded-[40px] shadow-[0_30px_90px_rgba(23,35,28,0.14)]">
            <ParallaxMedia
              overlayClassName={ctaOverlayClassName}
              speed={40}
              src="/media/boardroom.jpg"
            />
            <div className="relative z-10 flex flex-col gap-8 px-5 py-8 text-white sm:px-7 sm:py-10 xl:flex-row xl:items-end xl:justify-between xl:px-8 2xl:px-10">
              <div className="space-y-5">
                <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                  {cta.eyebrow}
                </span>
                <h2 className="max-w-[14ch] text-balance text-4xl font-semibold leading-tight tracking-[-0.06em] sm:text-[3.2rem]">
                  {cta.title}
                </h2>
                <p className="max-w-[42rem] text-pretty text-base leading-7 text-white/80 xl:text-[1.04rem]">{cta.body}</p>
              </div>

              <div className="grid gap-3 xl:min-w-[360px] xl:justify-items-end">
                <Button className="min-w-[280px] justify-between !bg-white !text-sage hover:!bg-bone xl:min-w-[340px]" href={siteConfig.primaryCtaHref} icon={<ArrowIcon className="h-4 w-4" />}>
                  {cta.primary}
                </Button>
                <Button className="min-w-[280px] justify-center border-white/10 bg-white/10 text-white hover:bg-white/20 xl:min-w-[340px]" href={siteConfig.phoneHref} variant="ghost">
                  {cta.secondary}
                </Button>
                <div className="flex flex-wrap items-center gap-3 text-sm text-white/72">
                  <a className="transition hover:text-white" href={siteConfig.phoneHref}>
                    {siteConfig.phoneDisplay}
                  </a>
                  <span className="h-1 w-1 rounded-full bg-white/30" />
                  <a className="transition hover:text-white" href={siteConfig.emailHref}>
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
