'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface H1Props {
  children: ReactNode
  className?: string
}

export default function H1({ children, className = '' }: H1Props) {
  return (
    <motion.h1
      className={`mb-8 font-['Clash_Display'] font-semibold text-3xl md:text-5xl tracking-tight leading-tight not-prose bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] bg-clip-text text-transparent ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.h1>
  )
}