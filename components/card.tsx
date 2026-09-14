'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  href?: string
}

export default function Card({ children, className = '', href }: CardProps) {
  const cardContent = (
    <motion.div
      className={`group relative block rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 transition-shadow duration-500 ${className}`}
      whileHover={{
        y: -3,
        boxShadow: 'var(--card-shadow-hover)',
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{
        boxShadow: 'var(--card-shadow)',
      }}
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}
