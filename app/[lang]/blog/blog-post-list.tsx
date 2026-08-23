import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import Pagination from '@/components/pagination'
import Card from '@/components/card'
import { MotionItem } from '@/components/page-transition'
import PostAdminActions from '@/components/post-admin-actions'
import { getTranslation, routeToLocale } from '@/lib/i18n'
import type { Locale } from '@/types'

export default async function BlogPostList({
  tags,
  page,
  limit,
  newest,
  prefix,
  lang,
  locale,
  includeDrafts = false,
}: {
  tags?: string[]
  page: number
  limit: number
  newest: boolean
  prefix: string
  lang: string
  locale: Locale
  includeDrafts?: boolean
}) {
  const t = (key: string): string =>
    (getTranslation(routeToLocale(lang)) as Record<string, string>)[key] || key

  const { posts, totalPages } = await getPosts({
    tags,
    newest,
    page,
    limit,
    locale,
    includeDrafts,
  })

  if (posts.length === 0) {
    return (
      <MotionItem>
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
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <MotionItem key={post.slug}>
            <Card
              href={
                post.frontmatter.published === false
                  ? `${prefix}/blog/${post.slug}/preview`
                  : `${prefix}/blog/${post.slug}`
              }
            >
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                {post.frontmatter.date}
                {post.frontmatter.published === false && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 font-sans">
                    {lang === 'cn' ? '草稿' : 'Draft'}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-display font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-3 line-clamp-2">
                {post.frontmatter.title}
              </h3>

              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.frontmatter.tags.map((tag) => (
                    <span key={tag} className="tag text-[0.65rem]">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-end justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-sm text-[var(--accent)] font-medium group-hover:gap-2 transition-all duration-300">
                  {t('blog.readArticle')}
                  <span className="text-base">→</span>
                </span>
              </div>

              {/* 登录后才渲染（组件内部客户端鉴权） */}
              <PostAdminActions
                slug={post.slug}
                published={post.frontmatter.published !== false}
              />
            </Card>
          </MotionItem>
        ))}
      </div>

      <MotionItem>
        <div className="mt-12">
          <Pagination pageCount={totalPages} />
        </div>
      </MotionItem>
    </>
  )
}
