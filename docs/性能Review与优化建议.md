# 性能 Review 与优化建议

> 审查日期：2026-06-28  
> 项目：next14-blog（Next.js 14.1 + Prisma + Supabase Auth + MDX from DB）

---

## 1. 执行摘要

项目整体架构清晰（App Router、Server Components、Prisma 并行查询、Photos 页图片优化等），但**缺少显式缓存策略**，且 Auth 与动态 API 深度耦合在 Root Layout 与 Middleware 中，导致几乎所有页面都走动态渲染。

**最高杠杆的三项优化：**

1. 解耦 Auth 调用（Middleware + Root Layout）—— 减少每页 2 次 Supabase 网络请求
2. MDX 编译缓存 / 去重 —— 避免文章页重复编译
3. 字体自托管（`next/font`）—— 消除 render-blocking 外部 CDN

---

## 2. 项目现状概览

| 层级 | 技术栈 |
|------|--------|
| 框架 | Next.js 14.1.0（App Router） |
| 数据库 | PostgreSQL（Supabase）+ Prisma 7 |
| 认证 | Supabase Auth（`@supabase/ssr`） |
| 内容 | MDX 存 DB，运行时 `compileMDX()` |
| 动画 | Framer Motion 12 |
| 监控 | Vercel Speed Insights |

### 已有良好实践

- Prisma 单例 + `Promise.all` 并行查询（`findMany` + `count`）
- Projects 页使用 `Suspense` + `ErrorBoundary` 流式渲染
- Photos 页：`next/image` + `priority` / `sizes` / `blur` / `quality={50}`
- Chatbot 使用 `Script strategy="lazyOnload"` 延迟加载
- 发文后 `revalidatePath` 按需失效缓存
- Pagination 用 `Suspense` 包裹 `useSearchParams`

### 缺失的缓存机制

- 无 `export const revalidate = N`（ISR）
- 无 `React.cache()` 包裹 `getPostBySlug`
- 无 `unstable_cache` 缓存 Prisma 查询或 MDX 编译结果
- Root Layout 使用 `cookies()` / `headers()` / `getCurrentUser()` → **全站动态渲染**
- API Route `/posts` 无 HTTP 缓存头

---

## 3. 问题清单（按优先级）

### P0 — 严重

#### 3.1 Middleware 每个请求都调用 `supabase.auth.getUser()`

**位置：** `lib/supabase/middleware.ts`、`middleware.ts`

**问题：** Matcher 覆盖几乎所有路由，每个非静态资源请求都会向 Supabase Auth 发网络请求验证 token。对 `/`、`/about`、`/photos` 等公开页是纯额外延迟（约 50–200ms）。

**建议：**

```typescript
// 只对受保护路由做 auth 检查
const protectedPaths = ['/blog/new']
const isProtected = protectedPaths.some((p) =>
  request.nextUrl.pathname.startsWith(p)
)
if (!isProtected) {
  return supabaseResponse // 跳过 getUser()
}
```

或缩窄 `middleware.config.matcher`，仅匹配受保护路由。

---

#### 3.2 Root Layout 每次渲染都调用 `getCurrentUser()`

**位置：** `app/layout.tsx`

**问题：** Root Layout 是所有页面的祖先。`getCurrentUser()` → `supabase.auth.getUser()` 使**每个页面导航**都阻塞等待 Auth 网络请求，即使多数页面不需要用户信息。

**建议：**

- 将 `user` 获取下推到真正需要的组件（如 `Header` 内部、`/blog/page.tsx`）
- 或用 `Suspense` 包裹 `Header`，让 Auth 不阻塞主内容渲染

---

### P1 — 高

#### 3.3 `blog/page.tsx` 重复调用 `getCurrentUser()`

**位置：** `app/blog/page.tsx`

**问题：** Root Layout 已获取 `user` 并传给 `Header`，Blog 页又调用一次 → 同页加载 **两次** `getUser()`。

**建议：** 通过 props 传递 user，或只在需要处获取一次。

---

#### 3.4 `blog/[slug]` 双重数据获取 — `generateMetadata` + 页面组件

**位置：** `app/blog/[slug]/page.tsx`、`lib/posts.ts`

**问题：** `getPostBySlug` 含 DB 查询 + MDX 编译。Next.js 14.1 对 Prisma 调用**不会自动去重**（仅原生 `fetch` 去重），导致每篇文章 MDX **编译两次**。

**建议：**

```typescript
import { cache } from 'react'

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  // ... 原有逻辑
})
```

进一步可考虑 `unstable_cache` 缓存编译结果，或发文时预编译 MDX。

---

#### 3.5 `globals.css` 外部字体 `@import` — 阻塞渲染

**位置：** `app/globals.css`

**问题：** `@import url('https://api.fontshare.com/...')` 为 **render-blocking** 请求，增加 LCP 延迟，易 FOIT/FOUT。

**建议：** 改用 `next/font/local` 或 `next/font/google` 自托管字体。

---

#### 3.6 Framer Motion 全量导入 — Bundle 体积大

**位置：** `components/page-transition.tsx`、`header.tsx`、`dark-mode.tsx`、`navigation.tsx` 等

**问题：** 完整包约 **30–40KB gzipped**，出现在首屏 JS bundle。

**建议：**

```typescript
import { LazyMotion, m, domAnimation } from 'framer-motion'
```

可减小约 60% 体积；非首屏动画可考虑 CSS 动画替代。

---

### P2 — 中

#### 3.7 `PageTransition` 使用 `AnimatePresence mode="wait"`

**位置：** `components/page-transition.tsx`

**问题：** 旧页退出动画（0.35s）完成后才开始新页进入（0.6s），页面切换感知延迟接近 **1 秒**。

**建议：** 改为 `mode="sync"` 或 `popLayout`；缩短退出动画；或仅保留进入动画。

---

#### 3.8 `createPost` 标签处理串行循环

**位置：** `app/blog/new/actions.ts`

**问题：** 每个标签串行 `upsert` + `create`，N 个标签 = 2N 次串行 DB 查询。

**建议：** `Promise.all` 并行，或 `$transaction` + `createMany` 批量操作。

---

#### 3.9 Prisma Schema 缺少查询索引

**位置：** `prisma/schema.prisma`

**问题：**

- `Post.date` — 列表按 date 排序，无索引
- `Post.published` — 几乎所有查询过滤 `published: true`
- `Post.authorId` — 未来按作者筛选会慢

**建议：**

```prisma
@@index([published, date(sort: Desc)])
@@index([authorId])
```

---

#### 3.10 `generateStaticParams` 硬编码 `limit: 100`

**位置：** `app/blog/[slug]/page.tsx`

**问题：** 文章超过 100 篇时新文不会被 SSG；且因 Root Layout 动态化，SSG 收益已被削弱。

**建议：** 去掉 limit 或仅查 slug 列；配合 Layout 动态化修复后 ISR/SSG 才有效。

---

#### 3.11 OG Image 未读 DB、硬编码标题

**位置：** `app/blog/[slug]/opengraph-image.tsx`

**问题：** 仅 `first`/`second` 有硬编码标题，其余用 slug；Edge 运行时额外拉字体。

**建议：** 从 DB 或缓存读 title/description；字体内联或预加载。

---

### P3 — 低

#### 3.12 `useServerDarkMode` 不读 Cookie

**位置：** `hooks/use-server-dark-mode.ts`

**问题：** 始终返回 `'dark'`，客户端读 cookie 后切换 → **hydration mismatch** 与主题闪烁（FOUC）。

**建议：** 像 `useServerLanguage` 一样读取 `cookies()`。

---

#### 3.13 `next.config.js` 配置缺失

**位置：** `next.config.js`

**建议补充：**

- `images.remotePatterns`（若有外链图）
- `poweredByHeader: false`
- 按需 `compiler.removeConsole`（生产环境）

---

#### 3.14 `@next/mdx@16.x` 与 `next@14.1.0` 主版本不匹配

**位置：** `package.json`

**问题：** 大版本不一致，存在隐性兼容性风险。

**建议：** 对齐 `@next/mdx` 与 Next.js 主版本。

---

#### 3.15 冗余 / 未使用文件

| 文件 | 说明 |
|------|------|
| `lib/supabase.ts` | 全局客户端，已被 `lib/supabase/client.ts` + `server.ts` 替代 |
| `components/counter.tsx` | 未引用 demo |
| `components/navigation.module.css` | 未使用（导航用 Tailwind） |
| `@next/mdx` + `mdx-components.tsx` | 配置了文件 MDX，实际内容来自 DB + `next-mdx-remote` |
| `content/*.mdx` | 仅 seed 使用，运行时读 DB |
| Prisma `User` 模型 | Auth 走 Supabase，模型未使用 |

**建议：** 清理或标注用途，减少 bundle 与认知负担。

---

## 4. 优先级汇总表

| 优先级 | 问题 | 预估影响 |
|--------|------|----------|
| **P0** | Middleware 每请求 `getUser()` | 全站 TTFB +50–200ms |
| **P0** | Root Layout 每请求 `getCurrentUser()` | 全站阻塞动态渲染 |
| **P1** | `blog/[slug]` 双重 `getPostBySlug` | 文章页 CPU/DB 翻倍 |
| **P1** | `blog/page` 重复 Auth | 额外网络延迟 |
| **P1** | 外部字体 CDN `@import` | LCP / 渲染阻塞 |
| **P1** | Framer Motion bundle | 首屏 JS +30–40KB |
| **P2** | `AnimatePresence mode="wait"` | 导航感知 ~1s 延迟 |
| **P2** | 标签串行 DB 操作 | 发文 N 标签 = 2N 查询 |
| **P2** | 缺少 DB 索引 | 文章量增长后变慢 |
| **P2** | OG Image 未 DB 化 | 分享预览不准确 + Edge 开销 |
| **P3** | `useServerDarkMode` 不读 cookie | 主题闪烁 |
| **P3** | `generateStaticParams` limit 100 | 超出后 SSG 失效 |
| **P3** | 冗余依赖与文件 | 维护成本 / 潜在 bundle |

---

## 5. 推荐实施路线

### 阶段一：Auth 解耦（预期 TTFB 明显改善）

1. Middleware 仅对 `/blog/new` 等受保护路由调用 `getUser()`
2. 从 Root Layout 移除 `getCurrentUser()`，改为 `Suspense` + 子组件按需获取
3. `/blog` 页移除重复 Auth 调用，复用 Header 传入的 user 或独立 Suspense 边界

### 阶段二：数据与渲染缓存

1. `React.cache()` 包裹 `getPostBySlug`、`getPosts`
2. 博客列表 / 详情页添加 `export const revalidate = 3600`（或按业务调整）
3. 评估 MDX 预编译或 `unstable_cache` 缓存编译结果
4. Prisma 添加 `@@index([published, date])`

### 阶段三：前端资源优化

1. 字体迁移至 `next/font`
2. Framer Motion → `LazyMotion` + `domAnimation`
3. 调整 `PageTransition` 动画策略
4. 清理未使用文件与冗余 MDX 配置

### 阶段四：长尾优化

1. `createPost` 标签批量写入
2. OG Image 读 DB + 缓存
3. `/posts` API 添加 `Cache-Control`
4. 对齐 `@next/mdx` 版本

---

## 6. 架构与数据流（参考）

```
RootLayout (async RSC)
├── getCurrentUser()     ← 全站动态化瓶颈
├── useServerLanguage()  ← cookies + headers
├── Header (client)      ← Framer Motion
├── PageTransition (client)
│   └── Page (RSC)
│       └── getPosts / getPostBySlug → prisma → PostgreSQL
│           └── compileMDX (CPU-heavy, 无缓存)
├── Chatbot (lazyOnload)
└── SpeedInsights

Middleware (几乎全路由)
└── supabase.auth.getUser()  ← 每请求网络开销
```

---

## 7. 相关文档

- `docs/功能升级-认证与发文.md` — 认证与发文功能设计（含 `React.cache()` 等待实现项）
- `docs/接单升级计划.md` —  broader 升级规划

---

## 8. 审查结论

当前项目**功能完整、UI 体验较好**，但性能瓶颈集中在：

1. **Auth 过度调用** — Middleware + Layout 叠加，公开页也付 Auth 成本  
2. **无缓存层** — MDX 编译与 DB 查询每次请求重做  
3. **客户端 JS 偏重** — Framer Motion 覆盖面广  
4. **字体与静态资源** — 外部 CDN 阻塞渲染  

按 P0 → P1 → P2 顺序实施，预期可在不改变产品功能的前提下显著改善 TTFB、LCP 与页面切换体验。
