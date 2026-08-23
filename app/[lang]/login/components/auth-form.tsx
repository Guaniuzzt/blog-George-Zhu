'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import useLocale from '@/hooks/use-locale'

type Mode = 'login' | 'register'

function signupErrorMessage(error: { message: string; code?: string }) {
  switch (error.code) {
    case 'email_address_not_authorized':
      return 'Supabase default SMTP can only email members of this project organization. Use a team member email, or configure custom SMTP in the Auth dashboard.'
    case 'over_email_send_rate_limit':
      return 'Too many confirmation emails were sent. Wait a bit and try again.'
    case 'email_address_invalid':
      return 'This email domain is not allowed. Use a real inbox address.'
    default:
      return error.message
  }
}

export default function AuthForm({ redirectTo }: { redirectTo?: string }) {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
  const { routePrefix } = useLocale()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setError(error.message)
      } else {
        router.push(redirectTo || `/${routePrefix}/blog`)
        router.refresh()
      }
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) {
        setError(signupErrorMessage(error))
      } else if (data.session) {
        router.push(redirectTo || `/${routePrefix}/blog`)
        router.refresh()
      } else if (!data.user?.identities?.length) {
        // Supabase returns 200 with an empty identities list when the email
        // already exists, and does not send another confirmation email.
        setError('This email is already registered. Try signing in instead.')
      } else {
        setMessage('Check your email for a confirmation link.')
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      {message && (
        <p className="text-green-600 text-sm">{message}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-xl bg-[var(--accent)] text-white font-medium hover:shadow-lg hover:shadow-[var(--accent)]/25 transition-all duration-300 disabled:opacity-50"
      >
        {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>

      <p className="text-sm text-[var(--text-muted)] text-center">
        {mode === 'login' ? (
          <>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('register')}
              className="text-[var(--accent)] hover:underline"
            >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('login')}
              className="text-[var(--accent)] hover:underline"
            >
              Sign In
            </button>
          </>
        )}
      </p>
    </form>
  )
}
