'use client'

import { motion, AnimatePresence } from 'framer-motion'
import useDarkMode from '@/hooks/use-dark-mode'

export default function DarkMode() {
  const { theme, toggleTheme, mounted } = useDarkMode()

  if (!mounted) {
    return <div className="w-14 h-7" />
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full border border-[var(--border-color)] bg-[var(--bg-tertiary)] overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background:
            theme === 'dark'
              ? 'linear-gradient(135deg, #1a1a2e, #16213e)'
              : 'linear-gradient(135deg, #ffecd2, #fcb69f)',
        }}
        transition={{ duration: 0.6 }}
      />

      <AnimatePresence>
        {theme === 'dark' && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                style={{ left: `${15 + i * 18}%`, top: `${20 + (i % 2) * 40}%` }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute top-0.5 w-6 h-6 rounded-full"
        animate={{
          left: theme === 'dark' ? 'calc(100% - 1.625rem)' : '0.125rem',
          background: theme === 'dark' ? '#e8e8ed' : '#ffd700',
          boxShadow:
            theme === 'dark'
              ? '0 2px 8px rgba(255, 255, 255, 0.15)'
              : '0 2px 8px rgba(255, 140, 0, 0.3)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />

      <AnimatePresence>
        {theme === 'light' && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute left-1.5 top-1 w-5 h-5"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-white/30 rounded-full origin-bottom"
                  style={{ transform: `translate(-50%, -100%) rotate(${i * 45}deg)` }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}