import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const routeLocales = ['cn', 'eng']
const defaultLocale = 'eng'

function getPreferredLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language') ?? ''
  if (acceptLang.startsWith('zh') || acceptLang.includes(',zh')) {
    return 'cn'
  }

  const country = request.headers.get('x-vercel-ip-country')
  if (country === 'CN') {
    return 'cn'
  }

  return defaultLocale
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // API routes: no locale prefix needed
  if (pathname.startsWith('/auth/') || pathname.startsWith('/posts')) {
    return await updateSession(request)
  }

  const pathnameHasLocale = routeLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (!pathnameHasLocale) {
    const locale = getPreferredLocale(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(url)
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
