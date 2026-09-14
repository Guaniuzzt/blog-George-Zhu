import Link from 'next/link'
import Reveal from '@/components/reveal'
import { getTranslation, routeToLocale } from '@/lib/i18n'
import { SITE_AUTHOR, SITE_EMAIL } from '@/lib/site'

export const metadata = {
  title: 'About',
}

export const dynamic = 'force-static'

const skills = [
  'Next.js',
  'TypeScript',
  'React',
  'Node.js',
  'Prisma',
  'Supabase',
]

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = routeToLocale(params.lang)
  const t = (key: string) => (getTranslation(lang) as Record<string, string>)[key] || key
  const prefix = `/${params.lang}`

  return (
    <Reveal>
      <div className="grid gap-14 md:grid-cols-[320px_1fr] md:gap-20">
        <div className="rv mx-auto w-full max-w-[320px] md:mx-0">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4F46E5] via-[#7C74F0] to-[#FFB59A] p-[1px]">
            <div className="flex aspect-[4/5] flex-col justify-between rounded-[23px] bg-[#17171C] p-7 text-white">
              <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/50">
                {t('section.about')}
              </span>
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 font-mono text-[22px] font-semibold backdrop-blur">
                  GZ
                </div>
                <div className="mt-5 font-serif text-[26px] font-semibold">
                  {SITE_AUTHOR}
                </div>
                <div className="mt-1 text-[13.5px] text-white/60">
                  {t('about.role')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-center">
          <h1 className="rv font-serif text-[clamp(26px,3.2vw,38px)] font-semibold leading-[1.3] tracking-tightest">
            {t('about.sloganLine1')}
            <br />
            {t('about.sloganLead')}
            <span className="text-[var(--accent)]">{t('about.sloganAccent')}</span>
            {t('about.sloganEnd')}
          </h1>
          <p className="rv rv-d1 mt-6 max-w-[560px] text-[15.5px] leading-[1.9] text-[var(--text-secondary)]">
            {t('about.p1')}
          </p>
          <p className="rv rv-d1 mt-4 max-w-[560px] text-[15.5px] leading-[1.9] text-[var(--text-secondary)]">
            {t('about.p2')}
          </p>
          <div className="rv rv-d2 mt-9 flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <span
                key={skill}
                className="chip rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-1.5 text-[13px] font-medium text-[var(--text-primary)]"
              >
                {skill}
              </span>
            ))}
          </div>
          <div className="rv rv-d3 mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`${prefix}/about/projects`}
              className="btn-primary inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-[14.5px] font-medium text-white"
            >
              {t('about.viewProjects')}
            </Link>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="link-underline text-[14px] font-medium text-[var(--text-primary)]"
            >
              {SITE_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
