import { cn } from '../../lib/cn'

type SectionHeadingProps = {
  align?: 'left' | 'center'
  className?: string
  description: string
  eyebrow: string
  tone?: 'default' | 'inverse'
  title: string
}

export function SectionHeading({
  align = 'left',
  className,
  description,
  eyebrow,
  tone = 'default',
  title,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'mx-auto max-w-3xl items-center text-center',
        className,
      )}
    >
      <span className={tone === 'inverse' ? 'eyebrow-inverse' : 'eyebrow'}>{eyebrow}</span>
      <div className="space-y-4">
        <h2
          className={cn(
            'text-balance text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-[3.25rem]',
            tone === 'inverse' ? 'text-white' : 'text-ink',
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            'text-pretty max-w-2xl text-base leading-7 sm:text-lg',
            tone === 'inverse' ? 'text-white/75' : 'text-sage/80',
          )}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
