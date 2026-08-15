import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { prisma } from './prisma'
import { unstable_cache } from 'next/cache'
import H1 from '@/components/h1'
import type { Post } from '@/types'
import type { Prisma } from '@/lib/generated/prisma/client'

type PostWithTags = Prisma.PostGetPayload<{
  include: { tags: { include: { tag: true } } }
}>

function toFrontmatter(record: PostWithTags) {
  return {
    title: record.title,
    description: record.description,
    date: record.date.toISOString().split('T')[0],
    tags: record.tags.map((pt) => pt.tag.name),
    author: record.author ?? undefined,
  }
}

export async function getPosts({
  newest = true,
  page = 1,
  limit = 3,
  tags,
}: {
  newest?: boolean
  page?: number
  limit?: number
  tags?: string[]
} = {}): Promise<{ posts: Post[]; total: number; totalPages: number }> {
  const cacheKey = `posts-${newest}-${page}-${limit}-${(tags ?? []).sort().join(',')}`

  const fetchPosts = unstable_cache(
    async () => {
      const where: Prisma.PostWhereInput = {
        published: true,
        ...(tags && tags.length > 0
          ? { tags: { some: { tag: { name: { in: tags } } } } }
          : {}),
      }

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

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fetchPost = unstable_cache(
    async () => {
      const record = await prisma.post.findUnique({
        where: { slug },
        include: { tags: { include: { tag: true } } },
      })

      if (!record) return null

      return {
        slug: record.slug,
        frontmatter: toFrontmatter(record),
        rawContent: record.content,
      }
    },
    [`post-${slug}`],
    { revalidate: 60, tags: ['posts', `post-${slug}`] }
  )

  const cached = await fetchPost()
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