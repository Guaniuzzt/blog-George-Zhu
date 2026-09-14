'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import useLocale from '@/hooks/use-locale'
import type { NavItem } from '@/types'

const linkKeys: NavItem[] = [
  { href: '/', i18nKey: 'nav.home' },
  { href: '/blog', i18nKey: 'nav.blog' },
  { href: '/about/projects', i18nKey: 'nav.projects' },
  { href: '/about', i18nKey: 'nav.about' },
]

function isLinkActive(href: string, currentPath: string, items: NavItem[]) {
  if (href === '/') return currentPath === '/'
  const hasChildInNav = items.some(
    (other) => other.href !== href && other.href.startsWith(href + '/')
  )
  return hasChildInNav
    ? currentPath === href
    : currentPath === href || currentPath.startsWith(href + '/')
}

export default function Navigation({
  variant = 'desktop',
  onNavigate,
}: {
  variant?: 'desktop' | 'mobile'
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const { t, routePrefix } = useLocale()
  const currentPath = pathname.replace(/^\/(cn|eng)/, '') || '/'

  if (variant === 'mobile') {
    return (
      <nav aria-label={t('nav.menu')}>
        <ul className="flex flex-col gap-1">
          {linkKeys.map((link) => {
            const active = isLinkActive(link.href, currentPath, linkKeys)
            return (
              <li key={link.href}>
                <Link
                  href={`/${routePrefix}${link.href === '/' ? '' : link.href}`}
                  onClick={onNavigate}
                  className={`block rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors ${
                    active
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {t(link.i18nKey)}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-8 text-[14px] font-medium text-[var(--text-secondary)]">
        {linkKeys.map((link) => {
          const active = isLinkActive(link.href, currentPath, linkKeys)
          return (
            <li key={link.href}>
              <Link
                href={`/${routePrefix}${link.href === '/' ? '' : link.href}`}
                className={`nav-link hover:text-[var(--text-primary)] ${
                  active ? 'is-active text-[var(--text-primary)]' : ''
                }`}
              >
                {t(link.i18nKey)}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
