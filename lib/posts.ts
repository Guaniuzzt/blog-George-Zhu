import fs from 'fs'
import path from 'path'
import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import H1 from '@/components/h1'
import type { Post } from '@/types'

export function loadPost(slug: string): string {
  const filename = slug.endsWith('.mdx') ? slug : `${slug}.mdx`
  return fs.readFileSync(
    path.join(process.cwd(), 'content', filename),
    'utf-8'
  )
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const source = loadPost(slug)

  const { frontmatter, content } = await compileMDX<Post['frontmatter']>({
    source,
    components: {
      h1: (props) => React.createElement(H1, props),
    },
    options: {
      parseFrontmatter: true,
    },
  })

  return {
    slug: slug.replace('.mdx', ''),
    frontmatter,
    content,
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
  const files = fs.readdirSync(path.join(process.cwd(), 'content'))

  const allPosts = await Promise.all(
    files.map((filename) => getPostBySlug(filename))
  )

  let filteredPosts = allPosts

  if (tags && tags.length > 0) {
    filteredPosts = filteredPosts.filter((post) =>
      post.frontmatter.tags?.some((tag) => tags.includes(tag))
    )
  }

  filteredPosts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime()
    const dateB = new Date(b.frontmatter.date).getTime()
    return newest ? dateB - dateA : dateA - dateB
  })

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  return {
    posts: filteredPosts.slice(startIndex, endIndex),
    total: filteredPosts.length,
    totalPages: Math.ceil(filteredPosts.length / limit),
  }
}

export async function getAllTags(): Promise<string[]> {
  const { posts } = await getPosts({ limit: 1000 })
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}