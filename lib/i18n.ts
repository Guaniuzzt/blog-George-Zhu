import type { Locale } from '@/types'

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.photos': 'Photos',
    'nav.blog': 'Blog',

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

    // About page
    'about.title': 'About Me',
    'about.p1':
      "Hi, I'm George Zhu — a full-stack developer passionate about building beautiful, performant web applications.",
    'about.p2':
      "With a focus on modern JavaScript ecosystems, I create end-to-end solutions from database design to pixel-perfect UI. I believe code should be both elegant and accessible, and I'm always exploring the intersection of technology and creative expression.",
    'about.skills': 'Skills & Tools',
    'about.connect': "Let's Connect",
    'about.connectDesc':
      "I'm always open to discussing new projects, creative ideas, or opportunities.",
    'about.viewProjects': 'View Projects',
    'about.github': 'GitHub Profile',

    // Blog page
    'blog.title': 'Blog',
    'blog.desc': 'Thoughts on web development, design, and technology.',
    'blog.sort': 'Sort:',
    'blog.newest': 'Newest ↓',
    'blog.oldest': 'Oldest ↑',
    'blog.noPosts': 'No posts found',
    'blog.clearFilters': 'Clear filters',
    'blog.readArticle': 'Read article',

    // Projects page
    'projects.title': 'Projects',
    'projects.desc': "Open-source repositories and side projects I've built.",
    'projects.subdesc': 'Pulled live from my GitHub profile.',
    'projects.error': 'Cannot fetch projects at the moment',

    // Photos page
    'photos.title': 'Photos',
    'photos.desc': 'A glimpse into my world — my four-legged companion.',

    // 404
    '404.title': 'Page not found',
    '404.desc': "The page you're looking for doesn't exist or has been moved.",
    '404.backHome': 'Back home',
  },

  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.projects': '项目',
    'nav.photos': '照片',
    'nav.blog': '博客',

    // Home page
    'home.greeting': '你好，我是 George Zhu',
    'home.tagline': '一名全栈开发者，在代码与创意的交汇处构建数字体验。',
    'home.subtitle':
      '我使用现代技术构建高性能 Web 应用。不写代码时，我喜欢探索新工具、写技术文章、用镜头记录瞬间。',
    'home.viewProjects': '查看项目',
    'home.readBlog': '阅读博客',
    'home.latestPosts': '最新文章',
    'home.viewAll': '查看全部',

    // About page
    'about.title': '关于我',
    'about.p1':
      '你好，我是 George Zhu — 一名全栈开发者，热衷于构建美观、高性能的 Web 应用。',
    'about.p2':
      '专注于现代 JavaScript 生态系统，我能提供从数据库设计到像素级 UI 的端到端解决方案。我相信代码应该优雅且易于理解，并始终探索技术与创意表达的交汇点。',
    'about.skills': '技能 & 工具',
    'about.connect': '与我联系',
    'about.connectDesc': '我始终乐于探讨新项目、创意或合作机会。',
    'about.viewProjects': '查看项目',
    'about.github': 'GitHub 主页',

    // Blog page
    'blog.title': '博客',
    'blog.desc': '关于 Web 开发、设计和技术的思考。',
    'blog.sort': '排序：',
    'blog.newest': '最新 ↓',
    'blog.oldest': '最早 ↑',
    'blog.noPosts': '暂无文章',
    'blog.clearFilters': '清除筛选',
    'blog.readArticle': '阅读文章',

    // Projects page
    'projects.title': '项目',
    'projects.desc': '我构建的开源仓库和业余项目。',
    'projects.subdesc': '实时从我的 GitHub 主页拉取。',
    'projects.error': '暂时无法获取项目数据',

    // Photos page
    'photos.title': '照片',
    'photos.desc': '我的世界一角 — 我的四脚伙伴。',

    // 404
    '404.title': '页面未找到',
    '404.desc': '您要查找的页面不存在或已被移动。',
    '404.backHome': '返回首页',
  },
} as const

// 翻译键（用于在调用 t() 时获得自动补全与类型校验）
export type TranslationKey = keyof typeof translations['en']

export function getTranslation(
  lang: Locale
): Record<TranslationKey, string> {
  return translations[lang] ?? translations.en
}