import { JetBrains_Mono, Plus_Jakarta_Sans, Syne } from 'next/font/google'

// Self-hosted at build time via next/font — no Fontshare/Google request in the browser.
// Plus Jakarta Sans stands in for Satoshi; Syne for Clash Display.

export const satoshi = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-satoshi',
  display: 'swap',
})

export const clashDisplay = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-clash',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})
