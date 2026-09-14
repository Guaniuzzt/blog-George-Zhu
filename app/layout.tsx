import './globals.css'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import useServerDarkMode from '@/hooks/use-server-dark-mode'
import { jetbrainsMono, sans, serif } from './fonts'

const THEME_INIT_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )theme=(dark|light)/);var t=m?m[1]:'light';var e=document.documentElement;e.classList.remove('light','dark');e.classList.add(t);}catch(e){}})();`

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = useServerDarkMode()

  return (
    <html
      className={`${theme} ${sans.variable} ${serif.variable} ${jetbrainsMono.variable} ${sans.className}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
