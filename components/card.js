'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Card({ children, className = '', href }) {
  const cardContent = (
    <motion.div
      className={`group relative block rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 transition-all duration-500 hover:border-[var(--accent)]/30 ${className}`}
      whileHover={{
        y: -4,
        boxShadow: 'var(--card-shadow-hover)',
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      }}
      style={{
        boxShadow: 'var(--card-shadow)',
      }}
    >
      {/* Hover gradient border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent)]/5 via-[var(--accent2)]/5 to-[var(--accent)]/5" />
      </div>

      {children}
    </motion.div>
  )

  if (href) {
    return <Link href={href} className="block">{cardContent}</Link>
  }

  return cardContent
}
