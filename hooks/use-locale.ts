'use client'

import { usePathname } from 'next/navigation'
import { getTranslation, routeToLocale } from '@/lib/i18n'
import type { Locale, RouteLocale } from '@/types'

export default function useLocale() {
  const pathname = usePathname()
  const segment = pathname.split('/')[1]
  const routePrefix: RouteLocale = segment === 'cn' ? 'cn' : 'eng'
  const lang: Locale = routeToLocale(routePrefix)

  const t = (key: string): string => {
    const dict = getTranslation(lang) as Record<string, string>
    return dict[key] || key
  }

  return { lang, routePrefix, t }
}
