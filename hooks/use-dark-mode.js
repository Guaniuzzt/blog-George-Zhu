import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const useDarkMode = (defaultTheme = 'dark') => {
  const [theme, setTheme] = useState(defaultTheme)
  const [_, setCookie] = useCookies(['theme'])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const setAndSaveTheme = (newTheme) => {
    setTheme(newTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
    setCookie('theme', newTheme)
  }

  const toggleTheme = () => {
    setAndSaveTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme, mounted }
}

export default useDarkMode
