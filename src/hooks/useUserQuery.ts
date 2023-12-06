import { loadUserInfoAPI } from '@/apis/user'
import useSuspenseQuery from '@/queries/useSuspenseQuery'

export const useUser = () => {
  const { data } = useSuspenseQuery(['user'], () => loadUserInfoAPI())
  const user = data?.data
  if (!user) throw new Error('사용자 정보를 불러올 수 없습니다.')
  return { user }
}
