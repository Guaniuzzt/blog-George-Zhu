'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from 'framer-motion'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/about/projects', label: 'Projects' },
  { href: '/photos', label: 'Photos' },
  { href: '/blog', label: 'Blog' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:block">
      <ul className="flex gap-1">
        {links.map((link, i) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href)

          return (
            <li key={link.href}>
              <Link href={link.href}>
                <motion.span
                  className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 bg-[var(--accent-glow)] rounded-lg -z-10"
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
