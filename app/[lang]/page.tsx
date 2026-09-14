import { getPosts, getPostStats } from '@/lib/posts'
import Link from 'next/link'
import Card from '@/components/card'
import Reveal from '@/components/reveal'
import HomeHero from '@/components/home-hero'
import TechMarquee from '@/components/tech-marquee'
import { getTranslation, routeToLocale } from '@/lib/i18n'

export const dynamic = 'force-static'
export const revalidate = 60

export default async function Home({ params }: { params: { lang: string } }) {
  const lang = routeToLocale(params.lang)
  const [{ posts }, stats] = await Promise.all([
    getPosts({ newest: true, limit: 3, locale: lang }),
    getPostStats(),
  ])
  const dict = getTranslation(lang) as Record<string, string>
  const t = (key: string): string => dict[key] || key
  const prefix = `/${params.lang}`

  return (
    <Reveal>
      <HomeHero prefix={prefix} lang={lang} stats={stats} />
      <TechMarquee />

      <section className="pt-24">
        <div className="rv flex items-end justify-between mb-10">
          <div>
            <div className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t('section.writing')}
            </div>
            <h2 className="mt-3 font-serif text-[clamp(28px,3.6vw,42px)] font-semibold tracking-tightest">
              {t('section.featured')}
            </h2>
          </div>
          <Link
            href={`${prefix}/blog`}
            className="link-underline hidden text-[14px] font-medium text-[var(--text-primary)] sm:block"
          >
            {t('home.viewAll')} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <Card
              key={post.slug}
              href={`${prefix}/blog/${post.slug}`}
              className="rv !p-0 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex flex-col items-center px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] min-w-[3.5rem]">
                      <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                        {new Date(post.frontmatter.date).toLocaleString('default', {
                          month: 'short',
                        })}
                      </span>
                      <span className="text-xl font-display font-semibold text-[var(--accent)] leading-none">
                        {new Date(post.frontmatter.date).getDate()}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-display font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300 truncate">
                      {post.frontmatter.title}
                    </h3>
                    {post.frontmatter.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {post.frontmatter.tags.map((tag) => (
                          <span key={tag} className="tag text-[0.65rem]">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0 self-end sm:self-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-color)] text-[var(--text-muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-300">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </Reveal>
  )
}
