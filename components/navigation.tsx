'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import useLanguage from '@/hooks/use-language'
import type { NavItem, Locale } from '@/types'

const linkKeys: NavItem[] = [
  { href: '/', i18nKey: 'nav.home' },
  { href: '/about', i18nKey: 'nav.about' },
  { href: '/about/projects', i18nKey: 'nav.projects' },
  { href: '/photos', i18nKey: 'nav.photos' },
  { href: '/blog', i18nKey: 'nav.blog' },
]

export default function Navigation({ lang }: { lang: Locale }) {
  const pathname = usePathname()
  const { t } = useLanguage(lang)

  return (
    <nav className="hidden md:block">
      <ul className="flex gap-1">
        {linkKeys.map((link, i) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href)

          return (
            <li key={link.href}>
              <Link href={link.href}>
                <motion.span
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  {t(link.i18nKey)}
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 bg-[var(--accent-glow)] rounded-lg -z-10"
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}