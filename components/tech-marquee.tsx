const TECH = [
  'Next.js 14',
  'TypeScript',
  'React Server Components',
  'Tailwind CSS',
  'Prisma',
  'Supabase',
  'MDX',
  'Framer Motion',
  'Vercel',
] as const

export default function TechMarquee() {
  const loop = [...TECH, ...TECH]

  return (
    <section
      aria-hidden="true"
      className="marquee full-bleed overflow-hidden border-y border-[var(--border-color)] bg-[var(--card-bg)] py-5"
    >
      <div className="marquee-track flex w-max items-center gap-12 font-mono text-[13px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
        {loop.flatMap((name, index) => [
          <span key={`name-${index}`}>{name}</span>,
          <span key={`sep-${index}`} className="text-[var(--border-color)]">
            ✦
          </span>,
        ])}
      </div>
    </section>
  )
}
