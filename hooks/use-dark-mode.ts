import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import type { Theme } from '@/types'

const useDarkMode = (defaultTheme: Theme = 'dark') => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [, setCookie] = useCookies(['theme'])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const setAndSaveTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
    setCookie('theme', newTheme, { path: '/' })
  }

  const toggleTheme = () => {
    setAndSaveTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme, mounted }
}

export default useDarkMode
