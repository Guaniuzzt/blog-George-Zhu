import type { Locale, RouteLocale } from '@/types'

export const routeLocales: RouteLocale[] = ['cn', 'eng']
export const defaultRouteLocale: RouteLocale = 'cn'

export function routeToLocale(route: string): Locale {
  return route === 'cn' ? 'zh' : 'en'
}

export function localeToRoute(locale: Locale): RouteLocale {
  return locale === 'zh' ? 'cn' : 'eng'
}

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.photos': 'Photos',
    'nav.blog': 'Blog',
    'nav.switchLang': 'Switch language',
    'nav.menu': 'Menu',
    'nav.closeMenu': 'Close menu',
    'footer.builtWith': 'Built with Next.js',

    // Home page
    'home.greeting': "Hey, I'm George Zhu",
    'home.tagline':
      'A full-stack developer who crafts digital experiences at the intersection of code and creativity.',
    'home.subtitle':
      "I build performant web applications with modern technologies. When I'm not coding, you'll find me exploring new tools, writing about tech, or capturing moments through my lens.",
    'home.viewProjects': 'View Projects',
    'home.readBlog': 'Read Blog',
    'home.latestPosts': 'Latest Posts',
    'home.viewAll': 'View all posts',

    'hero.eyebrow': 'Personal Blog · Full-Stack Dev',
    'hero.line1Prefix': "Hey, I'm ",
    'hero.line1Accent': 'George',
    'hero.line2a': 'Building digital experiences',
    'hero.line2b': 'at the intersection of code and creativity.',
    'hero.startReading': 'Start reading',
    'hero.statPosts': 'posts',
    'hero.statLangs': 'languages',
    'hero.statSince': 'writing since',
    'hero.lastUpdated': 'Updated',

    'section.writing': 'Writing',
    'section.featured': 'Featured',
    'section.projects': 'Projects',
    'section.about': 'About Me',

    // About page
    'about.title': 'About Me',
    'about.role': 'Full-stack developer · Shanghai',
    'about.sloganLine1': 'I believe good code, like good writing,',
    'about.sloganLead': 'should be ',
    'about.sloganAccent': 'concise, honest, and built to last',
    'about.sloganEnd': '.',
    'about.p1':
      'This blog is where I write down what I actually ship: App Router rendering strategies, Prisma + Supabase in production, and TypeScript patterns that survived real code reviews. Every post comes from a bug I hit or a decision I had to defend.',
    'about.p2':
      'I work across the modern JavaScript stack — from database design to pixel-level UI. Code should be both elegant and readable, and I keep looking for where engineering meets craft.',
    'about.skills': 'Skills & Tools',
    'about.connect': "Let's Connect",
    'about.connectDesc':
      "I'm always open to discussing new projects, creative ideas, or opportunities.",
    'about.viewProjects': 'View Projects',
    'about.wechat': 'WeChat',
    'about.email': 'Email',

    // Blog page
    'blog.title': 'Blog',
    'blog.desc': 'Thoughts on web development, design, and technology.',
    'blog.sort': 'Sort:',
    'blog.newest': 'Newest ↓',
    'blog.oldest': 'Oldest ↑',
    'blog.noPosts': 'No posts found',
    'blog.clearFilters': 'Clear filters',
    'blog.readArticle': 'Read article',
    'blog.draft': 'Draft',
    'blog.viewAll': 'View all →',

    // Projects page
    'projects.title': 'Projects',
    'projects.desc': 'Live products I designed, built, and still maintain.',
    'projects.subdesc': 'Open a card to visit the live site.',
    'projects.visit': 'Visit site',

    // Photos page
    'photos.title': 'Photos',
    'photos.desc': 'A glimpse into my world — my four-legged companion.',

    // 404
    '404.title': 'Page not found',
    '404.desc': "The page you're looking for doesn't exist or has been moved.",
    '404.backHome': 'Back home',

    // Error
    'error.title': 'Something went wrong',
    'error.desc': 'This page failed to load. You can retry, or head back home.',
    'error.retry': 'Try again',

    'cta.eyebrow': 'Stay Tuned',
    'cta.title': 'Be first to know when a new post lands',
    'cta.desc': 'Subscribe via RSS to get the latest notes as they go out.',
    'cta.rss': 'RSS feed',
  },

  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.projects': '项目',
    'nav.photos': '照片',
    'nav.blog': '博客',
    'nav.switchLang': '切换语言',
    'nav.menu': '菜单',
    'nav.closeMenu': '关闭菜单',
    'footer.builtWith': '用 Next.js 构建',

    // Home page
    'home.greeting': '你好，我是 George Zhu',
    'home.tagline': '一名全栈开发者，在代码与创意的交汇处构建数字体验。',
    'home.subtitle':
      '我使用现代技术构建高性能 Web 应用。不写代码时，我喜欢探索新工具、写技术文章、用镜头记录瞬间。',
    'home.viewProjects': '查看项目',
    'home.readBlog': '阅读博客',
    'home.latestPosts': '最新文章',
    'home.viewAll': '查看全部',

    'hero.eyebrow': 'Personal Blog · Full-Stack Dev',
    'hero.line1Prefix': '你好，我是 ',
    'hero.line1Accent': 'George',
    'hero.line2a': '在代码与创意的交汇处，',
    'hero.line2b': '构建数字体验。',
    'hero.startReading': '开始阅读',
    'hero.statPosts': '篇文章',
    'hero.statLangs': '种语言',
    'hero.statSince': '开始写作',
    'hero.lastUpdated': '最近更新于',

    'section.writing': 'Writing',
    'section.featured': '精选文章',
    'section.projects': 'Projects',
    'section.about': 'About Me',

    // About page
    'about.title': '关于我',
    'about.role': '全栈开发者 · 上海',
    'about.sloganLine1': '我相信好的代码和好的文字一样，',
    'about.sloganLead': '都应该',
    'about.sloganAccent': '简洁、诚实、经得起推敲',
    'about.sloganEnd': '。',
    'about.p1':
      '这个博客是我记录技术实践的地方：从 Next.js App Router 的服务端渲染策略，到 Prisma + Supabase 的数据库落地，再到 TypeScript 类型系统的实战技巧。每一篇都来自真实项目里的踩坑与复盘。',
    'about.p2':
      '专注于现代 JavaScript 生态系统，我能提供从数据库设计到像素级 UI 的端到端解决方案。我相信代码应该优雅且易于理解，并始终探索技术与创意表达的交汇点。',
    'about.skills': '技能 & 工具',
    'about.connect': '与我联系',
    'about.connectDesc': '我始终乐于探讨新项目、创意或合作机会。',
    'about.viewProjects': '查看项目',
    'about.wechat': '微信',
    'about.email': '邮箱',

    // Blog page
    'blog.title': '博客',
    'blog.desc': '关于 Web 开发、设计和技术的思考。',
    'blog.sort': '排序：',
    'blog.newest': '最新 ↓',
    'blog.oldest': '最早 ↑',
    'blog.noPosts': '暂无文章',
    'blog.clearFilters': '清除筛选',
    'blog.readArticle': '阅读文章',
    'blog.draft': '草稿',
    'blog.viewAll': '查看全部 →',

    // Projects page
    'projects.title': '项目展示',
    'projects.desc': '我设计、实现、并且现在还在维护的线上项目。',
    'projects.subdesc': '打开卡片即可访问线上站点。',
    'projects.visit': '访问站点',

    // Photos page
    'photos.title': '照片',
    'photos.desc': '我的世界一角 — 我的四脚伙伴。',

    // 404
    '404.title': '页面未找到',
    '404.desc': '您要查找的页面不存在或已被移动。',
    '404.backHome': '返回首页',

    // Error
    'error.title': '页面出了点问题',
    'error.desc': '这一页没能正确加载。可以再试一次，或返回首页。',
    'error.retry': '重试',

    'cta.eyebrow': 'Stay Tuned',
    'cta.title': '新文章发布时，第一时间知道',
    'cta.desc': '通过 RSS 订阅，获取最新的技术笔记。',
    'cta.rss': 'RSS 订阅',
  },
} as const

// 翻译键（用于在调用 t() 时获得自动补全与类型校验）
export type TranslationKey = keyof typeof translations['en']

export function getTranslation(
  lang: Locale
): Record<TranslationKey, string> {
  return translations[lang] ?? translations.en
}