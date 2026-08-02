import './globals.css'
import type { ReactNode } from 'react'
import useServerDarkMode from '@/hooks/use-server-dark-mode'

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = useServerDarkMode()

  return (
    <html className={theme}>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
