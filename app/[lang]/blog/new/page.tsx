import PostForm from '@/components/post-form'
import H1 from '@/components/h1'
import { getAllTags } from '@/lib/posts'
import { getTranslation, routeToLocale } from '@/lib/i18n'
import type { Metadata } from 'next'

export function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Metadata {
  const dict = getTranslation(routeToLocale(params.lang))
  return { title: dict['editor.newTitle'] }
}

export default async function NewPostPage({
  params,
}: {
  params: { lang: string }
}) {
  const existingTags = await getAllTags()
  const dict = getTranslation(routeToLocale(params.lang))

  return (
    <>
      <H1>{dict['editor.newTitle']}</H1>
      <p className="text-[var(--text-secondary)] mb-8">
        {dict['editor.newDesc']}
      </p>
      <PostForm existingTags={existingTags} />
    </>
  )
}
