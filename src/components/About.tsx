import { motion } from 'framer-motion'
import { useMessages, useT } from '../lib/i18n'
import { Container } from './ui/Container'
import { ParallaxMedia } from './ui/ParallaxMedia'
import { Reveal } from './ui/Reveal'

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
        <div className="grid gap-8 xl:grid-cols-[minmax(500px,0.98fr)_minmax(0,1.02fr)] xl:items-center">
          <Reveal mode="immediate">
            <div className="relative min-h-[460px] overflow-hidden rounded-[38px] shadow-[0_28px_80px_rgba(23,35,28,0.12)] xl:min-h-[580px]">
              <ParallaxMedia overlayClassName={aboutOverlayClassName} speed={44} src="/media/architecture.jpg" />
              <div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-8">
                <div className="max-w-[14rem] rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/68 backdrop-blur">
                  {section.eyebrow}
                </div>
                <div className="max-w-[32rem] space-y-4">
                  <h2 className="text-balance text-[clamp(2.45rem,4vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-white">
                    {section.title}
                  </h2>
                  <p className="max-w-[30rem] text-base leading-7 text-white/78 xl:text-[1.02rem]">{section.description}</p>
                </div>
                <div className="max-w-[29rem] rounded-[26px] border border-white/10 bg-white/10 p-5 backdrop-blur-lg">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">{t('about.statementLabel')}</p>
                  <p className="mt-4 text-pretty text-[1.55rem] leading-[1.32] text-white/90 sm:text-[1.8rem]">
                    {t('about.statement')}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="section-band overflow-hidden rounded-[38px]">
            {cards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.08}>
                <motion.article
                  className={`grid gap-4 border-b border-sage/10 px-5 py-6 last:border-b-0 sm:px-6 xl:grid-cols-[72px_minmax(0,1fr)] xl:px-7 ${index === 1 ? 'bg-sage text-white' : ''}`}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 4 }}
                >
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-[0.26em] ${index === 1 ? 'text-white/52' : 'text-sage/46'}`}>
                      {String(index + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <div>
                    <h3 className={`text-[1.85rem] font-semibold tracking-[-0.05em] ${index === 1 ? 'text-white' : 'text-ink'}`}>{card.title}</h3>
                    <p className={`mt-4 max-w-[38rem] text-base leading-7 ${index === 1 ? 'text-white/74' : 'text-sage/78'}`}>{card.description}</p>
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
