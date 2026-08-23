import PostForm from '@/components/post-form'
import H1 from '@/components/h1'
import { MotionItem } from '@/components/page-transition'
import { getAllTags } from '@/lib/posts'

export const metadata = { title: 'New Post' }

export default async function NewPostPage() {
  const existingTags = await getAllTags()

  return (
    <>
      <H1>Write a New Post</H1>
      <MotionItem delay={0.1}>
        <p className="text-[var(--text-secondary)] mb-8">
          Write your article in Markdown. Save it as a draft first, or publish it
          right away — drafts are only visible to you.
        </p>
      </MotionItem>
      <MotionItem delay={0.15}>
        <PostForm existingTags={existingTags} />
      </MotionItem>
    </>
  )
}
