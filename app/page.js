import H1 from "@/components/h1"
import { getPosts } from "@/lib/posts"
import Link from 'next/link'
import Card from "@/components/card"
import { MotionItem } from "@/components/page-transition"

export default async function Home() {
  const { posts } = await getPosts({
    newest: true, limit: 3
  })

  return (
    <>
      {/* Hero Section */}
      <section className="mb-20 relative">
        {/* Floating accent shapes */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[var(--accent)]/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute top-20 -left-20 w-48 h-48 bg-[var(--accent2)]/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '-3s' }} />

        <div className="max-w-2xl">
          <H1 className="mb-4">Hey, I&apos;m George Zhu</H1>

          <MotionItem delay={0.15}>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-4 leading-relaxed">
              A <span className="text-[var(--accent)] font-semibold">full-stack developer</span> who crafts
              <span className="text-[var(--accent2)] font-semibold"> digital experiences </span>
              at the intersection of code and creativity.
            </p>
          </MotionItem>

          <MotionItem delay={0.25}>
            <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
              I build performant web applications with modern technologies.
              When I&apos;m not coding, you&apos;ll find me exploring new tools,
              writing about tech, or capturing moments through my lens.
            </p>
          </MotionItem>

          <MotionItem delay={0.35}>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                View Projects
                <span className="text-lg">→</span>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-color)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Read Blog
              </Link>
            </div>
          </MotionItem>
        </div>
      </section>

      {/* Divider */}
      <MotionItem delay={0.4}>
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
          <span className="text-xs font-mono text-[var(--text-muted)] tracking-widest uppercase">Latest Posts</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent" />
        </div>
      </MotionItem>

      {/* Blog Posts */}
      <section>
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post, i) => (
            <MotionItem key={post.slug} delay={0.1 * i}>
              <Card href={`/blog/${post.slug}`} className="!p-0 overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    {/* Date badge */}
                    <div className="flex-shrink-0">
                      <div className="inline-flex flex-col items-center px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] min-w-[3.5rem]">
                        <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                          {new Date(post.frontmatter.date).toLocaleString('default', { month: 'short' })}
                        </span>
                        <span className="text-xl font-['Clash_Display'] font-semibold text-[var(--accent)] leading-none">
                          {new Date(post.frontmatter.date).getDate()}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-['Clash_Display'] font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300 truncate">
                        {post.frontmatter.title}
                      </h3>
                      {post.frontmatter.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {post.frontmatter.tags.map(tag => (
                            <span key={tag} className="tag text-[0.65rem]">#{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 self-end sm:self-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-color)] text-[var(--text-muted)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </MotionItem>
          ))}
        </div>

        {/* View All */}
        <MotionItem delay={0.5}>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300"
            >
              <span>View all posts</span>
              <span className="text-lg">→</span>
            </Link>
          </div>
        </MotionItem>
      </section>
    </>
  )
}
