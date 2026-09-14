import type { ReactNode } from 'react'

// ============ MDX 文章 ============
export interface PostFrontmatter {
  title: string
  description: string
  date: string
  tags?: string[]
  author?: string
  /** 草稿 / 已发布状态（管理列表用；公开数据恒为 true） */
  published?: boolean
  /** 最近更新时间（ISO 日期字符串，JSON-LD dateModified 用） */
  updatedAt?: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  // compileMDX 返回已编译好的 React 节点（详情页直接渲染），
  // 列表场景下可能为空。
  content: ReactNode
  readingTime?: number
}

// ============ 分页 ============
// ⚠️ 与实际 components/pagination.tsx 对齐：组件只接收 pageCount，
// 当前页从 URL searchParams 中读取。
export interface PaginationProps {
  pageCount: number
}

// ============ i18n ============
export type Locale = 'en' | 'zh'
export type RouteLocale = 'cn' | 'eng'

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