import { cache } from 'react'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

function hasSupabaseSessionCookie(
  store: Awaited<ReturnType<typeof cookies>>
) {
  return store.getAll().some(
    (cookie) =>
      cookie.name.startsWith('sb-') &&
      cookie.name.includes('auth-token') &&
      !cookie.name.includes('code-verifier') &&
      Boolean(cookie.value)
  )
}

/**
 * 当前登录用户。
 *
 * - `React.cache`：同一次 RSC 渲染内（列表 + NewPostButton）只打一次 Auth。
 * - 没有 Supabase session cookie 时直接返回 null，跳过跨区 getUser() 网络请求。
 */
export const getCurrentUser = cache(async () => {
  const store = await cookies()
  if (!hasSupabaseSessionCookie(store)) return null

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
})
