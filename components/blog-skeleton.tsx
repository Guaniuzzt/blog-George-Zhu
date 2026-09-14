export function BlogPostsSkeleton() {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[44px_1fr_auto] items-center gap-5 border-b border-[var(--border-color)] px-4 py-7 md:grid-cols-[64px_1fr_220px_auto] md:px-6"
        >
          <div className="h-3 w-6 animate-pulse rounded bg-[var(--bg-tertiary)]" />
          <div className="space-y-3">
            <div className="h-5 w-3/4 animate-pulse rounded bg-[var(--bg-tertiary)]" />
            <div className="hidden h-4 w-1/2 animate-pulse rounded bg-[var(--bg-tertiary)] md:block" />
          </div>
          <div className="hidden justify-self-end space-y-2 md:block">
            <div className="ml-auto h-3 w-20 animate-pulse rounded bg-[var(--bg-tertiary)]" />
            <div className="ml-auto h-5 w-24 animate-pulse rounded-full bg-[var(--bg-tertiary)]" />
          </div>
          <div className="h-10 w-10 animate-pulse rounded-full bg-[var(--bg-tertiary)]" />
        </div>
      ))}
    </div>
  )
}

export function BlogPostContentSkeleton() {
  const widths = ['100%', '94%', '88%', '100%', '76%', '100%', '92%', '58%']

  return (
    <div className="animate-pulse space-y-4 mb-12">
      {widths.map((width, i) => (
        <div
          key={i}
          className="h-4 bg-[var(--bg-tertiary)] rounded"
          style={{ width }}
        />
      ))}
    </div>
  )
}

export function BlogPostPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-[var(--bg-tertiary)] rounded-lg w-3/4" />
        <div className="h-4 bg-[var(--bg-tertiary)] rounded w-40" />
      </div>
      <BlogPostContentSkeleton />
    </div>
  )
}

export default function BlogPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-[var(--bg-tertiary)] rounded-lg w-32" />
        <div className="h-5 bg-[var(--bg-tertiary)] rounded w-2/3" />
      </div>
      <div className="h-px bg-[var(--border-color)]" />
      <div className="animate-pulse h-8 w-40 bg-[var(--bg-tertiary)] rounded-lg" />
      <BlogPostsSkeleton />
    </div>
  )
}
