import fs from 'fs'
import path from 'path'
import React from 'react'
import { cache } from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import H1 from '@/components/h1'
import type { Post, PostFrontmatter } from '@/types'

const contentDir = path.join(process.cwd(), 'content')

// ============ 轻量 frontmatter 解析（不编译 MDX，极快） ============

function parseFrontmatter(fileContent: string): PostFrontmatter {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return { title: '', description: '', date: '' }

  const frontmatter: Record<string, unknown> = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    let value: unknown = line.slice(colonIdx + 1).trim()

    if (typeof value === 'string') {
      // 解析数组格式 [a, b, c]
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .map((s: string) => s.trim().replace(/['"]/g, ''))
      }
      // 去掉引号
      else if (
        (value.startsWith("'") && value.endsWith("'")) ||
        (value.startsWith('"') && value.endsWith('"'))
      ) {
        value = value.slice(1, -1)
      }
    }

    frontmatter[key] = value
  }
  return frontmatter as unknown as PostFrontmatter
}

// ============ 文件读取 ============

function readMdxFile(slug: string): string {
  const filename = slug.endsWith('.mdx') ? slug : `${slug}.mdx`
  return fs.readFileSync(path.join(contentDir, filename), 'utf-8')
}

// ============ MDX 编译（用 React cache 去重同一请求内的重复编译） ============

export const compilePostMdx = cache(
  async (slug: string): Promise<{ content: Post['content']; frontmatter: PostFrontmatter }> => {
    const source = readMdxFile(slug)
    const { frontmatter, content } = await compileMDX<PostFrontmatter>({
      source,
      components: {
        h1: (props) => React.createElement(H1, props),
      },
      options: {
        parseFrontmatter: true,
      },
    })
    return { content, frontmatter }
  }
)

// ============ 获取单篇文章详情（含编译后 content） ============

export async function getPostBySlug(slug: string): Promise<Post> {
  const cleanSlug = slug.replace('.mdx', '')
  const { content, frontmatter } = await compilePostMdx(cleanSlug)
  return {
    slug: cleanSlug,
    frontmatter,
    content,
  }
}

// ============ 获取文章列表（核心优化：先过滤再编译） ============

interface GetPostsOptions {
  newest?: boolean
  page?: number
  limit?: number
  tags?: string[]
}

export async function getPosts({
  newest = true,
  page = 1,
  limit = 3,
  tags,
}: GetPostsOptions = {}): Promise<{ posts: Post[]; total: number; totalPages: number }> {
  const files = fs.readdirSync(contentDir)

  // 第一步：只解析 frontmatter（快！不编译 MDX）
  const allPostMeta = files.map((filename) => {
    const raw = readMdxFile(filename)
    return {
      slug: filename.replace('.mdx', ''),
      frontmatter: parseFrontmatter(raw),
    }
  })

  // 第二步：过滤 + 排序
  let filtered = allPostMeta
  if (tags && tags.length > 0) {
    filtered = filtered.filter((post) =>
      post.frontmatter.tags?.some((tag) => tags.includes(tag))
    )
  }
  filtered.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime()
    const dateB = new Date(b.frontmatter.date).getTime()
    return newest ? dateB - dateA : dateA - dateB
  })

  const total = filtered.length
  const totalPages = Math.ceil(total / limit)
  const paginated = filtered.slice((page - 1) * limit, page * limit)

  // 第三步：只编译分页后需要展示的那几篇！
  const posts = await Promise.all(
    paginated.map(async (meta) => {
      const compiled = await compilePostMdx(meta.slug)
      return {
        slug: meta.slug,
        frontmatter: compiled.frontmatter ?? meta.frontmatter,
        content: compiled.content,
      }
    })
  )

  return { posts, total, totalPages }
}

// ============ 获取所有标签 ============

export async function getAllTags(): Promise<string[]> {
  const files = fs.readdirSync(contentDir)
  const tags = new Set<string>()

  // 只解析 frontmatter，不编译 MDX
  for (const filename of files) {
    const raw = readMdxFile(filename)
    const frontmatter = parseFrontmatter(raw)
    frontmatter.tags?.forEach((tag) => tags.add(tag))
  }

  return Array.from(tags).sort()
}
