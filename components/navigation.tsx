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
  { href: '/photos', i18nKey: 'nav.photos' },
]

export default function Navigation() {
  const pathname = usePathname()
  const { t, routePrefix } = useLocale()

  const stripLocale = (path: string) =>
    path.replace(/^\/(cn|eng)/, '') || '/'

  const currentPath = stripLocale(pathname)

  return (
    <nav className="hidden md:block">
      <ul className="flex gap-1">
        {linkKeys.map((link, i) => {
          const hasChildInNav = linkKeys.some(
            other => other.href !== link.href && other.href.startsWith(link.href + '/')
          )
          const isActive =
            link.href === '/'
              ? currentPath === '/'
              : hasChildInNav
                ? currentPath === link.href
                : currentPath === link.href || currentPath.startsWith(link.href + '/')

          return (
            <li key={link.href}>
              <Link href={`/${routePrefix}${link.href === '/' ? '' : link.href}`}>
                <span
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-[var(--accent)] bg-[var(--accent-glow)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {t(link.i18nKey)}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
