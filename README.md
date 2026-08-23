# George Zhu's Blog

个人技术博客 + 作品集：双语（中文 / English）、MDX 内容、登录发文、草稿工作流，部署在 Vercel。

**线上地址**: <https://blog.guaniuzzt.me>

## 功能

- **双语内容站**：`/cn` 与 `/eng` 两套站点，导航、页面文案和**文章内容**都按语言区分（`Post.locale` 字段，列表与首页只展示当前语言的文章）
- **博客后台**：Supabase Auth 登录后可新建 / 编辑 / 删除文章，草稿（默认）与已发布状态切换，草稿仅登录可见
- **内容工作流**：文章以 MDX（Markdown）写作，存于 Postgres；`content/` 目录的源文件可通过 seed 脚本导入
- **SEO 基础设施**：`sitemap.xml`、`robots.txt`、按语言的 RSS（`/cn/feed.xml`、`/eng/feed.xml`）、文章页 Article JSON-LD、canonical / OpenGraph / Twitter Card、动态 OG 图（按文章标题与摘要生成）
- **性能**：React Server Components 优先、ISR 增量静态再生、`unstable_cache` 数据缓存 + `revalidateTag` 精确失效、Edge OG 图

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Next.js 14（App Router）、React 18、TypeScript |
| 样式 | Tailwind CSS 3 + `@tailwindcss/typography`、Framer Motion |
| 内容 | MDX（`next-mdx-remote/rsc` 服务端编译） |
| 数据库 | Supabase（Postgres）+ Prisma ORM（`@prisma/adapter-pg`） |
| 鉴权 | Supabase Auth（`@supabase/ssr`，cookie 会话） |
| 部署 | Vercel（新加坡区域 `sin1`，ISR） |

## 目录结构

```
app/
├── [lang]/                  # 双语言站点（cn / eng）
│   ├── page.tsx             # 首页（最新文章，按语言过滤）
│   ├── about/               # 关于 + 项目展示
│   ├── photos/              # 照片
│   ├── login/               # Supabase 登录
│   └── blog/
│       ├── page.tsx         # 文章列表（登录后含草稿）
│       ├── new/             # 新建文章（受保护）
│       └── [slug]/
│           ├── page.tsx     # 文章详情（JSON-LD / canonical / OG）
│           ├── edit/        # 编辑文章（受保护）
│           └── opengraph-image.tsx  # 动态 OG 图
├── [lang]/feed.xml/route.ts # 按语言的 RSS
├── sitemap.ts               # sitemap.xml
├── robots.ts                # robots.txt
├── posts/route.ts           # 公开 JSON API（已发布文章）
└── auth/                    # Supabase auth 回调

components/                  # UI 组件（表单、管理操作、导航等）
content/                     # MDX 文章源文件（seed 导入用）
lib/                         # posts 数据层、i18n、prisma、supabase 客户端
prisma/                      # schema、迁移、seed
types/                       # 共享 TS 类型
```

## 本地启动

### 1. 环境变量

创建 `.env.local`：

```bash
# Supabase Postgres —— 本地开发用 Session pooler（5432）
DATABASE_URL="postgresql://postgres.<project-ref>:<password>@aws-1-<region>.pooler.supabase.com:5432/postgres"

# Supabase Auth（浏览器客户端）
NEXT_PUBLIC_SUPABASE_URL="https://<project-ref>.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="<publishable-key>"

# 站点 URL（sitemap / RSS / canonical 使用，默认 https://blog.guaniuzzt.me）
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 2. 数据库迁移与种子

```bash
npm install
npm run db:migrate   # prisma migrate dev（应用迁移）
npm run db:seed      # 导入 content/ 下的 MDX 文章到数据库
```

### 3. 启动

```bash
npm run dev          # http://localhost:3000
```

常用命令：

| 命令 | 说明 |
|---|---|
| `npm run dev` | 本地开发服务器 |
| `npm run build` | 生产构建（含 `prisma generate`） |
| `npm run db:migrate` | 开发模式迁移（生成 + 应用） |
| `npm run db:seed` | 导入 / 更新 `content/` 文章 |
| `npm run db:studio` | Prisma Studio 查看数据 |

## 缓存与性能决策

| 机制 | 位置 | 说明 |
|---|---|---|
| ISR `revalidate = 60` | 页面级（首页、文章页、列表） | 静态渲染，60 秒后台再生 |
| `unstable_cache` | `lib/posts.ts` 查询层 | 查询结果按 key 缓存（含 locale），tag 标记 |
| `revalidateTag` | 写操作（发布 / 编辑 / 删除） | 数据变化时精确失效 `posts` / `post-<slug>` 缓存 |
| 草稿不进缓存 | `lib/posts.ts` | 管理视图（含草稿）直接查库，避免草稿泄漏到公共缓存 |
| `preferredRegion = 'sin1'` | 布局 | Serverless 固定新加坡区域（目标受众就近） |

## 鉴权

- **需要登录的路由**：`/{cn,eng}/blog/new`、`/{cn,eng}/blog/<slug>/edit`（`middleware.ts` + `lib/supabase/middleware.ts` 强制跳转登录页）
- **登录后额外能力**：列表页显示当前语言草稿（带「草稿」徽章）、卡片与文章页出现编辑 / 发布切换 / 删除按钮
- **服务端兜底**：所有写操作（create / update / delete / publish）在 server action 内部二次校验用户；草稿详情页服务端校验，未登录返回 404
- **Supabase 配置**：在 Supabase 项目中开启 Email 认证即可，`NEXT_PUBLIC_SUPABASE_URL` 与 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` 即客户端所需全部配置

## 内容管理流程

1. 登录 → 博客页右上角「New Post」
2. 填写标题 / 描述 / 语言（决定文章出现在中文站还是英文站）/ 标签 / Markdown 正文
3. 「Save as Draft」存草稿（仅登录可见）或「Publish」直接发布
4. 登录状态下在列表卡片或文章页可随时编辑、发布 / 下架、删除
