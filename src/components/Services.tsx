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
const featuredOverlayClassName =
  'bg-[linear-gradient(135deg,rgba(18,28,23,0.22)_0%,rgba(18,28,23,0.46)_38%,rgba(18,28,23,0.9)_100%)]'
const cardShells = [
  'bg-white',
  'bg-[#f3efe7]',
  'bg-sage text-white',
  'bg-[#eef2e8]',
]
const cardTextTones = [
  'text-ink',
  'text-ink',
  'text-white',
  'text-ink',
]
const cardBodyTones = [
  'text-sage/78',
  'text-sage/76',
  'text-white/78',
  'text-sage/76',
]
const cardDetailTones = [
  'border-sage/10 text-sage/64',
  'border-sage/10 text-sage/62',
  'border-white/12 text-white/68',
  'border-sage/10 text-sage/62',
]
const cardNumberTones = [
  'text-sage/38',
  'text-sage/38',
  'text-white/36',
  'text-sage/38',
]
const cardIconShells = [
  'bg-bone text-sage',
  'bg-white text-sage',
  'bg-white/12 text-white',
  'bg-white text-sage',
]

export function Services() {
  const section = useMessages<{ description: string; eyebrow: string; title: string }>('services')
  const cards = Object.values(useMessages<Record<string, ServiceCard>>('services.cards'))
  const [primaryCard, secondaryCard, tertiaryCard, quaternaryCard] = cards
  const spotlightCards = [secondaryCard, tertiaryCard]
  const gridCards = [primaryCard, secondaryCard, tertiaryCard, quaternaryCard]

  return (
    <section className="section-shell" id="services">
      <Container>
        <Reveal mode="immediate">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,0.94fr)_minmax(320px,0.44fr)] xl:items-end">
            <SectionHeading
              className="max-w-[52rem]"
              description={section.description}
              eyebrow={section.eyebrow}
              title={section.title}
            />
            <div className="section-band rounded-[30px] px-5 py-5 sm:px-6">
              <p className="max-w-[24rem] text-sm leading-6 text-sage/72">{primaryCard.detail}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <Reveal delay={0.04}>
            <div className="relative min-h-[560px] overflow-hidden rounded-[40px] shadow-[0_26px_80px_rgba(23,35,28,0.16)] xl:min-h-[660px]">
              <ParallaxMedia overlayClassName={featuredOverlayClassName} speed={34} src="/media/strategy-session.jpg" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,182,138,0.16),transparent_24%)]" />

              <div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-8 xl:p-9">
                <div className="max-w-[20rem] rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/68 backdrop-blur">
                  {section.eyebrow}
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                  <div className="max-w-[27rem] space-y-4">
                    <h3 className="max-w-[10ch] text-[clamp(2.5rem,4.8vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-white">
                      {primaryCard.title}
                    </h3>
                    <p className="max-w-[28rem] text-base leading-7 text-white/84">{primaryCard.description}</p>
                  </div>

                  <div className="grid gap-3 self-end">
                    {spotlightCards.map((card, index) => (
                      <div key={card.title} className="rounded-[26px] border border-white/10 bg-white/10 p-4 backdrop-blur-lg">
                        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/56">
                          {String(index + 2).padStart(2, '0')}
                        </p>
                        <p className="mt-3 text-xl font-semibold leading-[1.08] tracking-[-0.04em] text-white">{card.title}</p>
                        <p className="mt-3 text-sm leading-6 text-white/76">{card.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {gridCards.map((card, index) => {
              const Icon = icons[index]

              return (
                <Reveal key={card.title} delay={0.08 + index * 0.05}>
                  <motion.article
                    className={`flex h-full flex-col justify-between overflow-hidden rounded-[34px] px-5 py-6 shadow-[0_20px_56px_rgba(23,35,28,0.08)] sm:px-6 ${cardShells[index]}`}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-[18px] shadow-soft ${cardIconShells[index]}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className={`font-display text-5xl italic tracking-[-0.05em] ${cardNumberTones[index]}`}>
                        {String(index + 1).padStart(2, '0')}
                      </p>
                    </div>

                    <div className="mt-8">
                      <h3 className={`max-w-[15ch] text-[1.95rem] font-semibold leading-[1.04] tracking-[-0.05em] ${cardTextTones[index]}`}>
                        {card.title}
                      </h3>
                      <p className={`mt-4 max-w-[28rem] text-base leading-7 ${cardBodyTones[index]}`}>{card.description}</p>
                    </div>

                    <div className={`mt-7 border-t pt-4 text-sm leading-6 ${cardDetailTones[index]}`}>{card.detail}</div>
                  </motion.article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
