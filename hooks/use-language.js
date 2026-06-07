'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { getTranslation } from '@/lib/i18n'

const useLanguage = (defaultLang = 'en') => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['lang'])
  const initialLang = cookies.lang || defaultLang
  const [lang, setLang] = useState(initialLang)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Re-sync from cookie if it was set externally (e.g., on another tab)
    if (cookies.lang && cookies.lang !== lang) {
      setLang(cookies.lang)
    }
    setMounted(true)
  }, [cookies.lang, lang])

  const setAndSaveLang = (newLang) => {
    setLang(newLang)
    document.documentElement.lang = newLang
    setCookie('lang', newLang, { path: '/' })
  }

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'zh' : 'en'
    setAndSaveLang(newLang)
    router.refresh()
  }

  const t = (key) => {
    const dict = getTranslation(lang)
    return dict[key] || key
  }

  return { lang, toggleLang, t, mounted }
}

export default useLanguage
