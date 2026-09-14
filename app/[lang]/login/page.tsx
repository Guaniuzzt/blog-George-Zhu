import AuthForm from './components/auth-form'
import H1 from '@/components/h1'
import { getTranslation, routeToLocale } from '@/lib/i18n'
import type { Metadata } from 'next'

export function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Metadata {
  const dict = getTranslation(routeToLocale(params.lang))
  return { title: dict['login.title'] }
}

export default function LoginPage({
  params,
  searchParams,
}: {
  params: { lang: string }
  searchParams: { redirectTo?: string }
}) {
  const dict = getTranslation(routeToLocale(params.lang))

  return (
    <>
      <H1>{dict['login.title']}</H1>
      <p className="text-[var(--text-secondary)] mb-8">
        {dict['login.subtitle']}
      </p>
      <AuthForm redirectTo={searchParams.redirectTo} />
    </>
  )
}
