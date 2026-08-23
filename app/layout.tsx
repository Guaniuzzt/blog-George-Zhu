import './globals.css'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import useServerDarkMode from '@/hooks/use-server-dark-mode'
import { clashDisplay, jetbrainsMono, satoshi } from './fonts'

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = useServerDarkMode()

  return (
    <html
      className={`${theme} ${satoshi.variable} ${clashDisplay.variable} ${jetbrainsMono.variable} ${satoshi.className}`}
    >
      <body className="min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
