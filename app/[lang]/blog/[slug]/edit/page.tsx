import PostForm from '@/components/post-form'
import H1 from '@/components/h1'
import { MotionItem } from '@/components/page-transition'
import { getAllTags, getPostForEdit } from '@/lib/posts'
import { notFound } from 'next/navigation'
import type { Locale } from '@/types'

export const metadata = { title: 'Edit Post' }

interface EditPostPageProps {
  params: { lang: string; slug: string }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post = await getPostForEdit(params.slug)
  if (!post) {
    notFound()
  }

  const existingTags = await getAllTags()

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-2">
        <H1>Edit Post</H1>
        {!post.published && (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 text-xs font-medium border border-amber-500/30">
            Draft
          </span>
        )}
      </div>
      <MotionItem delay={0.1}>
        <p className="font-mono text-xs text-[var(--text-muted)] mb-8">
          /{post.locale}/blog/{post.slug}
        </p>
      </MotionItem>
      <MotionItem delay={0.15}>
        <PostForm
          existingTags={existingTags}
          initial={{
            slug: post.slug,
            title: post.title,
            description: post.description,
            content: post.content,
            locale: post.locale as Locale,
            published: post.published,
            tags: post.tags,
          }}
        />
      </MotionItem>
    </>
  )
}
