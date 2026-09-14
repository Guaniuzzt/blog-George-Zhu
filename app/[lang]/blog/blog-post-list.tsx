import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import Pagination from '@/components/pagination'
import PostRow from '@/components/post-row'
import Reveal from '@/components/reveal'
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
      <div className="py-20 text-center">
        <p className="font-serif text-xl text-[var(--text-primary)]">
          {t('blog.noPosts')}
        </p>
        <Link
          href={`${prefix}/blog`}
          className="link-underline mt-4 inline-block text-[14px] font-medium text-[var(--text-primary)]"
        >
          {t('blog.clearFilters')}
        </Link>
      </div>
    )
  }

  return (
    <Reveal>
      <div>
        {posts.map((post, i) => (
          <PostRow
            key={post.slug}
            post={post}
            index={(page - 1) * limit + i}
            prefix={prefix}
            draftLabel={t('blog.draft')}
            showAdmin
            className={i === 0 ? 'rv' : `rv rv-d${Math.min(i, 4)}`}
          />
        ))}
      </div>

      <div className="mt-12">
        <Pagination pageCount={totalPages} />
      </div>
    </Reveal>
  )
}
