'use client'

import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

const pageVariants: Variants = {
  initial: { opacity: 0, y: 24, scale: 0.98, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], staggerChildren: 0.08 },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
}

const childVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export default function PageTransition({
  children,
  className = '',
}: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

interface MotionItemProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function MotionItem({
  children,
  className = '',
  delay = 0,
}: MotionItemProps) {
  return (
    <motion.div
      variants={childVariants}
      initial="initial"
      animate="animate"
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}