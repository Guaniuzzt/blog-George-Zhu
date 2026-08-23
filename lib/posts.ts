import React, { cache } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { prisma } from './prisma'
import { unstable_cache } from 'next/cache'
import H1 from '@/components/h1'
import type { Post, PostFrontmatter, Locale } from '@/types'
import type { Prisma } from '@/lib/generated/prisma/client'

type PostWithTags = Prisma.PostGetPayload<{
  include: { tags: { include: { tag: true } } }
}>

function toFrontmatter(record: PostWithTags): PostFrontmatter {
  return {
    title: record.title,
    description: record.description,
    date: record.date.toISOString().split('T')[0],
    tags: record.tags.map((pt) => pt.tag.name),
    author: record.author ?? undefined,
    published: record.published,
    updatedAt: record.updatedAt.toISOString(),
  }
}

/**
 * 文章列表查询。
 *
 * - 公开访问（includeDrafts=false，默认）：只返回已发布文章，结果走
 *   unstable_cache（ISR 数据缓存）。
 * - 登录后的管理视图（includeDrafts=true）：直接查库、包含草稿。
 *   ⚠️ 草稿绝不进入 unstable_cache——缓存是全局共享的，
 *   否则未登录访问者也可能读到草稿内容。
 */
export async function getPosts({
  newest = true,
  page = 1,
  limit = 3,
  tags,
  locale,
  includeDrafts = false,
}: {
  newest?: boolean
  page?: number
  limit?: number
  tags?: string[]
  locale?: Locale
  includeDrafts?: boolean
} = {}): Promise<{ posts: Post[]; total: number; totalPages: number }> {
  const where: Prisma.PostWhereInput = {
    ...(includeDrafts ? {} : { published: true }),
    ...(locale ? { locale } : {}),
    ...(tags && tags.length > 0
      ? { tags: { some: { tag: { name: { in: tags } } } } }
      : {}),
  }

  // 管理视图：实时查库，含草稿，不缓存
  if (includeDrafts) {
    const [records, total] = await Promise.all([
      prisma.post.findMany({
        where,
        include: { tags: { include: { tag: true } } },
        orderBy: { date: newest ? 'desc' : 'asc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ])

    return {
      posts: records.map((record) => ({
        slug: record.slug,
        frontmatter: toFrontmatter(record),
        content: null,
      })),
      total,
      totalPages: Math.ceil(total / limit),
    }
  }

  // 公开视图：缓存
  const cacheKey = `posts-${newest}-${page}-${limit}-${(tags ?? [])
    .slice()
    .sort()
    .join(',')}-${locale ?? 'all'}`

  const fetchPosts = unstable_cache(
    async () => {
      const [records, total] = await Promise.all([
        prisma.post.findMany({
          where,
          include: { tags: { include: { tag: true } } },
          orderBy: { date: newest ? 'desc' : 'asc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.post.count({ where }),
      ])

      return {
        posts: records.map((record) => ({
          slug: record.slug,
          frontmatter: toFrontmatter(record),
          content: null,
        })),
        total,
        totalPages: Math.ceil(total / limit),
      }
    },
    [cacheKey],
    { revalidate: 60, tags: ['posts'] }
  )

  return fetchPosts()
}

type CachedPostRecord = {
  slug: string
  locale: string
  frontmatter: PostFrontmatter
  rawContent: string
}

const getPostRecord = cache(async (slug: string): Promise<CachedPostRecord | null> => {
  const fetchPost = unstable_cache(
    async () => {
      const record = await prisma.post.findUnique({
        where: { slug },
        include: { tags: { include: { tag: true } } },
      })

      if (!record) return null

      return {
        slug: record.slug,
        locale: record.locale,
        frontmatter: toFrontmatter(record),
        rawContent: record.content,
      }
    },
    [`post-${slug}`],
    { revalidate: 60, tags: ['posts', `post-${slug}`] }
  )

  return fetchPost()
})

export const getPostMetaBySlug = cache(async (slug: string) => {
  const record = await getPostRecord(slug)
  if (!record) return null
  return {
    slug: record.slug,
    locale: record.locale as Locale,
    frontmatter: record.frontmatter,
  }
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const cached = await getPostRecord(slug)
  if (!cached) return null

  const { content } = await compileMDX({
    source: cached.rawContent,
    components: {
      h1: (props) => React.createElement(H1, props),
    },
    options: { parseFrontmatter: false },
  })

  return {
    slug: cached.slug,
    frontmatter: cached.frontmatter,
    content,
  }
})

/** 编辑表单用：实时读库（不缓存），返回完整记录 */
export async function getPostForEdit(slug: string) {
  const record = await prisma.post.findUnique({
    where: { slug },
    include: { tags: { include: { tag: true } } },
  })
  if (!record) return null

  return {
    slug: record.slug,
    title: record.title,
    description: record.description,
    content: record.content,
    locale: record.locale,
    published: record.published,
    tags: record.tags.map((pt) => pt.tag.name),
  }
}

/** sitemap / RSS 用：已发布文章的 slug + locale + 元信息 */
export async function getPublishedPostMetas() {
  const records = await prisma.post.findMany({
    where: { published: true },
    select: {
      slug: true,
      title: true,
      description: true,
      date: true,
      updatedAt: true,
      locale: true,
      author: true,
    },
    orderBy: { date: 'desc' },
  })

  return records.map((r) => ({
    slug: r.slug,
    title: r.title,
    description: r.description,
    date: r.date.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
    locale: r.locale as Locale,
    author: r.author,
  }))
}

export async function getAllTags(): Promise<string[]> {
  const fetchTags = unstable_cache(
    async () => {
      const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } })
      return tags.map((t) => t.name)
    },
    ['all-tags'],
    { revalidate: 120, tags: ['tags'] }
  )

  return fetchTags()
}
