import { cookies } from 'next/headers'

const useServerLanguage = () => {
  try {
    const cookieStore = cookies()
    const langCookie = cookieStore.get('lang')
    return langCookie?.value || 'en'
  } catch {
    return 'en'
  }
}

export default useServerLanguage
