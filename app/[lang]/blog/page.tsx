import { Suspense } from 'react'
import H1 from '@/components/h1'
import NewPostButton from '@/components/new-post-button'
import { BlogPostsSkeleton } from '@/components/blog-skeleton'
import {
  BlogPendingLink,
  BlogPendingOutlet,
  BlogPendingProvider,
} from '@/components/blog-pending'
import BlogPostList from './blog-post-list'
import { getTranslation, routeToLocale } from '@/lib/i18n'
import { getCurrentUser } from '@/lib/auth'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
}

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
  const lang = routeToLocale(params.lang)
  const dict = getTranslation(lang) as Record<string, string>
  const t = (key: string): string => dict[key] || key
  const prefix = `/${params.lang}`
  const order = searchParams.order ?? 'newest'
  const page = Number(searchParams.page) || 1
  const tagsKey = searchParams.tags ?? ''

  // 登录后列表进入「管理视图」：额外显示当前语言的草稿
  const user = await getCurrentUser()

  return (
    <BlogPendingProvider>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
        <H1>{t('blog.title')}</H1>
        <Suspense fallback={null}>
          <NewPostButton routePrefix={params.lang} />
        </Suspense>
      </div>

      <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
        {t('blog.desc')}
      </p>

      <hr />

      <div className="flex items-center gap-2 mb-8 text-sm">
        <span className="text-[var(--text-muted)]">{t('blog.sort')}</span>
        {order === 'newest' && (
          <BlogPendingLink
            href={`${prefix}/blog?order=oldest`}
            className="rounded-full border border-[var(--border-color)] px-3 py-1 text-[13px] text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
          >
            {t('blog.newest')}
          </BlogPendingLink>
        )}
        {order === 'oldest' && (
          <BlogPendingLink
            href={`${prefix}/blog?order=newest`}
            className="rounded-full border border-[var(--border-color)] px-3 py-1 text-[13px] text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]"
          >
            {t('blog.oldest')}
          </BlogPendingLink>
        )}
      </div>

      <BlogPendingOutlet fallback={<BlogPostsSkeleton />}>
        <Suspense key={`${order}-${page}-${tagsKey}`} fallback={<BlogPostsSkeleton />}>
          <BlogPostList
            tags={searchParams.tags?.split(',')}
            page={page}
            limit={Number(searchParams.limit) || 6}
            newest={order === 'newest'}
            prefix={prefix}
            lang={params.lang}
            locale={lang}
            includeDrafts={Boolean(user)}
          />
        </Suspense>
      </BlogPendingOutlet>
    </BlogPendingProvider>
  )
}
