'use server'

import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { routeLocales } from '@/lib/i18n'
import type { Locale } from '@/types'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

async function requireUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

function revalidatePost(slug: string) {
  for (const locale of routeLocales) {
    revalidatePath(`/${locale}/blog`)
    revalidatePath(`/${locale}/blog/${slug}`)
  }
  revalidatePath(`/`)
  revalidateTag('posts')
  revalidateTag('tags')
  revalidateTag(`post-${slug}`)
}

async function syncTags(postId: string, tagNames: string[]) {
  for (const tagName of tagNames) {
    const tagSlug = slugify(tagName)
    if (!tagSlug) continue

    const tag = await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName, slug: tagSlug },
    })

    await prisma.postTag.upsert({
      where: { postId_tagId: { postId, tagId: tag.id } },
      update: {},
      create: { postId, tagId: tag.id },
    })
  }
}

/** 删除没有任何文章引用的孤儿标签 */
async function pruneOrphanTags() {
  await prisma.tag.deleteMany({
    where: { posts: { none: {} } },
  })
}

export interface PostInput {
  title: string
  description: string
  content: string
  tags: string[]
  locale: Locale
  published: boolean
}

export async function createPost(
  input: PostInput
): Promise<{ slug?: string; error?: string }> {
  const user = await requireUser()
  if (!user) {
    return { error: 'You must be logged in to create a post.' }
  }

  if (!input.title.trim() || !input.content.trim()) {
    return { error: 'Title and content are required.' }
  }

  let slug = slugify(input.title)
  if (!slug) slug = `post-${Date.now()}`
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
        locale: input.locale,
        author: user.email ?? null,
        authorId: user.id,
        // 默认草稿，发布是显式动作
        published: input.published,
      },
    })

    await syncTags(post.id, input.tags)
    revalidatePost(slug)

    return { slug }
  } catch (err) {
    console.error('Failed to create post:', err)
    return { error: 'Failed to create post. Please try again.' }
  }
}

export async function updatePost(
  slug: string,
  input: PostInput
): Promise<{ slug?: string; error?: string }> {
  const user = await requireUser()
  if (!user) {
    return { error: 'You must be logged in to edit this post.' }
  }

  if (!input.title.trim() || !input.content.trim()) {
    return { error: 'Title and content are required.' }
  }

  const existing = await prisma.post.findUnique({ where: { slug } })
  if (!existing) {
    return { error: 'Post not found.' }
  }

  try {
    await prisma.post.update({
      where: { slug },
      data: {
        title: input.title.trim(),
        description: input.description.trim(),
        content: input.content,
        locale: input.locale,
        published: input.published,
      },
    })

    // 重建标签关联，并清理孤儿标签
    await prisma.postTag.deleteMany({ where: { postId: existing.id } })
    await syncTags(existing.id, input.tags)
    await pruneOrphanTags()
    revalidatePost(slug)

    return { slug }
  } catch (err) {
    console.error('Failed to update post:', err)
    return { error: 'Failed to update post. Please try again.' }
  }
}

export async function deletePost(slug: string): Promise<{ error?: string }> {
  const user = await requireUser()
  if (!user) {
    return { error: 'You must be logged in to delete this post.' }
  }

  try {
    const existing = await prisma.post.findUnique({ where: { slug } })
    if (!existing) {
      return { error: 'Post not found.' }
    }

    await prisma.post.delete({ where: { slug } })
    await pruneOrphanTags()
    revalidatePost(slug)

    return {}
  } catch (err) {
    console.error('Failed to delete post:', err)
    return { error: 'Failed to delete post. Please try again.' }
  }
}

export async function setPostPublished(
  slug: string,
  published: boolean
): Promise<{ error?: string }> {
  const user = await requireUser()
  if (!user) {
    return { error: 'You must be logged in to change publish status.' }
  }

  try {
    const existing = await prisma.post.findUnique({ where: { slug } })
    if (!existing) {
      return { error: 'Post not found.' }
    }

    await prisma.post.update({ where: { slug }, data: { published } })
    revalidatePost(slug)

    return {}
  } catch (err) {
    console.error('Failed to update publish status:', err)
    return { error: 'Failed to update publish status. Please try again.' }
  }
}
