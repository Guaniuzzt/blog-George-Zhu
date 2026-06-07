export default function ProjectListLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {Array(4).fill(0).map((_, i) => (
        <div
          key={i}
          className="h-32 rounded-2xl bg-[var(--bg-tertiary)] animate-pulse border border-[var(--border-color)]"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  )
}
