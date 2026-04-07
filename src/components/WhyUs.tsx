import { useMessages } from '../lib/i18n'
import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

type Advantage = {
  description: string
  title: string
}

export function WhyUs() {
  const section = useMessages<{ description: string; eyebrow: string; title: string }>('whyUs')
  const advantages = Object.values(useMessages<Record<string, Advantage>>('whyUs.items'))

  return (
    <section className="section-shell" id="why-us">
      <Container>
        <div className="grid gap-6 xl:grid-cols-[minmax(340px,0.62fr)_minmax(0,1.38fr)] xl:items-start">
          <Reveal mode="immediate">
            <SectionHeading
              className="max-w-[30rem]"
              description={section.description}
              eyebrow={section.eyebrow}
              title={section.title}
            />
          </Reveal>

          <Reveal delay={0.06}>
            <div className="grid gap-4 xl:grid-cols-3">
              {advantages.map((item, index) => (
                <article
                  key={item.title}
                  className="border-t border-sage/15 bg-white/60 px-6 py-6 shadow-[0_18px_44px_rgba(23,35,28,0.06)] backdrop-blur sm:px-7"
                >
                  <p className="font-display text-5xl italic tracking-[-0.05em] text-sage/25">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <div className="mt-6">
                    <h3 className="text-[1.65rem] font-semibold leading-[1.08] tracking-[-0.05em] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-7 text-sage/75">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
