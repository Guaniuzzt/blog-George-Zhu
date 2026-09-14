import { getPostMetaBySlug, getPublishedPostMetas } from '@/lib/posts'
import { getTranslation, routeToLocale, localeToRoute } from '@/lib/i18n'
import { SITE_URL, SITE_NAME, SITE_AUTHOR } from '@/lib/site'
import { BlogPostContentSkeleton } from '@/components/blog-skeleton'
import PostAdminActions from '@/components/post-admin-actions'
import PostHeader from '@/components/post-header'
import PostContent from './post-content'
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

  const lang = routeToLocale(params.lang)
  if (post.locale !== lang) {
    redirect(`/${localeToRoute(post.locale)}/blog/${post.slug}`)
  }

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
    <article className="mx-auto w-full max-w-[720px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PostHeader
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        tags={post.frontmatter.tags}
        backHref={`${prefix}/blog`}
        backLabel={t('nav.blog')}
      />

      <Suspense fallback={<BlogPostContentSkeleton />}>
        <PostContent slug={params.slug} />
      </Suspense>

      <PostAdminActions slug={params.slug} published variant="page" />
    </article>
  )
}
