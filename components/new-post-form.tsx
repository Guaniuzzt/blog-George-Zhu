'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPost } from '@/app/[lang]/blog/new/actions'
import useLocale from '@/hooks/use-locale'

interface NewPostFormProps {
  existingTags: string[]
}

export default function NewPostForm({ existingTags }: NewPostFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { routePrefix } = useLocale()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await createPost({
      title,
      description,
      content,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.push(`/${routePrefix}/blog/${result.slug}`)
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* 标题 */}
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

      {/* 描述 */}
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

      {/* 标签 */}
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
            {existingTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  const current = tags
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean)
                  if (!current.includes(tag)) {
                    setTags(current.length > 0 ? `${tags}, ${tag}` : tag)
                  }
                }}
                className="tag text-[0.65rem] cursor-pointer hover:bg-[var(--accent)] hover:text-white transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Markdown 正文 */}
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

      {/* 错误提示 */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* 提交 */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300 disabled:opacity-50"
        >
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent)] transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
