// ============ MDX 文章 ============
export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime?: number;
}

// ============ GitHub 项目 ============
export interface Repo {
  id: number;
  name: string;
  title?: string;          // fallback 使用 db.json 时的字段名
  description: string | null;
  stargazers_count: number;
  html_url: string;
  language: string | null;
}

// ============ 分页 ============
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

// ============ i18n ============
export type Locale = 'en' | 'zh';

// 翻译字典 — 用于约束翻译键结构
export interface TranslationDict {
  nav: {
    home: string;
    blog: string;
    about: string;
    projects: string;
    photos: string;
  };
  home: {
    title: string;
    subtitle: string;
    readMore: string;
    latestPosts: string;
    allPosts: string;
  };
  about: {
    title: string;
    description: string;
    viewProjects: string;
  };
  blog: {
    title: string;
    description: string;
    noPosts: string;
    previous: string;
    next: string;
    page: string;
  };
  projects: {
    title: string;
    description: string;
    loading: string;
    error: string;
  };
  photos: {
    title: string;
    description: string;
  };
  '404': {
    title: string;
    description: string;
    goHome: string;
  };
}

// ============ 主题 ============
export type Theme = 'dark' | 'light';

// ============ Cookie 状态 ============
export interface AppCookies {
  theme?: Theme;
  lang?: Locale;
}

// ============ 页面导航 ============
export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}