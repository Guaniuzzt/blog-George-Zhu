'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import useLanguage from '@/hooks/use-language'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center relative">
      {/* Background glitch effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-['Clash_Display'] font-bold text-[var(--bg-tertiary)] select-none"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          404
        </motion.div>
      </div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <h1 className="text-8xl md:text-9xl font-['Clash_Display'] font-bold mb-4 bg-gradient-to-r from-[var(--accent)] via-[var(--accent2)] to-[var(--accent)] bg-clip-text text-transparent glitch-text">
          404
        </h1>

        <motion.p
          className="text-xl text-[var(--text-secondary)] mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {t('404.title')}
        </motion.p>

        <motion.p
          className="text-[var(--text-muted)] mb-8 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t('404.desc')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>←</span>
            <span>{t('404.backHome')}</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
