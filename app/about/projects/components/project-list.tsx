import Card from '@/components/card'
import { MotionItem } from '@/components/page-transition'
import type { Repo } from '@/types'

async function getRepos(): Promise<Repo[]> {
  try {
    const response = await fetch(
      'https://api.github.com/users/Guaniuzzt/repos',
      { next: { revalidate: 3600 } }
    )
    if (!response.ok) throw new Error('Failed to fetch')
    return (await response.json()) as Repo[]
  } catch {
    // GitHub API 失败时回退到本地 json-server
    const response = await fetch('http://localhost:3001/repos', {
      cache: 'no-store',
    })
    return (await response.json()) as Repo[]
  }
}

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
  let repos: Repo[] = []
  let error: string | null = null

  try {
    repos = await getRepos()
  } catch {
    error = 'Unable to load projects. Please try again later.'
  }

  if (error) {
    return (
      <MotionItem delay={0.2}>
        <div className="text-center py-12 text-[var(--text-muted)]">
          <p className="text-lg">{error}</p>
        </div>
      </MotionItem>
    )
  }

  const sortedRepos = [...repos].sort(
    (a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {sortedRepos.map((repo, i) => (
        <MotionItem key={repo.id} delay={0.05 * i}>
          <Card href={repo.html_url} className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-3 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                <h3 className="font-['Clash_Display'] font-semibold text-[var(--text-primary)] truncate">
                  {repo.name ?? repo.title}
                </h3>
              </div>
              {repo.stargazers_count > 0 && (
                <div className="flex items-center gap-1 flex-shrink-0 px-2 py-0.5 rounded-lg bg-[var(--bg-tertiary)]">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    {repo.stargazers_count}
                  </span>
                </div>
              )}
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 line-clamp-3">
              {repo.description || 'No description'}
            </p>

            {repo.language && (
              <div className="mt-4 flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: getLanguageColor(repo.language) }}
                />
                <span className="text-xs text-[var(--text-muted)] font-mono">
                  {repo.language}
                </span>
              </div>
            )}
          </Card>
        </MotionItem>
      ))}
    </div>
  )
}