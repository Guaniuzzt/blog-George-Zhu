'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

interface CreatePostInput {
  title: string
  description: string
  content: string
  tags: string[]
}

export async function createPost(
  input: CreatePostInput
): Promise<{ slug?: string; error?: string }> {
  // 1. 验证用户身份
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to create a post.' }
  }

  // 2. 验证输入
  if (!input.title.trim() || !input.content.trim()) {
    return { error: 'Title and content are required.' }
  }

  // 3. 生成 slug（若重复则追加时间戳）
  let slug = slugify(input.title)
  const existing = await prisma.post.findUnique({ where: { slug } })
  if (existing) {
    slug = `${slug}-${Date.now()}`
  }

  try {
    // 4. 创建文章
    const post = await prisma.post.create({
      data: {
        slug,
        title: input.title.trim(),
        description: input.description.trim(),
        content: input.content,
        date: new Date(),
        author: user.email ?? null,
        authorId: user.id,
        published: true,
      },
    })

    // 5. 处理标签
    for (const tagName of input.tags) {
      const tagSlug = slugify(tagName)
      if (!tagSlug) continue

      const tag = await prisma.tag.upsert({
        where: { name: tagName },
        update: {},
        create: { name: tagName, slug: tagSlug },
      })

      await prisma.postTag.create({
        data: { postId: post.id, tagId: tag.id },
      })
    }

    // 6. 重新验证缓存
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)

    return { slug }
  } catch (err) {
    console.error('Failed to create post:', err)
    return { error: 'Failed to create post. Please try again.' }
  }
}