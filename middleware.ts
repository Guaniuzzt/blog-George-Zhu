import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const routeLocales = ['cn', 'eng']
const defaultLocale = 'eng'

const protectedPathPrefixes = ['/blog/new']

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

function isProtectedPath(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(cn|eng)/, '')
  return protectedPathPrefixes.some((prefix) => pathWithoutLocale.startsWith(prefix))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Speed Insights / Analytics ingest at /_vercel/*; locale redirects would drop those beacons.
  if (pathname.startsWith('/_next') || pathname.startsWith('/_vercel')) {
    return NextResponse.next()
  }

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

  if (isProtectedPath(pathname)) {
    return await updateSession(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_vercel|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|js)$).*)',
  ],
}
