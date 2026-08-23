import type { MetadataRoute } from 'next'
import { getPublishedPostMetas } from '@/lib/posts'
import { SITE_URL } from '@/lib/site'
import { routeLocales, localeToRoute } from '@/lib/i18n'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = []

  for (const locale of routeLocales) {
    staticEntries.push(
      {
        url: `${SITE_URL}/${locale}`,
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${SITE_URL}/${locale}/blog`,
        changeFrequency: 'daily',
        priority: 0.8,
      },
      {
        url: `${SITE_URL}/${locale}/about`,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${SITE_URL}/${locale}/about/projects`,
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${SITE_URL}/${locale}/photos`,
        changeFrequency: 'monthly',
        priority: 0.3,
      }
    )
  }

  const posts = await getPublishedPostMetas()
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${localeToRoute(post.locale)}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticEntries, ...postEntries]
}
