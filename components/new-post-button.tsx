import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'

export default async function NewPostButton({ routePrefix }: { routePrefix: string }) {
  const user = await getCurrentUser()
  if (!user) return null

  return (
    <Link
      href={`/${routePrefix}/blog/new`}
      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent)] text-white text-sm font-medium shadow-lg shadow-[var(--accent)]/20 hover:shadow-xl hover:shadow-[var(--accent)]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 self-start md:self-auto shrink-0"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      New Post
    </Link>
  )
}
