'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { deletePost, setPostPublished } from '@/app/[lang]/blog/actions'
import useLocale from '@/hooks/use-locale'

interface PostAdminActionsProps {
  slug: string
  published: boolean
  /** card：列表卡片上的紧凑图标按钮；page：正式文章页；preview：草稿预览页 */
  variant?: 'card' | 'page' | 'preview'
}

export default function PostAdminActions({
  slug,
  published,
  variant = 'card',
}: PostAdminActionsProps) {
  const [isAuthed, setIsAuthed] = useState(false)
  const [busy, setBusy] = useState(false)
  const router = useRouter()
  const { routePrefix } = useLocale()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthed(Boolean(data.user))
    })
  }, [])

  if (!isAuthed) return null

  async function handleTogglePublish() {
    setBusy(true)
    await setPostPublished(slug, !published)
    setBusy(false)

    // 页面级操作后跳转到状态正确的 URL：
    // - 正式文章页下架 → 当前 URL 会变 404，跳到预览页
    // - 预览页发布 → 跳到正式 URL
    if (variant === 'page' && published) {
      router.push(`/${routePrefix}/blog/${slug}/preview`)
      return
    }
    if (variant === 'preview' && !published) {
      router.push(`/${routePrefix}/blog/${slug}`)
      return
    }
    router.refresh()
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      published
        ? 'Delete this post permanently? This cannot be undone.'
        : 'Delete this draft permanently? This cannot be undone.'
    )
    if (!confirmed) return

    setBusy(true)
    const result = await deletePost(slug)
    setBusy(false)

    if (result.error) {
      window.alert(result.error)
      return
    }

    if (variant !== 'card') {
      router.push(`/${routePrefix}/blog`)
    }
    router.refresh()
  }

  if (variant === 'card') {
    return (
      <div
        className="flex items-center gap-1 mt-3"
        onClick={(e) => e.preventDefault()}
      >
        <Link
          href={`/${routePrefix}/blog/${slug}/edit`}
          title="Edit"
          className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </Link>
        <button
          type="button"
          onClick={handleTogglePublish}
          disabled={busy}
          title={published ? 'Unpublish' : 'Publish'}
          className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 disabled:opacity-50"
        >
          {published ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={busy}
          title="Delete"
          className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:border-red-500 hover:text-red-500 transition-all duration-300 disabled:opacity-50"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href={`/${routePrefix}/blog/${slug}/edit`}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit
      </Link>
      <button
        type="button"
        onClick={handleTogglePublish}
        disabled={busy}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 disabled:opacity-50"
      >
        {busy ? 'Working...' : published ? 'Unpublish' : 'Publish'}
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={busy}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:border-red-500 hover:text-red-500 transition-all duration-300 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  )
}
