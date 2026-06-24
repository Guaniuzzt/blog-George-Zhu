import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { prisma } from './prisma'
import H1 from '@/components/h1'
import type { Post } from '@/types'
import type { Prisma } from '@/lib/generated/prisma/client'

// 带标签关联的 Prisma 文章类型
type PostWithTags = Prisma.PostGetPayload<{
  include: { tags: { include: { tag: true } } }
}>

// Prisma 记录 → 前端使用的 frontmatter（不含编译内容）
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
      content: null, // 列表不需要正文
    })),
    total,
    totalPages: Math.ceil(total / limit),
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const record = await prisma.post.findUnique({
    where: { slug },
    include: { tags: { include: { tag: true } } },
  })

  if (!record) return null

  // 把存储的 MDX 源码编译成可渲染的 React 节点
  const { content } = await compileMDX({
    source: record.content,
    components: {
      h1: (props) => React.createElement(H1, props),
    },
    options: { parseFrontmatter: false },
  })

  return {
    slug: record.slug,
    frontmatter: toFrontmatter(record),
    content,
  }
}

export async function getAllTags(): Promise<string[]> {
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } })
  return tags.map((t) => t.name)
}