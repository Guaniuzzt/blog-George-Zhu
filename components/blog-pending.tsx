'use client'

import Link from 'next/link'
import {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const PendingContext = createContext<{
  pending: boolean
  markPending: () => void
}>({
  pending: false,
  markPending: () => {},
})

export function useBlogPending() {
  return useContext(PendingContext)
}

function BlogPendingProviderInner({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [pending, setPending] = useState(false)
  const navKey = `${pathname}?${searchParams.toString()}`

  useEffect(() => {
    setPending(false)
  }, [navKey])

  return (
    <PendingContext.Provider
      value={{ pending, markPending: () => setPending(true) }}
    >
      {children}
    </PendingContext.Provider>
  )
}

export function BlogPendingProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={children}>
      <BlogPendingProviderInner>{children}</BlogPendingProviderInner>
    </Suspense>
  )
}

export function BlogPendingOutlet({
  children,
  fallback,
}: {
  children: ReactNode
  fallback: ReactNode
}) {
  const { pending } = useBlogPending()
  return pending ? fallback : children
}

export function BlogPendingLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  const { markPending } = useBlogPending()
  const router = useRouter()

  return (
    <Link
      href={href}
      className={className}
      prefetch
      onClick={(event) => {
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return
        }
        event.preventDefault()
        markPending()
        router.push(href)
      }}
    >
      {children}
    </Link>
  )
}
