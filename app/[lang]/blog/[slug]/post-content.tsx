import { getPostBySlug } from '@/lib/posts'

export default async function PostContent({ slug }: { slug: string }) {
  const post = await getPostBySlug(slug)
  if (!post?.content) return null

  return <div className="prose prose-lg mb-14">{post.content}</div>
}
