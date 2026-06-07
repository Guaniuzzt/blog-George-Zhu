import { cookies, headers } from 'next/headers'

const useServerLanguage = () => {
  try {
    const cookieStore = cookies()
    const langCookie = cookieStore.get('lang')

    // User explicitly chose a language → respect their choice
    if (langCookie?.value) {
      return langCookie.value
    }

    // No cookie → detect by IP country
    const headersList = headers()
    const country = headersList.get('x-vercel-ip-country')

    // If in China, default to Chinese; otherwise English
    if (country === 'CN') {
      return 'zh'
    }

    return 'en'
  } catch {
    return 'en'
  }
}

export default useServerLanguage
