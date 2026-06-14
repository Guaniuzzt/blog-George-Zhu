import { cookies, headers } from 'next/headers'
import type { Locale } from '@/types'

const useServerLanguage = (): Locale => {
  try {
    const cookieStore = cookies()
    const langCookie = cookieStore.get('lang')

    // 用户显式选择过语言 → 尊重其选择
    if (langCookie?.value === 'en' || langCookie?.value === 'zh') {
      return langCookie.value
    }

    // 无 cookie → 按 IP 国家判断
    const headersList = headers()
    const country = headersList.get('x-vercel-ip-country')

    if (country === 'CN') {
      return 'zh'
    }

    return 'en'
  } catch {
    return 'en'
  }
}

export default useServerLanguage