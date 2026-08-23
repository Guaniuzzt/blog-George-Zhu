import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const routeLocales = ['cn', 'eng']
const defaultLocale = 'cn'

const protectedPathPrefixes = ['/blog/new']
const protectedPathPatterns = [/^\/blog\/[^/]+\/edit$/, /^\/blog\/[^/]+\/preview$/]

function isProtectedPath(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(cn|eng)/, '')
  return (
    protectedPathPrefixes.some((prefix) => pathWithoutLocale.startsWith(prefix)) ||
    protectedPathPatterns.some((pattern) => pattern.test(pathWithoutLocale))
  )
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
  // xml/txt 排除：/sitemap.xml、/robots.txt 由根路由直接服务，不吃 locale 重写。
  matcher: [
    '/((?!_next/static|_next/image|_vercel|favicon.ico|cn$|eng$|.*\\.(?:svg|png|jpg|jpeg|gif|webp|js|xml|txt)$).+)',
  ],
}
