import type { Theme } from '@/types'

// Default is light (paper theme). Do not call cookies() here — that would
// make the root layout dynamic and fight `force-static` pages. The blocking
// script in `app/layout.tsx` applies a stored cookie before first paint.
const useServerDarkMode = (defaultTheme: Theme = 'light'): Theme => {
  return defaultTheme
}

export default useServerDarkMode
