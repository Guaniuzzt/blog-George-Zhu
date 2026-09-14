'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function Reveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.rv, .mask-line'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((el) => el.classList.add('in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('in')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )

    nodes.forEach((el) => io.observe(el))

    const fallback = window.setTimeout(() => {
      nodes.forEach((el) => el.classList.add('in'))
    }, 6000)

    return () => {
      io.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return <div ref={rootRef}>{children}</div>
}
