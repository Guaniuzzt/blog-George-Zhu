import Link from 'next/link'
import { Suspense } from 'react'
import { getPosts } from '@/lib/posts'
import Pagination from '@/components/pagination'
import H1 from '@/components/h1'
import Card from '@/components/card'
import NewPostButton from '@/components/new-post-button'
import { MotionItem } from '@/components/page-transition'
import { getTranslation, routeToLocale } from '@/lib/i18n'

interface BlogPageProps {
  params: { lang: string }
  searchParams: {
    tags?: string
    page?: string
    limit?: string
    order?: string
  }
}

export default async function BlogPostsPage({ params, searchParams }: BlogPageProps) {
  const tags = searchParams.tags?.split(',')
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 6
  const order = searchParams.order ?? 'newest'

  const { posts, totalPages } = await getPosts({
    tags,
    newest: order === 'newest',
    page,
    limit,
  })

  const lang = routeToLocale(params.lang)
  const dict = getTranslation(lang) as Record<string, string>
  const t = (key: string): string => dict[key] || key
  const prefix = `/${params.lang}`

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
        <H1>{t('blog.title')}</H1>
        <Suspense>
          <NewPostButton routePrefix={params.lang} />
        </Suspense>
      </div>

      <MotionItem delay={0.1}>
        <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
          {t('blog.desc')}
        </p>
      </MotionItem>

      <MotionItem delay={0.15}>
        <hr />
      </MotionItem>

      <MotionItem delay={0.2}>
        <div className="flex items-center gap-2 mb-8 text-sm">
          <span className="text-[var(--text-muted)]">{t('blog.sort')}</span>
          {order === 'newest' && (
            <Link
              href={`${prefix}/blog?order=oldest`}
              className="px-3 py-1 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
            >
              {t('blog.newest')}
            </Link>
          )}
          {order === 'oldest' && (
            <Link
              href={`${prefix}/blog?order=newest`}
              className="px-3 py-1 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
            >
              {t('blog.oldest')}
            </Link>
          )}
        </div>
      </MotionItem>

      {posts.length === 0 ? (
        <MotionItem delay={0.25}>
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl text-[var(--text-muted)]">{t('blog.noPosts')}</p>
            <Link
              href={`${prefix}/blog`}
              className="mt-4 inline-block text-[var(--accent)] hover:underline"
            >
              {t('blog.clearFilters')}
            </Link>
          </div>
        </MotionItem>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <MotionItem key={post.slug} delay={0.05 * i}>
              <Card href={`${prefix}/blog/${post.slug}`}>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  {post.frontmatter.date}
                </div>

                <h3 className="text-xl font-['Clash_Display'] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-3 line-clamp-2">
                  {post.frontmatter.title}
                </h3>

                {post.frontmatter.tags && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.frontmatter.tags.map((tag) => (
                      <span key={tag} className="tag text-[0.65rem]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <span className="inline-flex items-center gap-1 text-sm text-[var(--accent)] font-medium group-hover:gap-2 transition-all duration-300">
                  {t('blog.readArticle')}
                  <span className="text-base">→</span>
                </span>
              </Card>
            </MotionItem>
          ))}
        </div>
      )}

      <MotionItem delay={0.3}>
        <div className="mt-12">
          <Pagination pageCount={totalPages} />
        </div>
      </MotionItem>
    </>
  )
}
