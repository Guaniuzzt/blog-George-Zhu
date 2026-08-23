import { PrismaClient } from '@/lib/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

function slugify(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, '-')
}

interface DbJson {
  repos: {
    id: number
    title: string
    description: string | null
    stargazers_count: number
  }[]
}

async function seedPostsAndTags() {
  const contentDir = path.join(process.cwd(), 'content')
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

  // 清理课程占位文章（slug 为 first / second 的旧记录）
  for (const legacySlug of ['first', 'second']) {
    const removed = await prisma.post.deleteMany({ where: { slug: legacySlug } })
    if (removed.count > 0) {
      console.log(`✖ removed legacy placeholder post: ${legacySlug}`)
    }
  }

  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8')
    const { data, content } = matter(raw)

    const slug = file.replace(/\.mdx$/, '')
    const tagNames: string[] = Array.isArray(data.tags) ? data.tags : []
    const locale: string = data.locale === 'zh' ? 'zh' : 'en'

    // 先 upsert 文章本身
    const post = await prisma.post.upsert({
      where: { slug },
      update: {
        title: data.title ?? slug,
        description: data.description ?? '',
        content,
        date: data.date ? new Date(data.date) : new Date(),
        author: data.author ?? null,
        locale,
        published: true,
      },
      create: {
        slug,
        title: data.title ?? slug,
        description: data.description ?? '',
        content,
        date: data.date ? new Date(data.date) : new Date(),
        author: data.author ?? null,
        locale,
        published: true,
      },
    })

    // upsert 标签并建立关联
    for (const name of tagNames) {
      const tag = await prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name, slug: slugify(name) },
      })

      await prisma.postTag.upsert({
        where: { postId_tagId: { postId: post.id, tagId: tag.id } },
        update: {},
        create: { postId: post.id, tagId: tag.id },
      })
    }

    console.log(`✔ seeded post: ${slug} (${locale}, ${tagNames.length} tags)`)
  }

  // 清理孤儿标签（删除占位文章后不再被引用的标签）
  const orphanTags = await prisma.tag.deleteMany({
    where: { posts: { none: {} } },
  })
  if (orphanTags.count > 0) {
    console.log(`✖ removed ${orphanTags.count} orphan tag(s)`)
  }
}

async function seedProjects() {
  const dbJsonPath = path.join(process.cwd(), 'db.json')
  if (!fs.existsSync(dbJsonPath)) {
    console.log('⚠ db.json 不存在，跳过项目种子')
    return
  }

  const dbJson = JSON.parse(fs.readFileSync(dbJsonPath, 'utf-8')) as DbJson

  for (const repo of dbJson.repos) {
    await prisma.project.upsert({
      where: { id: String(repo.id) },
      update: {
        name: repo.title,
        description: repo.description,
        stargazersCount: repo.stargazers_count,
      },
      create: {
        id: String(repo.id),
        name: repo.title,
        description: repo.description,
        stargazersCount: repo.stargazers_count,
      },
    })
    console.log(`✔ seeded project: ${repo.title}`)
  }
}

async function main() {
  await seedPostsAndTags()
  await seedProjects()
  console.log('✅ Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })