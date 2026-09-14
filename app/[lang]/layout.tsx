import { type ReactNode } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ScrollProgress from '@/components/scroll-progress'
import UserMenu from '@/components/user-menu'
import Chatbot from '@/components/chatbot'
import { routeLocales, routeToLocale, localeToRoute } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { RouteLocale } from '@/types'

export function generateStaticParams() {
  return routeLocales.map((lang) => ({ lang }))
}

export const revalidate = 60
export const preferredRegion = 'sin1'

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = routeToLocale(params.lang)

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: '%s | George Zhu',
      default: 'George Zhu',
    },
    description:
      lang === 'zh'
        ? '全栈开发者 & 创意技术人'
        : 'Full-stack developer & creative technologist',
    alternates: {
      languages: {
        'zh-CN': `/${localeToRoute('zh')}`,
        'en': `/${localeToRoute('en')}`,
      },
      types: {
        'application/rss+xml': `/${localeToRoute(lang)}/feed.xml`,
      },
    },
  }
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { lang: string }
}) {
  if (!routeLocales.includes(params.lang as RouteLocale)) {
    notFound()
  }

  const routePrefix = params.lang as RouteLocale
  const lang = routeToLocale(routePrefix)

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang="${lang}"`,
        }}
      />

      <ScrollProgress />
      <Header userSlot={<UserMenu />} />

      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="mx-auto w-full max-w-[1120px] flex-1 px-6 pt-28 pb-16">
          {children}
        </main>
        <Footer routePrefix={routePrefix} />
      </div>

      <Chatbot />
      <SpeedInsights />
    </>
  )
}
