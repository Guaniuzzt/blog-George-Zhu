import Link from 'next/link'
import { getTranslation, routeToLocale } from '@/lib/i18n'
import type { Locale } from '@/types'

export default function SubscribeCta({
  prefix,
  lang,
}: {
  prefix: string
  lang: Locale
}) {
  const t = (key: string) => (getTranslation(lang) as Record<string, string>)[key] || key

  return (
    <section className="rv relative overflow-hidden rounded-[28px] bg-[#17171C] px-8 py-16 text-center text-white md:px-16">
      <div
        className="hero-glow left-[10%] top-[-80px] h-[240px] w-[240px] opacity-40"
        style={{ background: 'var(--glow-1)' }}
      />
      <div
        className="hero-glow right-[8%] bottom-[-100px] h-[220px] w-[220px] opacity-25"
        style={{ background: 'var(--glow-2)' }}
      />
      <div className="relative">
        <div className="font-mono text-[12.5px] uppercase tracking-[0.2em] text-white/50">
          {t('cta.eyebrow')}
        </div>
        <h2 className="mt-4 font-serif text-[clamp(26px,3.4vw,40px)] font-semibold tracking-tightest">
          {t('cta.title')}
        </h2>
        <p className="mx-auto mt-4 max-w-[440px] text-[14.5px] leading-relaxed text-white/60">
          {t('cta.desc')}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center">
          <Link
            href={`${prefix}/feed.xml`}
            className="btn-primary inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[14px] font-medium text-[#17171C]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1.5" fill="currentColor" stroke="none" />
            </svg>
            {t('cta.rss')}
          </Link>
        </div>
      </div>
    </section>
  )
}
