import type { ReactNode } from 'react'

// ============ MDX 文章 ============
export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags?: string[]
  author?: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  // compileMDX 返回已编译好的 React 节点（详情页直接渲染），
  // 列表场景下可能为空。
  content: ReactNode
  readingTime?: number
}

// ============ 项目 / 作品 ============
// 既兼容 GitHub API 返回的字段，也兼容本地 db.json 的字段。
export interface Repo {
  id: number | string
  name: string
  title?: string // db.json fallback 使用的字段名
  description: string | null
  stargazers_count: number
  html_url?: string
  language?: string | null
}

// 迁移到 Prisma 后前端使用的项目类型
export interface Project {
  id: string
  name: string
  description: string | null
  url: string | null
  language: string | null
  stargazersCount: number
}

// ============ 分页 ============
// ⚠️ 与实际 components/pagination.tsx 对齐：组件只接收 pageCount，
// 当前页从 URL searchParams 中读取。
export interface PaginationProps {
  pageCount: number
}

// ============ i18n ============
export type Locale = 'en' | 'zh'

// ============ 主题 ============
export type Theme = 'dark' | 'light'

// ============ Cookie 状态 ============
export interface AppCookies {
  theme?: Theme
  lang?: Locale
}

// ============ 导航项 ============
export interface NavItem {
  href: string
  i18nKey: string
}