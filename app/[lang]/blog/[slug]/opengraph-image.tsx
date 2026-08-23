import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { getPostMetaBySlug } from '@/lib/posts'
import { SITE_AUTHOR } from '@/lib/site'

export const alt = 'Blog post'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: { lang: string; slug: string }
}) {
  const post = await getPostMetaBySlug(params.slug)

  // 草稿 / 不存在：不暴露文章信息
  const isHidden = !post || post.frontmatter.published === false
  const title = isHidden ? 'Draft' : post.frontmatter.title
  const description = isHidden ? '' : post.frontmatter.description
  const clippedTitle = title.length > 72 ? `${title.slice(0, 72)}…` : title
  const clippedDesc =
    description.length > 110 ? `${description.slice(0, 110)}…` : description
  const author = post?.frontmatter.author ?? SITE_AUTHOR

  // Node runtime 下从文件系统读字体（Prisma 不兼容 edge runtime）
  const interSemiBold = readFile(
    join(process.cwd(), 'app/[lang]/blog/[slug]/inter.ttf')
  )

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '64px 80px',
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: '#888',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: '#10b981',
              display: 'flex',
            }}
          />
          {author}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            lineHeight: 1.2,
            color: '#111',
            fontWeight: 600,
          }}
        >
          {clippedTitle}
        </div>
        {clippedDesc && (
          <div style={{ marginTop: 28, fontSize: 30, color: '#555', lineHeight: 1.4 }}>
            {clippedDesc}
          </div>
        )}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
