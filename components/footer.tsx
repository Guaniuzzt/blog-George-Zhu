import { SITE_AUTHOR, SITE_EMAIL, SITE_X_URL } from '@/lib/site'
import { getTranslation, routeToLocale } from '@/lib/i18n'
import type { RouteLocale } from '@/types'

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H22l-6.9 7.9L23.3 22h-6.4l-5-6.6L6.1 22H3l7.4-8.4L1 2h6.6l4.5 6L18.9 2Zm-1.1 18h1.7L7.4 3.9H5.6L17.8 20Z" />
    </svg>
  )
}

function RssIcon() {
  return (
    <svg
      width="14"
      height="14"
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
  )
}

function MailIcon() {
  return (
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
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export default function Footer({ routePrefix }: { routePrefix: RouteLocale }) {
  const lang = routeToLocale(routePrefix)
  const t = (key: string) => (getTranslation(lang) as Record<string, string>)[key] || key

  const social = [
    { href: SITE_X_URL, label: 'X', icon: <XIcon /> },
    { href: `/${routePrefix}/feed.xml`, label: 'RSS', icon: <RssIcon /> },
    { href: `mailto:${SITE_EMAIL}`, label: 'Email', icon: <MailIcon /> },
  ]

  return (
    <footer className="relative z-10 border-t border-[var(--border-color)]">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--text-primary)] font-mono text-[11px] font-semibold text-[var(--bg-primary)]">
            GZ
          </span>
          <span className="text-[13.5px] text-[var(--text-secondary)]">
            © 2026 {SITE_AUTHOR} · {t('footer.builtWith')}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          {social.map((item) => {
            const external = item.href.startsWith('http')
            return (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="soc flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] text-[var(--text-secondary)]"
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {item.icon}
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
