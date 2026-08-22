export function BlogPostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse h-48 rounded-2xl bg-[var(--bg-tertiary)]"
        />
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
