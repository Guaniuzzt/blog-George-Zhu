'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { getTranslation } from '@/lib/i18n'
import type { Locale } from '@/types'

const useLanguage = (defaultLang: Locale = 'en') => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['lang'])
  const initialLang: Locale = (cookies.lang as Locale) || defaultLang
  const [lang, setLang] = useState<Locale>(initialLang)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (cookies.lang && cookies.lang !== lang) {
      setLang(cookies.lang as Locale)
    }
    setMounted(true)
  }, [cookies.lang, lang])

  const setAndSaveLang = (newLang: Locale) => {
    setLang(newLang)
    document.documentElement.lang = newLang
    setCookie('lang', newLang, { path: '/' })
  }

  const toggleLang = () => {
    const newLang: Locale = lang === 'en' ? 'zh' : 'en'
    setAndSaveLang(newLang)
    router.refresh()
  }

  const t = (key: string): string => {
    const dict = getTranslation(lang) as Record<string, string>
    return dict[key] || key
  }

  return { lang, toggleLang, t, mounted }
}

export default useLanguage