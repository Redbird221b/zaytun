import { motion } from 'framer-motion'
import { useMessages } from '../lib/i18n'
import { Container } from './ui/Container'
import { ParallaxMedia } from './ui/ParallaxMedia'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

type Advantage = {
  description: string
  title: string
}

const whyUsOverlayClassName =
  'bg-[linear-gradient(135deg,rgba(19,30,24,0.94)_0%,rgba(19,30,24,0.84)_44%,rgba(19,30,24,0.58)_100%)]'
const reasonShells = [
  'bg-white',
  'bg-[#4a5f54] text-white',
  'bg-[#f3efe7]',
]
const reasonTitleTones = [
  'text-ink',
  'text-white',
  'text-ink',
]
const reasonBodyTones = [
  'text-sage/78',
  'text-white/74',
  'text-sage/76',
]
const reasonIndexTones = [
  'text-sage/34',
  'text-white/36',
  'text-sage/34',
]
const reasonBorderTones = [
  'border-sage/10',
  'border-white/10',
  'border-sage/10',
]

export function WhyUs() {
  const section = useMessages<{ description: string; eyebrow: string; title: string }>('whyUs')
  const advantages = Object.values(useMessages<Record<string, Advantage>>('whyUs.items'))

  return (
    <section className="section-shell" id="why-us">
      <Container>
        <div className="grid gap-6 xl:grid-cols-[minmax(420px,0.72fr)_minmax(0,1.28fr)] xl:items-stretch">
          <Reveal mode="immediate">
            <div className="relative min-h-[520px] overflow-hidden rounded-[40px] shadow-[0_28px_80px_rgba(23,35,28,0.18)] xl:min-h-[620px]">
              <ParallaxMedia overlayClassName={whyUsOverlayClassName} speed={30} src="/media/boardroom.jpg" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,182,138,0.16),transparent_22%)]" />

              <div className="relative flex h-full flex-col justify-between p-6 text-white sm:p-8 xl:p-9">
                <SectionHeading
                  className="max-w-[28rem]"
                  description={section.description}
                  eyebrow={section.eyebrow}
                  title={section.title}
                  tone="inverse"
                />

                <div className="max-w-[24rem] rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-lg">
                  <p className="text-sm leading-6 text-white/76">{advantages[0]?.description}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {advantages.map((item, index) => (
              <Reveal key={item.title} delay={0.06 + index * 0.06}>
                <motion.article
                  className={`overflow-hidden rounded-[34px] px-5 py-6 shadow-[0_20px_56px_rgba(23,35,28,0.08)] sm:px-6 xl:px-7 ${reasonShells[index]}`}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6 }}
                >
                  <div className="grid gap-5 xl:grid-cols-[120px_minmax(0,1fr)_minmax(260px,0.6fr)] xl:items-start">
                    <div className={`font-display text-[4.2rem] italic leading-none tracking-[-0.06em] ${reasonIndexTones[index]}`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div>
                      <h3 className={`max-w-[16ch] text-[2rem] font-semibold leading-[1.02] tracking-[-0.05em] ${reasonTitleTones[index]}`}>
                        {item.title}
                      </h3>
                    </div>

                    <div className={`xl:border-l xl:pl-6 ${reasonBorderTones[index]}`}>
                      <p className={`max-w-[24rem] text-base leading-7 ${reasonBodyTones[index]}`}>{item.description}</p>
                    </div>
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
