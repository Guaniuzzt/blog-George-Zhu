import { getPostBySlug } from '@/lib/posts'

export default async function PostContent({ slug }: { slug: string }) {
  const post = await getPostBySlug(slug)
  if (!post?.content) return null

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
      {post.content}
    </div>
  )
}
