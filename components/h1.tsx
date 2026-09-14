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
      className={`mb-8 font-serif font-semibold text-3xl md:text-5xl tracking-tightest leading-tight not-prose text-[var(--text-primary)] ${className}`}
      initial={false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.h1>
  )
}