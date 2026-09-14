'use client'

import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] h-[2px] w-full origin-left bg-[var(--accent)]"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
