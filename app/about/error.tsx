'use client'

import { useEffect, startTransition } from 'react'
import { useRouter } from 'next/navigation'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const router = useRouter()

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh()
            reset()
          })
        }}
      >
        Try again
      </button>
    </div>
  )
}