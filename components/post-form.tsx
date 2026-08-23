'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPost, updatePost } from '@/app/[lang]/blog/actions'
import useLocale from '@/hooks/use-locale'
import type { Locale } from '@/types'

export interface PostFormInitial {
  slug: string
  title: string
  description: string
  content: string
  locale: Locale
  published: boolean
  tags: string[]
}

interface PostFormProps {
  existingTags: string[]
  initial?: PostFormInitial
}

export default function PostForm({ existingTags, initial }: PostFormProps) {
  const isEdit = Boolean(initial)
  const { routePrefix } = useLocale()
  const routeDefaultLocale: Locale = routePrefix === 'cn' ? 'zh' : 'en'

  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [tags, setTags] = useState(initial?.tags.join(', ') ?? '')
  const [locale, setLocale] = useState<Locale>(initial?.locale ?? routeDefaultLocale)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<'draft' | 'publish' | null>(null)
  const router = useRouter()

  async function handleSubmit(published: boolean) {
    setError(null)
    setLoading(published ? 'publish' : 'draft')

    const input = {
      title,
      description,
      content,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      locale,
      published,
    }

    const result = isEdit
      ? await updatePost(initial!.slug, input)
      : await createPost(input)

    if (result.error) {
      setError(result.error)
      setLoading(null)
    } else {
      // 草稿保存后跳预览页（正式路由对草稿 404）
      router.push(
        published
          ? `/${routePrefix}/blog/${result.slug}`
          : `/${routePrefix}/blog/${result.slug}/preview`
      )
      router.refresh()
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6 max-w-3xl">
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="My Awesome Post"
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
          Description *
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="A brief summary of the post"
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
          Language
        </label>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        >
          <option value="zh">中文 (zh)</option>
          <option value="en">English (en)</option>
        </select>
        <p className="mt-1 text-xs text-[var(--text-muted)]">
          The post will only be listed under the matching language site.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="nextjs, typescript, react"
          className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        {existingTags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {existingTags.map((tag) => {
              const current = tags
                .split(',')
                .map((t) => t.trim())
                .filter(Boolean)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    if (!current.includes(tag)) {
                      setTags(current.length > 0 ? `${tags}, ${tag}` : tag)
                    }
                  }}
                  className={`tag text-[0.65rem] transition-colors ${
                    current.includes(tag)
                      ? 'bg-[var(--accent)] text-white'
                      : 'cursor-pointer hover:bg-[var(--accent)] hover:text-white'
                  }`}
                >
                  #{tag}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
          Content (Markdown) *
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={20}
          placeholder="Write your article in Markdown..."
          className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-y"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => handleSubmit(true)}
          disabled={loading !== null}
          className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300 disabled:opacity-50"
        >
          {loading === 'publish'
            ? 'Saving...'
            : isEdit && initial?.published
              ? 'Save Changes'
              : 'Publish'}
        </button>
        <button
          type="button"
          onClick={() => handleSubmit(false)}
          disabled={loading !== null}
          className="px-6 py-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)] transition-all duration-300 disabled:opacity-50"
        >
          {loading === 'draft'
            ? 'Saving...'
            : isEdit && initial?.published
              ? 'Save & Unpublish'
              : 'Save as Draft'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
