import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import Pagination from '@/components/pagination'
import H1 from '@/components/h1'
import Card from '@/components/card'
import { MotionItem } from '@/components/page-transition'

export default async function BlogPostsPage(
  { searchParams }
) {
  const tags = searchParams.tags?.split(',')
  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 6
  const order = searchParams.order ?? 'newest'
  const { posts, pageCount } = await getPosts({
    tags,
    newest: order === 'newest',
    page,
    limit
  })

  return (
    <>
      <H1>Blog</H1>

      <MotionItem delay={0.1}>
        <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
          Thoughts on web development, design, and technology.
        </p>
      </MotionItem>

      <MotionItem delay={0.15}>
        <hr />
      </MotionItem>

      {/* Order Toggle */}
      <MotionItem delay={0.2}>
        <div className="flex items-center gap-2 mb-8 text-sm">
          <span className="text-[var(--text-muted)]">Sort:</span>
          {order === 'newest' && (
            <Link
              href="/blog?order=oldest"
              className="px-3 py-1 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
            >
              Newest ↓
            </Link>
          )}
          {order === 'oldest' && (
            <Link
              href="/blog?order=newest"
              className="px-3 py-1 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
            >
              Oldest ↑
            </Link>
          )}
        </div>
      </MotionItem>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <MotionItem delay={0.25}>
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-xl text-[var(--text-muted)]">No posts found</p>
            <Link href="/blog" className="mt-4 inline-block text-[var(--accent)] hover:underline">
              Clear filters
            </Link>
          </div>
        </MotionItem>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <MotionItem key={post.slug} delay={0.05 * i}>
              <Card href={`/blog/${post.slug}`}>
                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  {post.frontmatter.date}
                </div>

                {/* Title */}
                <h3 className="text-xl font-['Clash_Display'] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300 mb-3 line-clamp-2">
                  {post.frontmatter.title}
                </h3>

                {/* Tags */}
                {post.frontmatter.tags && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.frontmatter.tags.map(tag => (
                      <span key={tag} className="tag text-[0.65rem]">#{tag}</span>
                    ))}
                  </div>
                )}

                {/* Read more link */}
                <span className="inline-flex items-center gap-1 text-sm text-[var(--accent)] font-medium group-hover:gap-2 transition-all duration-300">
                  Read article
                  <span className="text-base">→</span>
                </span>
              </Card>
            </MotionItem>
          ))}
        </div>
      )}

      {/* Pagination */}
      <MotionItem delay={0.3}>
        <div className="mt-12">
          <Pagination pageCount={pageCount} />
        </div>
      </MotionItem>
    </>
  )
}
