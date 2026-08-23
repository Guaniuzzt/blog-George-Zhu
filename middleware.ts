import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const routeLocales = ['cn', 'eng']
const defaultLocale = 'cn'

const protectedPathPrefixes = ['/blog/new']

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
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
    return NextResponse.rewrite(url)
  }

  if (isProtectedPath(pathname)) {
    return await updateSession(request)
  }

  return NextResponse.next()
}

export const config = {
  // `.+` (not `.*`) so `/` skips middleware and uses the next.config rewrite to `/cn`.
  // Exact `/cn` and `/eng` also skip so the Singapore ISR cache can be served without a rewrite hop.
  matcher: [
    '/((?!_next/static|_next/image|_vercel|favicon.ico|cn$|eng$|.*\\.(?:svg|png|jpg|jpeg|gif|webp|js)$).+)',
  ],
}
