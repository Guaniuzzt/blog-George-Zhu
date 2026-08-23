import { getPostMetaBySlug } from '@/lib/posts'
import { getTranslation, routeToLocale, localeToRoute } from '@/lib/i18n'
import { getCurrentUser } from '@/lib/auth'
import { MotionItem } from '@/components/page-transition'
import PostAdminActions from '@/components/post-admin-actions'
import PostContent from '../post-content'
import H1 from '@/components/h1'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'

// 动态路由：鉴权需要读 cookies，不走 ISR
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

  // 语言不匹配 → 重定向到正确语言的预览页
  const lang = routeToLocale(params.lang)
  if (post.locale !== lang) {
    redirect(`/${localeToRoute(post.locale)}/blog/${params.slug}/preview`)
  }

  // 服务端鉴权（middleware 已拦截未登录用户，这里是纵深防御）
  const user = await getCurrentUser()
  if (!user) {
    notFound()
  }

  const isDraft = post.frontmatter.published === false
  const dict = getTranslation(lang) as Record<string, string>
  const t = (key: string): string => dict[key] || key
  const prefix = `/${params.lang}`

  return (
    <article>
      <MotionItem delay={0.05}>
        <div className="mb-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-500">
          {isDraft
            ? lang === 'zh'
              ? '草稿预览 — 此内容仅你可见，未发布'
              : 'Draft preview — only visible to you, not published'
            : lang === 'zh'
              ? '此文章已发布。预览页面不对搜索引擎开放。'
              : 'This post is published. This preview page is not indexed.'}
        </div>
      </MotionItem>

      <MotionItem delay={0.1}>
        <H1>{post.frontmatter.title}</H1>
      </MotionItem>

      <MotionItem delay={0.15}>
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-[var(--text-muted)]">
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString(
              lang === 'zh' ? 'zh-CN' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )}
          </time>
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.frontmatter.tags.map((tag) => (
                <span key={tag} className="tag text-[0.65rem]">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </MotionItem>

      <PostContent slug={params.slug} />

      <MotionItem delay={0.25}>
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <PostAdminActions
            slug={params.slug}
            published={!isDraft}
            variant="preview"
          />
          <Link
            href={`${prefix}/blog`}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
          >
            ← {t('nav.blog')}
          </Link>
        </div>
      </MotionItem>
    </article>
  )
}
