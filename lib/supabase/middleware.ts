import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Strip locale prefix before checking protected paths
  const pathWithoutLocale = request.nextUrl.pathname.replace(/^\/(cn|eng)/, '')
  const protectedPaths = ['/blog/new']
  const isProtected = protectedPaths.some((path) =>
    pathWithoutLocale.startsWith(path)
  )

  if (isProtected) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      const url = request.nextUrl.clone()
      const localeMatch = request.nextUrl.pathname.match(/^\/(cn|eng)/)
      const currentLocale = localeMatch ? localeMatch[1] : 'cn'
      url.pathname = `/${currentLocale}/login`
      url.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
