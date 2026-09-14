import { getPostMetaBySlug } from '@/lib/posts'
import { getTranslation, routeToLocale, localeToRoute } from '@/lib/i18n'
import { getCurrentUser } from '@/lib/auth'
import PostAdminActions from '@/components/post-admin-actions'
import PostHeader from '@/components/post-header'
import PostContent from '../post-content'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Draft Preview',
  robots: { index: false, follow: false },
}

interface PreviewPageProps {
  params: { lang: string; slug: string }
}

export default async function DraftPreviewPage({ params }: PreviewPageProps) {
  const post = await getPostMetaBySlug(params.slug)
  if (!post) {
    notFound()
  }

  const lang = routeToLocale(params.lang)
  if (post.locale !== lang) {
    redirect(`/${localeToRoute(post.locale)}/blog/${params.slug}/preview`)
  }

  const user = await getCurrentUser()
  if (!user) {
    notFound()
  }

  const isDraft = post.frontmatter.published === false
  const dict = getTranslation(lang) as Record<string, string>
  const t = (key: string): string => dict[key] || key
  const prefix = `/${params.lang}`

  return (
    <article className="mx-auto w-full max-w-[720px]">
      <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-400">
        {isDraft
          ? lang === 'zh'
            ? '草稿预览 — 此内容仅你可见，未发布'
            : 'Draft preview — only visible to you, not published'
          : lang === 'zh'
            ? '此文章已发布。预览页面不对搜索引擎开放。'
            : 'This post is published. This preview page is not indexed.'}
      </div>

      <PostHeader
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
        backHref={`${prefix}/blog`}
        backLabel={t('nav.blog')}
      />

      <PostContent slug={params.slug} />

      <PostAdminActions
        slug={params.slug}
        published={!isDraft}
        variant="preview"
      />
    </article>
  )
}
