import './globals.css'
import type { ReactNode } from 'react'
import useServerDarkMode from '@/hooks/use-server-dark-mode'

const fontUrl = 'https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700&f[]=jetbrains-mono@400,500&display=swap'

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = useServerDarkMode()

  return (
    <html className={theme}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preload" href={fontUrl} as="style" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement("link");l.rel="stylesheet";l.href="${fontUrl}";document.head.appendChild(l)})()`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-css-tags */}
          <link rel="stylesheet" href={fontUrl} />
        </noscript>
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
