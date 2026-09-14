import { getPosts, getPostStats } from '@/lib/posts'
import Link from 'next/link'
import Reveal from '@/components/reveal'
import HomeHero from '@/components/home-hero'
import TechMarquee from '@/components/tech-marquee'
import PostRow from '@/components/post-row'
import SubscribeCta from '@/components/subscribe-cta'
import { getTranslation, routeToLocale } from '@/lib/i18n'

export const dynamic = 'force-static'
export const revalidate = 60

export default async function Home({ params }: { params: { lang: string } }) {
  const lang = routeToLocale(params.lang)
  const [{ posts }, stats] = await Promise.all([
    getPosts({ newest: true, limit: 3, locale: lang }),
    getPostStats(),
  ])
  const dict = getTranslation(lang) as Record<string, string>
  const t = (key: string): string => dict[key] || key
  const prefix = `/${params.lang}`

  return (
    <Reveal>
      <HomeHero prefix={prefix} lang={lang} stats={stats} />
      <TechMarquee />

      <section className="pt-24">
        <div className="rv flex items-end justify-between mb-10">
          <div>
            <div className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              {t('section.writing')}
            </div>
            <h2 className="mt-3 font-serif text-[clamp(28px,3.6vw,42px)] font-semibold tracking-tightest">
              {t('section.featured')}
            </h2>
          </div>
          <Link
            href={`${prefix}/blog`}
            className="link-underline hidden text-[14px] font-medium text-[var(--text-primary)] sm:block"
          >
            {t('blog.viewAll')}
          </Link>
        </div>

        <div>
          {posts.map((post, i) => (
            <PostRow
              key={post.slug}
              post={post}
              index={i}
              prefix={prefix}
              draftLabel={t('blog.draft')}
              className={i === 0 ? 'rv' : `rv rv-d${Math.min(i, 4)}`}
            />
          ))}
        </div>
      </section>

      <div className="pt-24">
        <SubscribeCta prefix={prefix} lang={lang} />
      </div>
    </Reveal>
  )
}
