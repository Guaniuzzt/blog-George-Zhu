import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // 后台与写作相关路径不进索引
      disallow: [
        '/cn/blog/new',
        '/eng/blog/new',
        '/cn/blog/*/edit',
        '/eng/blog/*/edit',
        '/cn/blog/*/preview',
        '/eng/blog/*/preview',
        '/cn/login',
        '/eng/login',
        '/auth/',
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
