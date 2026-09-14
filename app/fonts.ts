import { Inter, JetBrains_Mono, Noto_Serif_SC } from 'next/font/google'

export const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Latin subset only — CJK titles fall back to Songti SC / STSong to keep LCP small.
export const serif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
  adjustFontFallback: false,
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})
