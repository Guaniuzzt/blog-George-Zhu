import Link from 'next/link'
import type { PostStats } from '@/lib/posts'
import { getTranslation } from '@/lib/i18n'
import type { Locale } from '@/types'

function formatUpdatedMonth(iso: string) {
  const date = new Date(iso)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${year}.${month}`
}

export default function HomeHero({
  prefix,
  lang,
  stats,
}: {
  prefix: string
  lang: Locale
  stats: PostStats
}) {
  const t = (key: string) => (getTranslation(lang) as Record<string, string>)[key] || key

  return (
    <section className="full-bleed relative -mt-28 overflow-hidden pt-[140px] pb-24 md:pt-[168px]">
      <div className="dot-grid absolute inset-0" />
      <div
        className="hero-glow left-[-120px] top-[-60px] h-[380px] w-[380px] opacity-50"
        style={{ background: 'var(--glow-1)' }}
      />
      <div
        className="hero-glow right-[-100px] top-[120px] h-[320px] w-[320px] opacity-60"
        style={{ background: 'var(--glow-2)' }}
      />

      <div className="relative mx-auto max-w-[1120px] px-6">
        <div className="rv flex items-center gap-3 font-mono text-[12.5px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          {t('hero.eyebrow')}
        </div>

        <h1 className="mt-7 font-serif text-[clamp(40px,6.2vw,74px)] font-semibold leading-[1.12] tracking-tightest">
          <span className="mask-line">
            <span>
              {t('hero.line1Prefix')}
              <em className="not-italic text-[var(--accent)]">{t('hero.line1Accent')}</em>
            </span>
          </span>
          <span className="mask-line" style={{ transitionDelay: '0.1s' }}>
            <span>
              {t('hero.line2a')}
              <br className="hidden sm:block" />
              {lang === 'en' ? ' ' : null}
              {t('hero.line2b')}
            </span>
          </span>
        </h1>

        <p className="rv rv-d2 mt-7 max-w-[560px] text-[16.5px] leading-[1.85] text-[var(--text-secondary)]">
          {t('home.subtitle')}
        </p>

        <div className="rv rv-d3 mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={`${prefix}/blog`}
            className="btn-primary group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-[14.5px] font-medium text-white"
          >
            {t('hero.startReading')}
            <svg
              className="transition-transform duration-500 group-hover:translate-x-1"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          <Link
            href={`${prefix}/about/projects`}
            className="btn-ghost inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] px-7 py-3.5 text-[14.5px] font-medium text-[var(--text-primary)]"
          >
            {t('home.viewProjects')}
          </Link>
        </div>

        <div className="rv rv-d4 mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-[var(--border-color)] pt-7 text-[13px] text-[var(--text-muted)]">
          <div>
            <span className="font-mono text-[20px] font-semibold text-[var(--text-primary)]">
              {stats.total}
            </span>
            <span className="ml-2">{t('hero.statPosts')}</span>
          </div>
          <div>
            <span className="font-mono text-[20px] font-semibold text-[var(--text-primary)]">
              {stats.localeCount}
            </span>
            <span className="ml-2">{t('hero.statLangs')}</span>
          </div>
          <div>
            <span className="font-mono text-[20px] font-semibold text-[var(--text-primary)]">
              {stats.sinceYear}
            </span>
            <span className="ml-2">{t('hero.statSince')}</span>
          </div>
          {stats.lastUpdated ? (
            <div className="ml-auto hidden items-center gap-2 md:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t('hero.lastUpdated')} {formatUpdatedMonth(stats.lastUpdated)}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
