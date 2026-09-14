'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import useLocale from '@/hooks/use-locale'
import type { User } from '@supabase/supabase-js'

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()
  const { routePrefix } = useLocale()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
    router.push(`/${routePrefix}`)
    router.refresh()
  }

  if (loading) {
    return (
      <span className="flex h-9 items-center rounded-full border border-[var(--border-color)] px-4 text-sm opacity-50">
        Sign In
      </span>
    )
  }

  if (!user) {
    return (
      <Link
        href={`/${routePrefix}/login`}
        className="flex h-9 items-center rounded-full border border-[var(--border-color)] px-4 text-sm transition-all duration-300 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
      >
        Sign In
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
        {user.email}
      </span>
      <button
        onClick={handleSignOut}
        className="flex h-9 items-center rounded-full border border-[var(--border-color)] px-3 text-sm transition-all duration-300 hover:border-red-400 hover:text-red-400"
      >
        Sign Out
      </button>
    </div>
  )
}
