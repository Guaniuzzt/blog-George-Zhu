'use client'

import Navigation from './navigation'
import Link from 'next/link'
import DarkMode from './dark-mode'
import LanguageToggle from './language-toggle'
import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    setScrolled(latest > 40)
  })

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-color)]'
          : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="group">
            <motion.span
              className="text-xl font-['Clash_Display'] font-semibold tracking-tight glitch-text"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] bg-clip-text text-transparent">
                GZ
              </span>
              <span className="text-[var(--text-primary)] hidden sm:inline">.dev</span>
            </motion.span>
          </Link>
          <Navigation />
        </div>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <DarkMode />
        </div>
      </div>
    </motion.header>
  )
}