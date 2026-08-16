import { type ReactNode } from 'react'
import Header from '@/components/header'
import UserMenu from '@/components/user-menu'
import Chatbot from '@/components/chatbot'
import PageTransition from '@/components/page-transition'
import { routeLocales, routeToLocale, localeToRoute } from '@/lib/i18n'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { RouteLocale } from '@/types'

export function generateStaticParams() {
  return routeLocales.map((lang) => ({ lang }))
}

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang = routeToLocale(params.lang)

  return {
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

      <div className="fixed inset-0 grid-bg pointer-events-none opacity-[0.03] dark:opacity-[0.02]" />

      <Header
        userSlot={<UserMenu />}
      />

      <main className="max-w-4xl mx-auto px-6 pt-28 pb-24 relative z-10">
        <PageTransition>{children}</PageTransition>
      </main>

      <Chatbot />
      <SpeedInsights />
    </>
  )
}
