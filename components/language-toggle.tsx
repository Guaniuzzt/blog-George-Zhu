'use client'

import useLanguage from '@/hooks/use-language'

export default function LanguageToggle() {
  const { lang, toggleLang, mounted } = useLanguage()

  if (!mounted) {
    return <div className="w-[52px] h-7" />
  }

  return (
    <button
      onClick={toggleLang}
      className="relative w-[52px] h-7 rounded-full border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-xs font-medium tracking-wide transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] flex items-center justify-center"
      aria-label={lang === 'en' ? '切换中文' : 'Switch to English'}
    >
      {lang === 'en' ? '中' : 'EN'}
    </button>
  )
}