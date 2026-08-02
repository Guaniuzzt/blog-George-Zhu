import AuthForm from './components/auth-form'
import H1 from '@/components/h1'
import { MotionItem } from '@/components/page-transition'

export const metadata = { title: 'Login' }

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirectTo?: string }
}) {
  return (
    <>
      <H1>Login / Register</H1>
      <MotionItem delay={0.1}>
        <p className="text-[var(--text-secondary)] mb-8">
          Sign in to create and manage blog posts.
        </p>
      </MotionItem>
      <MotionItem delay={0.15}>
        <AuthForm redirectTo={searchParams.redirectTo} />
      </MotionItem>
    </>
  )
}
