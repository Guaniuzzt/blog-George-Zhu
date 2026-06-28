import { getCurrentUser } from '@/lib/auth'
import UserMenu from './user-menu'

export default async function ServerUserMenu() {
  const user = await getCurrentUser()
  return <UserMenu user={user} />
}
