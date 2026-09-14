import type { ReactNode } from 'react'
import { getProjectUrl, type ProjectShowcase, type ProjectThumb } from '@/lib/projects-data'
import type { Locale } from '@/types'

function BlogThumb() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-[72%] rounded-xl bg-white/12 p-4 backdrop-blur-sm">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-2.5 w-3/4 rounded-full bg-white/50" />
          <div className="h-2.5 w-1/2 rounded-full bg-white/30" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="h-9 rounded-md bg-white/25" />
            <div className="h-9 rounded-md bg-white/15" />
            <div className="h-9 rounded-md bg-white/25" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ShopThumb() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-[72%] rounded-xl bg-white/14 p-4 backdrop-blur-sm">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white/40" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="rounded-md bg-white/25 p-2">
            <div className="h-6 rounded bg-white/35" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/50" />
          </div>
          <div className="rounded-md bg-white/15 p-2">
            <div className="h-6 rounded bg-white/30" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/40" />
          </div>
          <div className="rounded-md bg-white/25 p-2">
            <div className="h-6 rounded bg-white/35" />
            <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-white/50" />
          </div>
        </div>
        <div className="mt-3 h-2.5 w-1/2 rounded-full bg-white/30" />
      </div>
    </div>
  )
}

function StudioThumb() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-[78%] rounded-xl bg-white/10 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-10 rounded-full bg-white/55" />
          <div className="flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-white/35" />
            <span className="h-1.5 w-6 rounded-full bg-white/35" />
            <span className="h-1.5 w-6 rounded-full bg-white/35" />
          </div>
        </div>
        <div className="mt-5 space-y-2">
          <div className="h-3 w-5/6 rounded-full bg-white/70" />
          <div className="h-3 w-3/5 rounded-full bg-white/40" />
        </div>
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-16 rounded-full bg-white/50" />
          <div className="h-6 w-16 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  )
}

const thumbs: Record<ProjectThumb, () => ReactNode> = {
  blog: BlogThumb,
  shop: ShopThumb,
  studio: StudioThumb,
}

const gradients: Record<ProjectThumb, string> = {
  blog: 'bg-gradient-to-br from-[#4F46E5] via-[#7C74F0] to-[#B7AFFF]',
  shop: 'bg-gradient-to-br from-[#0E7A5F] via-[#18A57F] to-[#8FE3C3]',
  studio: 'bg-gradient-to-br from-[#111114] via-[#5B4B8A] to-[#E8C39E]',
}

export default function ProjectCard({
  project,
  locale,
  visitLabel,
  className = '',
}: {
  project: ProjectShowcase
  locale: Locale
  visitLabel: string
  className?: string
}) {
  const href = getProjectUrl(project, locale)
  const name = locale === 'zh' ? project.name.zh : project.name.en
  const description =
    locale === 'zh' ? project.description.zh : project.description.en
  const Thumb = thumbs[project.thumb]

  const inner = (
    <>
      <div className={`relative h-[220px] overflow-hidden ${gradients[project.thumb]}`}>
        <div className="proj-thumb absolute inset-0">
          <Thumb />
        </div>
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-[#17171C]">
          {project.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="font-serif text-[21px] font-semibold tracking-tight">
            {name}
          </h3>
          <span className="font-mono text-[12px] text-[var(--text-muted)]">
            {project.domain}
          </span>
        </div>
        <p className="mt-3 text-[14px] leading-[1.8] text-[var(--text-secondary)]">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.chips.map((chip) => (
            <span
              key={chip}
              className="chip rounded-full border border-[var(--border-color)] px-3 py-1 text-[12px] text-[var(--text-secondary)]"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="proj-go mt-auto flex items-center gap-2 pt-6 text-[13.5px] font-medium text-[var(--text-primary)]">
          {visitLabel}
          <svg
            width="14"
            height="14"
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
        </div>
      </div>
    </>
  )

  const cardClass = `proj-card group flex flex-col overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] ${className}`

  if (!href) {
    return <article className={cardClass}>{inner}</article>
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      {inner}
    </a>
  )
}
