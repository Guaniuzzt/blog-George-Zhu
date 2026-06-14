import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Header from '@/components/header'
import Chatbot from '@/components/chatbot'
import PageTransition from '@/components/page-transition'
import useServerDarkMode from '@/hooks/use-server-dark-mode'
import useServerLanguage from '@/hooks/use-server-language'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: {
    template: '%s | George Zhu',
    default: 'George Zhu',
  },
  description: 'Full-stack developer & creative technologist',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = useServerDarkMode()
  const lang = useServerLanguage()

  return (
    <html lang={lang} className={theme}>
      <body className="min-h-screen">
        <div className="fixed inset-0 grid-bg pointer-events-none opacity-[0.03] dark:opacity-[0.02]" />

        <Header lang={lang} />

        <main className="max-w-4xl mx-auto px-6 pt-28 pb-24 relative z-10">
          <PageTransition>{children}</PageTransition>
        </main>

        <Chatbot />
        <SpeedInsights />
      </body>
    </html>
  )
}