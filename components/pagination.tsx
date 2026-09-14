'use client'

import { Suspense } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import { BlogPendingLink } from '@/components/blog-pending'
import useLocale from '@/hooks/use-locale'
import type { PaginationProps } from '@/types'

function PaginationInner({ pageCount }: PaginationProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { t } = useLocale()

  if (pageCount <= 1) return null

  const currentPage = Number(searchParams.get('page') ?? 1)
  const pages: number[] = []
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  return (
    <nav className="flex justify-center items-center gap-2" aria-label={t('pagination.label')}>
      {pages.map((pageNumber) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', pageNumber.toString())
        const isActive = pageNumber === currentPage

        return (
          <BlogPendingLink
            key={pageNumber}
            href={`${pathname}?${params.toString()}`}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-mono transition-colors duration-300 ${
              isActive
                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span className={isActive ? 'font-medium' : undefined}>{pageNumber}</span>
          </BlogPendingLink>
        )
      })}
    </nav>
  )
}

export default function Pagination(props: PaginationProps) {
  return (
    <Suspense fallback={<div className="h-9" />}>
      <PaginationInner {...props} />
    </Suspense>
  )
}
