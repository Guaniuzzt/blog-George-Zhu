import { getCurrentUser } from '@/lib/auth'
import UserMenu from './user-menu'

/** @deprecated Use UserMenu directly as a client component */
export default async function ServerUserMenu() {
  return <UserMenu />
}
