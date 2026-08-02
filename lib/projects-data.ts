export interface ProjectModule {
  en: string
  zh: string
}

export interface TechStackItem {
  name: string
  description: { en: string; zh: string }
}

export interface ProjectShowcase {
  id: string
  name: { en: string; zh: string }
  thumbnail: string
  urls: { cn?: string; eng?: string }
  description: { en: string; zh: string }
  modules: ProjectModule[]
  screenshots: string[]
  techStack: TechStackItem[]
}

export const projects: ProjectShowcase[] = [
  {
    id: 'blog-guaniuzzt',
    name: {
      en: 'Blog - Guaniuzzt',
      zh: '个人博客',
    },
    thumbnail: '/images/projects/blog-thumbnail.png',
    urls: {
      cn: 'https://blog.guaniuzzt.me/cn',
      eng: 'https://blog.guaniuzzt.me/eng',
    },
    description: {
      en: 'A personal blog website built with Next.js, featuring bilingual content support, MDX-powered articles, photo gallery, project showcase, and dynamic theme switching. Designed for clean reading experience with modern aesthetics.',
      zh: '基于 Next.js 构建的个人博客网站，支持中英文双语内容、MDX 文章渲染、照片集、项目展示和动态主题切换。以现代美学设计呈现清爽的阅读体验。',
    },
    modules: [
      { en: 'Home Page', zh: '首页' },
      { en: 'About Page', zh: '关于页面' },
      { en: 'Projects Showcase', zh: '项目展示' },
      { en: 'Photo Gallery', zh: '照片集' },
      { en: 'MDX Blog', zh: 'MDX 博客' },
      { en: 'Bilingual i18n', zh: '中英双语国际化' },
      { en: 'Dark / Light Theme', zh: '深色 / 浅色主题' },
      { en: 'Page Transitions', zh: '页面过渡动画' },
    ],
    screenshots: [
      '/images/projects/blog-home-eng.png',
      '/images/projects/blog-home-cn.png',
      '/images/projects/blog-about.png',
    ],
    techStack: [
      {
        name: 'Next.js 14',
        description: {
          en: 'The React framework with App Router and Server Components, enabling file-based routing, built-in image/font optimization, and streaming SSR for fast page loads.',
          zh: '采用 App Router 与 Server Components 的 React 全栈框架，提供基于文件的路由、内置图片/字体优化以及流式 SSR，实现极速页面加载。',
        },
      },
      {
        name: 'React 18',
        description: {
          en: 'Concurrent rendering and automatic batching improve UI responsiveness. Server-side rendering integrates seamlessly with Next.js for hybrid rendering strategies.',
          zh: '并发渲染与自动批处理提升了 UI 响应速度，服务端渲染与 Next.js 无缝集成，实现混合渲染策略。',
        },
      },
      {
        name: 'TypeScript',
        description: {
          en: 'End-to-end type safety from database schema (Prisma generated types) through API routes to React components, catching errors at compile time and improving code maintainability.',
          zh: '从数据库 Schema（Prisma 生成类型）到 API 路径再到 React 组件的全链路类型安全，在编译期捕获错误，提升代码可维护性。',
        },
      },
      {
        name: 'Tailwind CSS',
        description: {
          en: 'Utility-first CSS framework for rapid, consistent styling. Custom theme configuration with CSS variables supports dark/light mode switching with zero runtime cost.',
          zh: '实用优先的 CSS 框架，实现快速一致的样式开发。自定义主题配置结合 CSS 变量，支持深色/浅色主题零运行时切换。',
        },
      },
      {
        name: 'Prisma',
        description: {
          en: 'Type-safe ORM that auto-generates TypeScript types from the database schema. Supports PostgreSQL with migrations, seeding, and a visual studio for data exploration.',
          zh: '类型安全的 ORM，从数据库 Schema 自动生成 TypeScript 类型。支持 PostgreSQL 迁移、种子数据以及可视化数据浏览器。',
        },
      },
      {
        name: 'PostgreSQL',
        description: {
          en: 'Robust relational database serving as the primary data store. Stores project metadata, photo references, and supports complex queries through Prisma.',
          zh: '稳定可靠的关系型数据库，作为主数据存储。保存项目元数据、照片引用等信息，通过 Prisma 支持复杂查询。',
        },
      },
      {
        name: 'MDX',
        description: {
          en: 'Markdown + JSX enables rich blog content with embedded React components, custom layouts, and interactive elements — far beyond plain text articles.',
          zh: 'Markdown + JSX 组合让博客内容支持嵌入 React 组件、自定义布局和交互元素，远超纯文本文章的表现力。',
        },
      },
      {
        name: 'Framer Motion',
        description: {
          en: 'Declarative animation library powering page transitions, modal enter/exit effects, carousel hover interactions, and neon pulse animations throughout the site.',
          zh: '声明式动画库，驱动页面过渡、弹窗出入效果、轮播悬停交互以及全站霓虹脉冲动画等丰富的动效体验。',
        },
      },
      {
        name: 'Supabase',
        description: {
          en: 'Open-source Backend-as-a-Service providing PostgreSQL hosting, real-time subscriptions, authentication, and storage — replacing custom backend infrastructure.',
          zh: '开源的 BaaS 平台，提供 PostgreSQL 托管、实时订阅、身份认证与存储服务，替代自建后端基础设施。',
        },
      },
    ],
  },
]
