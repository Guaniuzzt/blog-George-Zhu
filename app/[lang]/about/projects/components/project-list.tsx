import Card from '@/components/card'
import { MotionItem } from '@/components/page-transition'
import { prisma } from '@/lib/prisma'

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  HTML: '#e34f26',
  CSS: '#563d7c',
  Ruby: '#cc342d',
  Go: '#00add8',
  Rust: '#dea584',
  Vue: '#4fc08d',
  Shell: '#89e051',
  Java: '#b07219',
  default: '#8b8b8b',
}

function getLanguageColor(lang: string): string {
  return LANGUAGE_COLORS[lang] || LANGUAGE_COLORS.default
}

export default async function ProjectList() {
  const projects = await prisma.project.findMany({
    orderBy: { stargazersCount: 'desc' },
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.map((project, i) => (
        <MotionItem key={project.id} delay={0.05 * i}>
          <Card href={project.url ?? undefined} className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-3 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                <h3 className="font-['Clash_Display'] font-semibold text-[var(--text-primary)] truncate">
                  {project.name}
                </h3>
              </div>
              {project.stargazersCount > 0 && (
                <div className="flex items-center gap-1 flex-shrink-0 px-2 py-0.5 rounded-lg bg-[var(--bg-tertiary)]">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    {project.stargazersCount}
                  </span>
                </div>
              )}
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 line-clamp-3">
              {project.description || 'No description'}
            </p>

            {project.language && (
              <div className="mt-4 flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: getLanguageColor(project.language) }}
                />
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  {project.language}
                </span>
              </div>
            )}
          </Card>
        </MotionItem>
      ))}
    </div>
  )
}