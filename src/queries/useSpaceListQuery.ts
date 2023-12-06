import { fetchSpaceListAPI } from '@/apis/space'
import { SPACE_LIST } from '@/constants/querykey'
import { type SpaceList } from '@/models/space'
import { type User } from '@/models/user'
import useSuspenseQuery from './useSuspenseQuery'

interface UseSpaceListResponse {
  spaceList: SpaceList
}
export function useSpaceListQuery(userId: User['userId']): UseSpaceListResponse {
  const { data: res } = useSuspenseQuery([SPACE_LIST, userId], () => fetchSpaceListAPI())
  const spaceList = res.data
  if (!spaceList) throw new Error('공간 정보를 불러올 수 없습니다.')
  return { spaceList }
}
