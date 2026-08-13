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
  {
    id: 'ecommerce-next15',
    name: {
      en: 'Next.js 15 E-Commerce',
      zh: '电商全栈平台',
    },
    thumbnail: '/images/projects/ecommerce-thumbnail.png',
    urls: {},
    description: {
      en: 'A production-ready full-stack e-commerce platform built with Next.js 15 (App Router) and React 19. Features product catalog with categories & search, persistent shopping cart, Stripe-powered checkout, order management, user authentication via NextAuth, and an admin area for managing products and orders.',
      zh: '基于 Next.js 15（App Router）与 React 19 构建的生产级全栈电商平台。包含商品目录（分类 / 搜索）、持久化购物车、Stripe 结算支付、订单管理、NextAuth 用户认证，以及用于管理商品与订单的后台管理区。',
    },
    modules: [
      { en: 'Product Catalog', zh: '商品目录' },
      { en: 'Category & Search', zh: '分类与搜索' },
      { en: 'Shopping Cart', zh: '购物车' },
      { en: 'Stripe Checkout', zh: 'Stripe 结算' },
      { en: 'Order Management', zh: '订单管理' },
      { en: 'User Auth (NextAuth)', zh: '用户认证 (NextAuth)' },
      { en: 'Account Center', zh: '账户中心' },
      { en: 'Admin Dashboard', zh: '后台管理' },
      { en: 'Stripe Webhooks', zh: 'Stripe Webhook' },
      { en: 'Dark / Light Theme', zh: '深色 / 浅色主题' },
    ],
    screenshots: [
      '/images/projects/ecommerce-home.png',
      '/images/projects/ecommerce-product.png',
      '/images/projects/ecommerce-category.png',
    ],
    techStack: [
      {
        name: 'Next.js 15',
        description: {
          en: 'Latest Next.js with App Router, Server Actions and Turbopack dev server. Handles routing, server-side rendering, API routes and static optimization out of the box.',
          zh: '最新的 Next.js，采用 App Router、Server Actions 与 Turbopack 开发服务。开箱即用地处理路由、SSR、API 路由与静态优化。',
        },
      },
      {
        name: 'React 19',
        description: {
          en: 'Uses the latest React with Server Components and improved form actions for building interactive product listings, cart, and checkout flows.',
          zh: '使用最新的 React，配合 Server Components 与改进的表单 Actions 构建交互式的商品列表、购物车与结算流程。',
        },
      },
      {
        name: 'TypeScript',
        description: {
          en: 'Full type safety from Prisma-generated database types through Server Actions to UI components, catching integration errors at compile time.',
          zh: '从 Prisma 生成的数据库类型到 Server Actions 再到 UI 组件的全链路类型安全，在编译期捕获集成错误。',
        },
      },
      {
        name: 'Prisma + PostgreSQL',
        description: {
          en: 'Type-safe ORM modeling Product, Category, Cart, CartItem, Order, OrderItem and User entities. Migrations and a seed script bootstrap the shop data in PostgreSQL.',
          zh: '类型安全的 ORM，建模 Product / Category / Cart / CartItem / Order / OrderItem / User 等实体，通过迁移与 seed 脚本在 PostgreSQL 中初始化商城数据。',
        },
      },
      {
        name: 'NextAuth v5',
        description: {
          en: 'Credential-based authentication with bcryptjs password hashing. Sessions gate the account area, order history, and admin routes via middleware.',
          zh: '基于账号密码的身份认证，使用 bcryptjs 加密。通过中间件保护账户中心、订单历史与管理员路由。',
        },
      },
      {
        name: 'Stripe',
        description: {
          en: 'Stripe Checkout Sessions handle payments. A dedicated webhook endpoint verifies signatures and marks orders as paid / fulfilled asynchronously.',
          zh: '使用 Stripe Checkout Sessions 处理支付。独立的 Webhook 端点校验签名，并异步将订单标记为已支付 / 已完成。',
        },
      },
      {
        name: 'React Hook Form + Zod',
        description: {
          en: 'Form state and validation for login, registration, checkout and admin product forms. Zod schemas are shared between client and server for one source of truth.',
          zh: '登录、注册、结算与商品后台表单的状态管理与校验。客户端和服务端共享同一份 Zod 校验 Schema，保证唯一事实来源。',
        },
      },
      {
        name: 'Tailwind CSS 4 + shadcn/ui',
        description: {
          en: 'Utility-first styling combined with Radix-based shadcn/ui primitives (dialog, dropdown, label, separator) for accessible, composable UI components.',
          zh: '实用优先的 Tailwind CSS 4，结合基于 Radix 的 shadcn/ui 组件（Dialog / Dropdown / Label / Separator），构建可访问、可组合的 UI。',
        },
      },
      {
        name: 'SWR',
        description: {
          en: 'Client-side data fetching with caching and revalidation for cart state and other interactive pieces that need to stay in sync with the server.',
          zh: '客户端数据获取库，带缓存与重新验证，用于购物车状态等需要与服务端保持同步的交互场景。',
        },
      },
      {
        name: 'Docker + CloudBase',
        description: {
          en: 'Dockerfile plus a cloudbaserc.json configuration make the app deployable to Tencent CloudBase (or any container platform) as a self-contained image.',
          zh: 'Dockerfile 与 cloudbaserc.json 配置让应用可以作为自包含镜像部署到腾讯云 CloudBase（或任意容器平台）。',
        },
      },
    ],
  },
]
