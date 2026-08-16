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
      <span className="px-4 py-1.5 rounded-xl border border-[var(--border-color)] text-sm opacity-50">
        Sign In
      </span>
    )
  }

  if (!user) {
    return (
      <Link
        href={`/${routePrefix}/login`}
        className="px-4 py-1.5 rounded-xl border border-[var(--border-color)] text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
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
        className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] text-sm hover:border-red-400 hover:text-red-400 transition-all duration-300"
      >
        Sign Out
      </button>
    </div>
  )
}
