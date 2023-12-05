import { useQuery } from '@tanstack/react-query'
import { fetchSpaceListAPI } from '@/apis/space'
import { SPACE_LIST } from '@/constants/querykey'
import { type SpaceList } from '@/models/space'

interface UseSpaceListResponse {
  spaceList: SpaceList | null
}
export function useSpaceListQuery(userId: string): UseSpaceListResponse {
  const { data: res, ...rest } = useQuery([SPACE_LIST, userId], () => fetchSpaceListAPI(), {
    enabled: !!userId
  })

  const spaceList = res?.data ?? null
  return { spaceList, ...rest }
}
