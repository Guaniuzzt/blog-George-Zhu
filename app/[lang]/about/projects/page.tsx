import H1 from '@/components/h1'
import { MotionItem } from '@/components/page-transition'
import { getTranslation, routeToLocale } from '@/lib/i18n'
import ProjectCarousel from './components/project-carousel'
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
    <div>
      <H1>{t('projects.title')}</H1>

      <MotionItem delay={0.1}>
        <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
          {t('projects.desc')}
          <span className="block mt-1 text-sm text-[var(--text-muted)]">
            {t('projects.subdesc')}
          </span>
        </p>
      </MotionItem>

      <MotionItem delay={0.2}>
        <ProjectCarousel lang={lang} />
      </MotionItem>
    </div>
  )
}
