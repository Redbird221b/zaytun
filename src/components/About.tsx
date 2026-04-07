import { motion } from 'framer-motion'
import { useMessages, useT } from '../lib/i18n'
import { Container } from './ui/Container'
import { ParallaxMedia } from './ui/ParallaxMedia'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

type AboutCard = {
  description: string
  title: string
}

const aboutOverlayClassName =
  'bg-[linear-gradient(180deg,rgba(18,26,21,0.12)_0%,rgba(18,26,21,0.34)_36%,rgba(18,26,21,0.82)_100%)]'

export function About() {
  const section = useMessages<{ description: string; eyebrow: string; title: string }>('about')
  const cards = Object.values(useMessages<Record<string, AboutCard>>('about.cards'))
  const t = useT()

  return (
    <section className="section-shell" id="about">
      <Container>
        <div className="grid gap-6 2xl:grid-cols-[minmax(560px,0.9fr)_minmax(0,1.1fr)] xl:grid-cols-[minmax(480px,0.96fr)_minmax(0,1.04fr)] xl:items-start">
          <Reveal mode="immediate">
            <div className="relative min-h-[460px] overflow-hidden rounded-[38px] shadow-[0_28px_80px_rgba(23,35,28,0.12)] xl:min-h-[520px]">
              <ParallaxMedia
                overlayClassName={aboutOverlayClassName}
                speed={44}
                src="/media/architecture.jpg"
              />
              <div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-8">
                <SectionHeading
                  className="max-w-[34rem]"
                  description={section.description}
                  eyebrow={section.eyebrow}
                  title={section.title}
                  tone="inverse"
                />
                <div className="max-w-[29rem] rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">{t('about.statementLabel')}</p>
                  <p className="mt-4 text-pretty text-[1.55rem] leading-[1.32] text-white/90 sm:text-[1.8rem]">
                    {t('about.statement')}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-1">
            {cards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.08}>
                <motion.article
                  className={`relative overflow-hidden rounded-[30px] px-6 py-6 shadow-[0_18px_44px_rgba(23,35,28,0.08)] ${
                    index === 1 ? 'bg-sage text-white' : 'bg-white/80 backdrop-blur'
                  }`}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 4 }}
                >
                  <div className={`absolute left-0 top-8 h-14 w-1 rounded-r-full ${index === 1 ? 'bg-gradient-to-b from-white via-olive to-olive' : 'bg-gradient-to-b from-olive to-sage'}`} />
                  <div className="pl-5">
                    <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${index === 1 ? 'text-white/50' : 'text-sage/50'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className={`mt-4 text-2xl font-semibold tracking-[-0.04em] ${index === 1 ? 'text-white' : 'text-ink'}`}>{card.title}</h3>
                    <p className={`mt-4 max-w-[34rem] text-base leading-7 ${index === 1 ? 'text-white/70' : 'text-sage/80'}`}>{card.description}</p>
                  </div>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
