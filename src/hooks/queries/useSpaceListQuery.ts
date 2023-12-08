import { useQueryClient } from '@tanstack/react-query'
import { fetchSpaceListAPI } from '@/apis/space'
import { SPACE_LIST } from '@/constants/querykey'
import { type SpaceList } from '@/models/space'
import { type User } from '@/models/user'
import useSuspenseQuery from './useSuspenseQuery'

interface UseSpaceListResponse {
  spaceList: SpaceList
}
export function useSpaceListQuery(): UseSpaceListResponse {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData<User>(['user'])
  const { data: res } = useSuspenseQuery([SPACE_LIST, user?.userId], () => fetchSpaceListAPI())
  const spaceList = res.data
  if (!spaceList) throw new Error('공간 정보를 불러올 수 없습니다.')
  return { spaceList }
}
