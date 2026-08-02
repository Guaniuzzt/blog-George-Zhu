'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import useLocale from '@/hooks/use-locale'
import type { User } from '@supabase/supabase-js'

export default function UserMenu({ user }: { user: User | null }) {
  const router = useRouter()
  const supabase = createClient()
  const { routePrefix } = useLocale()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push(`/${routePrefix}`)
    router.refresh()
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
