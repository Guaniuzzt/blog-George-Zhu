'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import useLocale from '@/hooks/use-locale'
import type { RouteLocale } from '@/types'

function swapLocale(pathname: string, nextLocale: RouteLocale) {
  const rest = pathname.replace(/^\/(cn|eng)/, '')
  return `/${nextLocale}${rest}`
}

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { routePrefix, t } = useLocale()
  const query = searchParams.toString()
  const suffix = query ? `?${query}` : ''

  const options: { locale: RouteLocale; label: string }[] = [
    { locale: 'cn', label: 'CN' },
    { locale: 'eng', label: 'EN' },
  ]

  return (
    <div
      className="inline-flex h-9 items-center rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] p-0.5"
      aria-label={t('nav.switchLang')}
    >
      {options.map(({ locale, label }) => {
        const active = routePrefix === locale
        return (
          <Link
            key={locale}
            href={`${swapLocale(pathname, locale)}${suffix}`}
            aria-current={active ? 'true' : undefined}
            className={`flex h-8 items-center rounded-full px-2.5 text-[12.5px] font-medium transition-colors duration-300 ${
              active
                ? 'text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
