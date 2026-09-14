import { SITE_AUTHOR } from '@/lib/site'
import { getTranslation, routeToLocale } from '@/lib/i18n'
import type { RouteLocale } from '@/types'

export default function Footer({ routePrefix }: { routePrefix: RouteLocale }) {
  const lang = routeToLocale(routePrefix)
  const t = (key: string) => (getTranslation(lang) as Record<string, string>)[key] || key

  return (
    <footer className="relative z-10 border-t border-[var(--border-color)]">
      <div className="mx-auto flex max-w-[1120px] items-center px-6 py-10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--text-primary)] font-mono text-[11px] font-semibold text-[var(--bg-primary)]">
            GZ
          </span>
          <span className="text-[13.5px] text-[var(--text-secondary)]">
            © 2026 {SITE_AUTHOR} · {t('footer.builtWith')}
          </span>
        </div>
      </div>
    </footer>
  )
}
