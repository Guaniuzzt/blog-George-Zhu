import { Suspense } from "react"
import ProjectList from "./components/project-list"
import ProjectListLoading from "./components/project-list-loading"
import { ErrorBoundary } from "react-error-boundary"
import H1 from "@/components/h1"
import { MotionItem } from "@/components/page-transition"
import { getTranslation } from "@/lib/i18n"
import useServerLanguage from "@/hooks/use-server-language"

export const metadata = {
  title: 'Projects'
}

function ErrorFallback({ lang }) {
  const t = (key) => getTranslation(lang)[key] || key
  return (
    <div className="text-center py-12">
      <p className="text-lg text-[var(--text-muted)]">{t('projects.error')}</p>
    </div>
  )
}

export default async function ProjectsPage() {
  const lang = useServerLanguage()
  const t = (key) => getTranslation(lang)[key] || key

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

      <ErrorBoundary fallback={<ErrorFallback lang={lang} />}>
        <Suspense fallback={<ProjectListLoading />}>
          <ProjectList />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
