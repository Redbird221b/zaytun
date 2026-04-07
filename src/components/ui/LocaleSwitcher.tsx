import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { useLocale, useT } from '../../lib/i18n'

export function LocaleSwitcher({ className }: { className?: string }) {
  const { locale, locales, setLocale } = useLocale()
  const t = useT()

  return (
    <div className={cn('inline-flex items-center gap-1 rounded-full border border-sage/10 bg-white/75 p-1 shadow-soft backdrop-blur', className)}>
      {locales.map((code) => {
        const active = code === locale

        return (
          <button
            key={code}
            aria-label={t('header.localeOptionAria', { locale: t(`common.languages.${code}`) })}
            className={cn(
              'relative rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition',
              active ? 'text-white' : 'text-sage/70 hover:text-sage',
            )}
            lang={code}
            onClick={() => setLocale(code)}
            type="button"
          >
            {active ? (
              <motion.span
                className="absolute inset-0 rounded-full bg-sage"
                layoutId="locale-pill"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null}
            <span className="relative">{t(`common.languages.${code}`)}</span>
          </button>
        )
      })}
    </div>
  )
}
