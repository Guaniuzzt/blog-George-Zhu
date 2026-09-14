import { useState, useEffect } from 'react'
import type { Theme } from '@/types'

function readThemeFromDom(fallback: Theme): Theme {
  if (typeof document === 'undefined') return fallback
  if (document.documentElement.classList.contains('dark')) return 'dark'
  if (document.documentElement.classList.contains('light')) return 'light'
  return fallback
}

function persistTheme(theme: Theme) {
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(theme)
  document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`
}

const useDarkMode = (defaultTheme: Theme = 'light') => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(readThemeFromDom(defaultTheme))
    setMounted(true)
  }, [defaultTheme])

  const setAndSaveTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    persistTheme(newTheme)
  }

  const toggleTheme = () => {
    setAndSaveTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme, mounted }
}

export default useDarkMode
