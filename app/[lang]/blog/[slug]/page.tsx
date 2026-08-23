import { getPostMetaBySlug, getPublishedPostMetas } from '@/lib/posts'
import { getTranslation, routeToLocale, localeToRoute } from '@/lib/i18n'
import { SITE_URL, SITE_NAME, SITE_AUTHOR } from '@/lib/site'
import { MotionItem } from '@/components/page-transition'
import { BlogPostContentSkeleton } from '@/components/blog-skeleton'
import PostAdminActions from '@/components/post-admin-actions'
import PostContent from './post-content'
import H1 from '@/components/h1'
import Card from '@/components/card'
import Link from 'next/link'
import { Suspense } from 'react'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: { lang: string; slug: string }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostMetaBySlug(params.slug)
  if (!post) return {}

  const url = `${SITE_URL}/${params.lang}/blog/${params.slug}`
  const isDraft = post.frontmatter.published === false
  // 语言不匹配 / 草稿：页面会 404，metadata 不暴露文章信息
  const wrongLocale = post.locale !== routeToLocale(params.lang)
  if (wrongLocale || isDraft) {
    return { title: 'Not Found', robots: { index: false, follow: false } }
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description || '',
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      title: post.frontmatter.title,
      description: post.frontmatter.description || '',
      siteName: SITE_NAME,
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updatedAt,
      authors: [post.frontmatter.author ?? SITE_AUTHOR],
      tags: post.frontmatter.tags,
      locale: post.locale === 'zh' ? 'zh_CN' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description || '',
    },
  }
}

export async function generateStaticParams() {
  // 精确的 (lang, slug) 组合：中文文章只生成 /cn 前缀页，英文只生成 /eng
  const posts = await getPublishedPostMetas()
  return posts.map((post) => ({
    lang: localeToRoute(post.locale),
    slug: post.slug,
  }))
}

export const revalidate = 60

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostMetaBySlug(params.slug)
  if (!post) {
    notFound()
  }

  // 语言匹配：中文文章在 /eng 前缀下（或反之）重定向到正确语言的 URL
  const lang = routeToLocale(params.lang)
  if (post.locale !== lang) {
    redirect(`/${localeToRoute(post.locale)}/blog/${post.slug}`)
  }

  // 草稿一律 404（本页面是纯静态 ISR 路由，不能访问 cookies 做鉴权；
  // 登录后的草稿预览走 /blog/[slug]/preview 动态路由）
  if (post.frontmatter.published === false) {
    notFound()
  }

  const dict = getTranslation(lang) as Record<string, string>
  const t = (key: string): string => dict[key] || key
  const prefix = `/${params.lang}`

  const postUrl = `${SITE_URL}/${params.lang}/blog/${params.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updatedAt ?? post.frontmatter.date,
    author: {
      '@type': 'Person',
      name: post.frontmatter.author ?? SITE_AUTHOR,
    },
    url: postUrl,
    mainEntityOfPage: postUrl,
    keywords: post.frontmatter.tags?.join(', '),
    inLanguage: post.locale === 'zh' ? 'zh-CN' : 'en',
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MotionItem delay={0.1}>
        <H1>{post.frontmatter.title}</H1>
      </MotionItem>

      <MotionItem delay={0.15}>
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-[var(--text-muted)]">
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString(
              lang === 'zh' ? 'zh-CN' : 'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
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

      <Suspense fallback={<BlogPostContentSkeleton />}>
        <PostContent slug={params.slug} />
      </Suspense>

      <MotionItem delay={0.25}>
        <Card className="!bg-transparent">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-[var(--text-secondary)] text-sm">
              {t('blog.readArticle')} →
            </p>
            <Link
              href={`${prefix}/blog`}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              ← {t('nav.blog')}
            </Link>
          </div>
        </Card>
      </MotionItem>

      {/* 登录后才渲染（组件内部客户端鉴权）：编辑 / 下架 / 删除 */}
      <MotionItem delay={0.3}>
        <PostAdminActions slug={params.slug} published variant="page" />
      </MotionItem>
    </article>
  )
}
