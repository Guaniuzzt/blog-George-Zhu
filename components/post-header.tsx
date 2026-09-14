import Link from 'next/link'

function formatPostDate(date: string) {
  const [year, month, day] = date.split('T')[0].split('-')
  if (!year || !month || !day) return date
  return `${year}.${month}.${day}`
}

export default function PostHeader({
  title,
  description,
  date,
  tags = [],
  backHref,
  backLabel,
}: {
  title: string
  description?: string
  date: string
  tags?: string[]
  backHref: string
  backLabel: string
}) {
  return (
    <header className="mb-12">
      <Link
        href={backHref}
        className="link-underline text-[13.5px] text-[var(--text-secondary)]"
      >
        ← {backLabel}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
        <time
          dateTime={date}
          className="font-mono text-[12.5px] text-[var(--text-muted)]"
        >
          {formatPostDate(date)}
        </time>
        {tags.map((tag) => (
          <span
            key={tag}
            className="chip rounded-full border border-[var(--border-color)] px-2.5 py-0.5 text-[11.5px] text-[var(--text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mt-4 font-serif text-[clamp(32px,4.6vw,52px)] font-semibold leading-[1.18] tracking-tightest text-[var(--text-primary)]">
        {title}
      </h1>

      {description ? (
        <p className="mt-5 text-[17px] leading-[1.8] text-[var(--text-secondary)]">
          {description}
        </p>
      ) : null}
    </header>
  )
}
