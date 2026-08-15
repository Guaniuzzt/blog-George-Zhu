'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { routeLocales } from '@/lib/i18n'

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
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to create a post.' }
  }

  if (!input.title.trim() || !input.content.trim()) {
    return { error: 'Title and content are required.' }
  }

  let slug = slugify(input.title)
  const existing = await prisma.post.findUnique({ where: { slug } })
  if (existing) {
    slug = `${slug}-${Date.now()}`
  }

  try {
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

    for (const locale of routeLocales) {
      revalidatePath(`/${locale}/blog`)
      revalidatePath(`/${locale}/blog/${slug}`)
    }
    revalidatePath(`/`)
    revalidateTag('posts')
    revalidateTag('tags')

    return { slug }
  } catch (err) {
    console.error('Failed to create post:', err)
    return { error: 'Failed to create post. Please try again.' }
  }
}
