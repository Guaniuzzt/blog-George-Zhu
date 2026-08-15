export default function Loading() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="space-y-4 max-w-2xl">
        <div className="h-10 bg-[var(--bg-tertiary)] rounded-lg w-3/4" />
        <div className="h-5 bg-[var(--bg-tertiary)] rounded w-full" />
        <div className="h-5 bg-[var(--bg-tertiary)] rounded w-2/3" />
        <div className="flex gap-3 mt-6">
          <div className="h-12 w-40 bg-[var(--bg-tertiary)] rounded-xl" />
          <div className="h-12 w-32 bg-[var(--bg-tertiary)] rounded-xl" />
        </div>
      </div>

      <div className="h-px bg-[var(--border-color)]" />

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 bg-[var(--bg-tertiary)] rounded-2xl"
          />
        ))}
      </div>
    </div>
  )
}
