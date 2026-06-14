'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import type { PaginationProps } from '@/types'

function PaginationInner({ pageCount }: PaginationProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  if (pageCount <= 1) return null

  const currentPage = Number(searchParams.get('page') ?? 1)
  const pages: number[] = []
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  return (
    <nav className="flex justify-center items-center gap-2">
      {pages.map((pageNumber) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', pageNumber.toString())
        const isActive = pageNumber === currentPage

        return (
          <Link
            key={pageNumber}
            href={`${pathname}?${params.toString()}`}
            className="relative"
          >
            <motion.span
              className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-mono font-medium transition-colors duration-300 ${
                isActive
                  ? 'text-white bg-[var(--accent)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--bg-secondary)]'
              }`}
              whileHover={!isActive ? { scale: 1.1 } : {}}
              whileTap={!isActive ? { scale: 0.95 } : {}}
            >
              {pageNumber}
            </motion.span>
          </Link>
        )
      })}
    </nav>
  )
}

export default function Pagination(props: PaginationProps) {
  return (
    <Suspense fallback={<div className="h-10" />}>
      <PaginationInner {...props} />
    </Suspense>
  )
}