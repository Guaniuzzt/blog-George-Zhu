import Link from 'next/link'
import PostAdminActions from '@/components/post-admin-actions'
import type { Post } from '@/types'

function formatPostDate(date: string) {
  const [year, month, day] = date.split('T')[0].split('-')
  if (!year || !month || !day) return date
  return `${year}.${month}.${day}`
}

export default function PostRow({
  post,
  index,
  prefix,
  draftLabel,
  className = '',
  showAdmin = false,
}: {
  post: Post
  index: number
  prefix: string
  draftLabel: string
  className?: string
  showAdmin?: boolean
}) {
  const isDraft = post.frontmatter.published === false
  const href = isDraft
    ? `${prefix}/blog/${post.slug}/preview`
    : `${prefix}/blog/${post.slug}`
  const tags = post.frontmatter.tags?.slice(0, 2) ?? []

  return (
    <article
      className={`post-row group relative grid grid-cols-[44px_1fr_auto] items-center gap-5 rounded-2xl border-b border-[var(--border-color)] px-4 py-7 md:grid-cols-[64px_1fr_220px_auto] md:px-6 ${className}`}
    >
      <Link
        href={href}
        className="absolute inset-0 z-[1] rounded-2xl"
        aria-label={post.frontmatter.title}
      />

      <span className="font-mono text-[13px] text-[var(--text-muted)]">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="min-w-0">
        <span className="post-title block font-serif text-[19px] font-semibold leading-snug md:text-[21px]">
          {post.frontmatter.title}
          {isDraft ? (
            <span className="ml-2 inline-block translate-y-[-1px] rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 align-middle font-sans text-[11px] font-medium text-amber-700 dark:text-amber-400">
              {draftLabel}
            </span>
          ) : null}
        </span>
        {post.frontmatter.description ? (
          <span className="mt-2 hidden text-[14px] leading-relaxed text-[var(--text-secondary)] md:max-w-[520px] md:line-clamp-2">
            {post.frontmatter.description}
          </span>
        ) : null}
        {showAdmin ? (
          <span className="relative z-[2] mt-3 block">
            <PostAdminActions
              slug={post.slug}
              published={post.frontmatter.published !== false}
            />
          </span>
        ) : null}
      </span>

      <span className="hidden text-right md:block">
        <span className="block font-mono text-[12.5px] text-[var(--text-muted)]">
          {formatPostDate(post.frontmatter.date)}
        </span>
        {tags.length > 0 ? (
          <span className="mt-2 inline-flex flex-wrap justify-end gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="chip rounded-full border border-[var(--border-color)] px-2.5 py-0.5 text-[11.5px] text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </span>
        ) : null}
      </span>

      <span className="post-arrow flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-primary)]">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </span>
    </article>
  )
}
