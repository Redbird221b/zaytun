import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import en from '../../locales/en.json'
import ru from '../../locales/ru.json'
import uz from '../../locales/uz.json'

const dictionaries = {
  en,
  ru,
  uz,
}

const localeCodes = ['uz', 'ru', 'en'] as const
const storageKey = 'zaytun-locale'

export type Locale = (typeof localeCodes)[number]
type Primitive = string | number | boolean | null

type I18nContextValue = {
  locale: Locale
  locales: readonly Locale[]
  setLocale: (nextLocale: Locale) => void
  t: (path: string, variables?: Record<string, Primitive>) => string
  getMessage: <T,>(path: string) => T
}

const I18nContext = createContext<I18nContextValue | null>(null)

function isLocale(value: string | null): value is Locale {
  return value !== null && localeCodes.includes(value as Locale)
}

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'uz'
  }

  const urlLocale = new URLSearchParams(window.location.search).get('lang')
  if (isLocale(urlLocale)) {
    return urlLocale
  }

  const storedLocale = window.localStorage.getItem(storageKey)
  if (isLocale(storedLocale)) {
    return storedLocale
  }

  return 'uz'
}

function getNestedValue(source: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((accumulator, segment) => {
    if (accumulator && typeof accumulator === 'object' && segment in accumulator) {
      return (accumulator as Record<string, unknown>)[segment]
    }

    return undefined
  }, source)
}

function interpolate(value: string, variables?: Record<string, Primitive>) {
  if (!variables) {
    return value
  }

  return value.replace(/\{(\w+)\}/g, (_, key: string) => {
    const replacement = variables[key]
    return replacement === undefined || replacement === null ? '' : String(replacement)
  })
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)
  const dictionary = dictionaries[locale]

  useEffect(() => {
    window.localStorage.setItem(storageKey, locale)
    document.documentElement.lang = locale

    const url = new URL(window.location.href)
    url.searchParams.set('lang', locale)
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)

    const title = getNestedValue(dictionary, 'meta.title')
    const description = getNestedValue(dictionary, 'meta.description')

    if (typeof title === 'string') {
      document.title = title
    }

    let descriptionTag = document.querySelector('meta[name="description"]')
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta')
      descriptionTag.setAttribute('name', 'description')
      document.head.appendChild(descriptionTag)
    }

    if (typeof description === 'string') {
      descriptionTag.setAttribute('content', description)
    }
  }, [dictionary, locale])

  const setLocale = (nextLocale: Locale) => {
    startTransition(() => {
      setLocaleState(nextLocale)
    })
  }

  const getMessage = <T,>(path: string) => {
    const value = getNestedValue(dictionary, path)

    if (value === undefined) {
      throw new Error(`Missing translation for path "${path}" in locale "${locale}"`)
    }

    return value as T
  }

  const t = (path: string, variables?: Record<string, Primitive>) => {
    const value = getMessage<string>(path)
    return interpolate(value, variables)
  }

  return (
    <I18nContext.Provider
      value={{
        getMessage,
        locale,
        locales: localeCodes,
        setLocale,
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

function useI18nContext() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18nContext must be used within LocaleProvider')
  }

  return context
}

export function useLocale() {
  const { locale, locales, setLocale } = useI18nContext()
  return { locale, locales, setLocale }
}

export function useT() {
  return useI18nContext().t
}

export function useMessages<T>(path: string) {
  return useI18nContext().getMessage<T>(path)
}
