import Reveal from '@/components/reveal'
import ProjectCard from '@/components/project-card'
import { getTranslation, routeToLocale } from '@/lib/i18n'
import { projects } from '@/lib/projects-data'
import type { Locale } from '@/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
}

export const dynamic = 'force-static'

export default async function ProjectsPage({ params }: { params: { lang: string } }) {
  const lang = routeToLocale(params.lang) as Locale
  const dict = getTranslation(lang) as Record<string, string>
  const t = (key: string): string => dict[key] || key

  return (
    <Reveal>
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="rv font-mono text-[12.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {t('section.projects')}
          </div>
          <h1 className="rv rv-d1 mt-3 font-serif text-[clamp(28px,3.6vw,42px)] font-semibold tracking-tightest">
            {t('projects.title')}
          </h1>
        </div>
      </div>

      <p className="rv rv-d2 mt-4 max-w-[560px] text-[15.5px] leading-relaxed text-[var(--text-secondary)]">
        {t('projects.desc')}
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            locale={lang}
            visitLabel={t('projects.visit')}
            className={i === 0 ? 'rv' : 'rv rv-d1'}
          />
        ))}
      </div>
    </Reveal>
  )
}
