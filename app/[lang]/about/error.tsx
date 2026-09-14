'use client'

import { useEffect, startTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useLocale from '@/hooks/use-locale'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter()
  const { t, routePrefix } = useLocale()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
        Error
      </p>
      <h2 className="mt-3 font-serif text-[clamp(28px,3.6vw,42px)] font-semibold tracking-tightest text-[var(--text-primary)]">
        {t('error.title')}
      </h2>
      <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-[var(--text-secondary)]">
        {t('error.desc')}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn-primary inline-flex items-center rounded-full bg-[var(--accent)] px-7 py-3.5 text-[14.5px] font-medium text-white"
          onClick={() => {
            startTransition(() => {
              router.refresh()
              reset()
            })
          }}
        >
          {t('error.retry')}
        </button>
        <Link
          href={`/${routePrefix}`}
          className="btn-ghost inline-flex items-center rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] px-7 py-3.5 text-[14.5px] font-medium text-[var(--text-primary)]"
        >
          {t('404.backHome')}
        </Link>
      </div>
    </div>
  )
}
