import { getPosts } from '@/lib/posts'
import { SITE_URL, SITE_NAME } from '@/lib/site'
import { routeLocales, routeToLocale, localeToRoute } from '@/lib/i18n'
import type { RouteLocale } from '@/types'

export const revalidate = 3600

export function generateStaticParams() {
  return routeLocales.map((lang) => ({ lang }))
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(_request: Request, ctx: { params: { lang: string } }) {
  const route = ctx.params.lang as RouteLocale
  const locale = routeToLocale(route)
  const prefix = localeToRoute(locale)

  const { posts } = await getPosts({ newest: true, limit: 50, locale })

  const siteUrl = `${SITE_URL}/${prefix}`
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/${prefix}/blog/${post.slug}`
      return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>${
        post.frontmatter.tags?.length
          ? `\n      ${post.frontmatter.tags
              .map((tag) => `<category>${escapeXml(tag)}</category>`)
              .join('\n      ')}`
          : ''
      }
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(
      locale === 'zh' ? `${SITE_NAME} · 中文` : `${SITE_NAME} · English`
    )}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(
      locale === 'zh' ? '关于 Web 开发、设计和技术的思考' : 'Thoughts on web development, design, and technology.'
    )}</description>
    <language>${locale === 'zh' ? 'zh-CN' : 'en-US'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/${prefix}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
