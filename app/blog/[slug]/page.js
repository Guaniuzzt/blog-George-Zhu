import { notFound } from 'next/navigation'
import { getPostBySlug as getPostBySlugNotCached, getPosts } from '@/lib/posts'
import { cache } from 'react'
import Link from 'next/link'
import { MotionItem } from '@/components/page-transition'

const getPostBySlug = cache(
  async (slug) => await getPostBySlugNotCached(slug)
)

export async function generateMetadata({ params }) {
  try {
    const { frontmatter } = await getPostBySlug(params.slug)
    return {
      title: frontmatter.title,
      description: frontmatter.description || '',
      ...frontmatter,
    }
  } catch (e) {
    return {}
  }
}

export async function generateStaticParams() {
  const {posts} = await getPosts({ limit: 1000 })
  return posts.map(post => ({
    slug: post.slug
  }))
}

export default async function BlogPage({ params }) {
  let post
  try {
    post = await getPostBySlug(params.slug)
  } catch (error) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <MotionItem delay={0.05}>
          {/* Tags */}
          {post.frontmatter.tags && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.frontmatter.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/blog/?tags=${tag}`}
                  className="tag"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </MotionItem>

        <MotionItem delay={0.1}>
          {/* Title */}
          <h1 className="font-['Clash_Display'] font-bold text-3xl md:text-5xl leading-tight mb-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] bg-clip-text text-transparent">
            {post.frontmatter.title}
          </h1>
        </MotionItem>

        <MotionItem delay={0.15}>
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] font-mono">
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
            <span>{post.frontmatter.author || 'George Zhu'}</span>
          </div>
        </MotionItem>
      </div>

      {/* Content */}
      <MotionItem delay={0.2}>
        <div className="prose dark:prose-invert max-w-none">
          {post.content}
        </div>
      </MotionItem>

      {/* Footer Navigation */}
      <MotionItem delay={0.4}>
        <div className="mt-16 pt-8 border-t border-[var(--border-color)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300"
          >
            <span>←</span>
            <span>Back to all posts</span>
          </Link>
        </div>
      </MotionItem>
    </article>
  )
}
