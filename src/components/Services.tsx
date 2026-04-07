import { motion } from 'framer-motion'
import { useMessages } from '../lib/i18n'
import { Container } from './ui/Container'
import { ParallaxMedia } from './ui/ParallaxMedia'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { GovernanceIcon, GrowthIcon, StructuringIcon, TreasuryIcon } from './ui/icons'

type ServiceCard = {
  description: string
  detail: string
  title: string
}

const icons = [StructuringIcon, TreasuryIcon, GrowthIcon, GovernanceIcon]
const servicesOverlayClassName =
  'bg-[linear-gradient(180deg,rgba(21,31,26,0.12)_0%,rgba(21,31,26,0.3)_40%,rgba(21,31,26,0.88)_100%)]'

export function Services() {
  const section = useMessages<{ description: string; eyebrow: string; title: string }>('services')
  const cards = Object.values(useMessages<Record<string, ServiceCard>>('services.cards'))
  const [featuredCard, secondCard, thirdCard, fourthCard] = cards

  return (
    <section className="section-shell" id="services">
      <Container>
        <Reveal mode="immediate">
          <SectionHeading
            className="max-w-[62rem]"
            description={section.description}
            eyebrow={section.eyebrow}
            title={section.title}
          />
        </Reveal>

        <div className="mt-8 grid gap-4 2xl:grid-cols-[minmax(0,1.15fr)_minmax(520px,0.85fr)] xl:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
          <Reveal delay={0.02}>
            <motion.article
              className="group dark-shell relative flex h-full flex-col justify-between overflow-hidden rounded-[34px] px-6 py-6 shadow-card sm:px-7 sm:py-7"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white/70 via-olive/70 to-transparent" />
              <div className="flex items-start justify-between gap-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-white/10 text-white shadow-soft transition group-hover:bg-white group-hover:text-sage">
                  <StructuringIcon className="h-6 w-6" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                  {String(1).padStart(2, '0')}
                </p>
              </div>

              <div className="mt-8 max-w-[38rem] space-y-4">
                <h3 className="max-w-[14ch] text-[clamp(2.3rem,4.3vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.06em] text-white">
                  {featuredCard.title}
                </h3>
                <p className="max-w-[38rem] text-base leading-7 text-white/80">
                  {featuredCard.description}
                </p>
              </div>

              <div className="mt-8 rounded-[24px] border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white/75">
                {featuredCard.detail}
              </div>
            </motion.article>
          </Reveal>

          <Reveal delay={0.08}>
            <motion.article
              className="relative min-h-[340px] overflow-hidden rounded-[34px] shadow-card"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
            >
              <ParallaxMedia
                overlayClassName={servicesOverlayClassName}
                speed={34}
                src="/media/strategy-session.jpg"
              />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white/70 via-olive/70 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6 text-white sm:p-7">
                <div className="max-w-[23rem] rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/60">
                    {String(2).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 text-[2rem] font-semibold leading-[1.06] tracking-[-0.05em] text-white">
                    {secondCard.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/80">{secondCard.detail}</p>
                </div>
              </div>
            </motion.article>
          </Reveal>

          <div className="grid gap-4 xl:col-span-2 lg:grid-cols-3">
            {[thirdCard, fourthCard].map((card, index) => {
              const cardIndex = index + 3
              const Icon = icons[cardIndex - 1]

              return (
                <Reveal key={card.title} delay={0.14 + index * 0.06}>
                  <motion.article
                    className="group premium-card relative h-full overflow-hidden rounded-[32px] px-6 py-6 shadow-card"
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-olive/60 via-sage/80 to-transparent" />
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bone text-sage shadow-soft transition group-hover:bg-sage group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sage/50">
                        {String(cardIndex).padStart(2, '0')}
                      </p>
                    </div>
                    <div className="mt-6 space-y-4">
                      <h3 className="max-w-[16ch] text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.05em] text-ink">
                        {card.title}
                      </h3>
                      <p className="text-sm leading-6 text-sage/75">{card.detail}</p>
                    </div>
                  </motion.article>
                </Reveal>
              )
            })}

            <Reveal delay={0.24}>
              <div className="premium-card flex h-full flex-col justify-between rounded-[32px] px-6 py-7 shadow-card">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bone text-sage shadow-soft">
                    <TreasuryIcon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-sage/50">
                    {String(2).padStart(2, '0')}
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="max-w-[16ch] text-[1.85rem] font-semibold leading-[1.08] tracking-[-0.05em] text-ink">
                    {secondCard.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-sage/80">
                    {secondCard.description}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
