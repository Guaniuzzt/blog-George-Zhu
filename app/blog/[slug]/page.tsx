import { getPostBySlug, getPosts } from '@/lib/posts'
import { getTranslation } from '@/lib/i18n'
import useServerLanguage from '@/hooks/use-server-language'
import { MotionItem } from '@/components/page-transition'
import H1 from '@/components/h1'
import Card from '@/components/card'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug)
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    }
  } catch {
    return { title: 'Post not found' }
  }
}

export async function generateStaticParams() {
  const { posts } = await getPosts({ limit: 100 })
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post
  try {
    post = await getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  const lang = useServerLanguage()
  const dict = getTranslation(lang) as Record<string, string>
  const t = (key: string): string => dict[key] || key

  return (
    <article>
      <MotionItem delay={0.1}>
        <H1>{post.frontmatter.title}</H1>
      </MotionItem>

      <MotionItem delay={0.15}>
        <div className="flex items-center gap-4 mb-8 text-sm text-[var(--text-muted)]">
          <time dateTime={post.frontmatter.date}>
            {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
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

      <MotionItem delay={0.2}>
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          {post.content}
        </div>
      </MotionItem>

      <MotionItem delay={0.3}>
        <Card className="text-center">
          <p className="text-[var(--text-secondary)] mb-4 text-sm">
            {t('blog.readArticle')} →
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[var(--accent)] text-white text-sm font-medium hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            ← {t('nav.blog')}
          </Link>
        </Card>
      </MotionItem>
    </article>
  )
}
