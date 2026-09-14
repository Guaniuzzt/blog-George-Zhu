'use client'

import { Suspense, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import Navigation from './navigation'
import DarkMode from './dark-mode'
import LanguageSwitcher from './language-switcher'
import useLocale from '@/hooks/use-locale'

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  )
}

export default function Header({ userSlot }: { userSlot: ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const { routePrefix, t } = useLocale()

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    setScrolled(latest > 24)
  })

  return (
    <header
      className={`site-header fixed top-0 left-0 right-0 z-50 ${
        scrolled || menuOpen ? 'scrolled' : ''
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1120px] items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link href={`/${routePrefix}`} className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--text-primary)] font-mono text-[13px] font-semibold text-[var(--bg-primary)] transition-transform duration-500 group-hover:rotate-[-8deg]">
              GZ
            </span>
            <span className="hidden text-[15px] font-semibold tracking-tight sm:inline">
              George Zhu
            </span>
          </Link>
          <Navigation />
        </div>

        <div className="flex items-center gap-2">
          <Suspense
            fallback={
              <div className="h-9 w-[72px] rounded-full border border-[var(--border-color)]" />
            }
          >
            <LanguageSwitcher />
          </Suspense>
          <DarkMode />
          {userSlot}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] md:hidden"
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.menu')}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="border-t border-[var(--border-color)] px-6 py-4 md:hidden">
          <Navigation variant="mobile" onNavigate={() => setMenuOpen(false)} />
        </div>
      ) : null}
    </header>
  )
}
