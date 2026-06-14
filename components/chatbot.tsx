'use client'

import Script from 'next/script'

declare global {
  interface Window {
    initializeChatbot?: () => void
  }
}

export default function Chatbot() {
  return (
    <Script
      src="/chatbot.js"
      strategy="lazyOnload"
      onLoad={() => window.initializeChatbot?.()}
    />
  )
}