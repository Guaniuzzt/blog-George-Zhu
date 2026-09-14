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

  const isHidden = !post || post.frontmatter.published === false
  const title = isHidden ? 'Draft' : post.frontmatter.title
  const description = isHidden ? '' : post.frontmatter.description
  const clippedTitle = title.length > 72 ? `${title.slice(0, 72)}…` : title
  const clippedDesc =
    description.length > 110 ? `${description.slice(0, 110)}…` : description
  const author = post?.frontmatter.author ?? SITE_AUTHOR

  const interSemiBold = readFile(
    join(process.cwd(), 'app/[lang]/blog/[slug]/inter.ttf')
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FAFAF8',
          padding: '64px 72px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: '#17171C',
              color: '#FAFAF8',
              fontSize: 16,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            GZ
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#71717A',
            }}
          >
            {author}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              width: 48,
              height: 4,
              borderRadius: 999,
              background: '#4F46E5',
              marginBottom: 28,
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 56,
              lineHeight: 1.2,
              color: '#17171C',
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            {clippedTitle}
          </div>
          {clippedDesc ? (
            <div
              style={{
                marginTop: 20,
                fontSize: 26,
                color: '#71717A',
                lineHeight: 1.45,
              }}
            >
              {clippedDesc}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 20,
            color: '#A1A1AA',
            letterSpacing: '0.04em',
          }}
        >
          blog.guaniuzzt.me
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  )
}
