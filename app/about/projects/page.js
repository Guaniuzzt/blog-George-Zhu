import { Suspense } from "react"
import ProjectList from "./components/project-list"
import ProjectListLoading from "./components/project-list-loading"
import { ErrorBoundary } from "react-error-boundary"
import H1 from "@/components/h1"
import { MotionItem } from "@/components/page-transition"

export const metadata = {
  title: 'Projects'
}

function ErrorFallback() {
  return (
    <div className="text-center py-12">
      <p className="text-lg text-[var(--text-muted)]">Cannot fetch projects at the moment</p>
    </div>
  )
}

export default async function ProjectsPage() {
  return (
    <div>
      <H1>Projects</H1>

      <MotionItem delay={0.1}>
        <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
          Open-source repositories and side projects I&apos;ve built.
          <span className="block mt-1 text-sm text-[var(--text-muted)]">
            Pulled live from my GitHub profile.
          </span>
        </p>
      </MotionItem>

      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<ProjectListLoading />}>
          <ProjectList />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
