import { fetchSpaceListAPI } from '@/api/space'
import { SPACE_LIST } from '@/constants/queryKeyConstant'
import { type SpaceList } from '@/models/space'
import { to, type ResponseBase } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'

interface SpaceListResponse {
  isLoaded: boolean
}
export function useSpaceList(userId: string): ResponseBase<SpaceList[]> & SpaceListResponse {
  const { data: res } = useQuery([SPACE_LIST, userId], () => to(fetchSpaceListAPI()), {
    staleTime: 1000 * 60 * 60,
    enabled: !!userId
  })

  return {
    data: res?.data ?? null,
    message: res?.message ?? '스페이스 리스트를 불러오지 못했습니다.',
    status: res?.status ?? 'failure',
    isLoaded: !!res
  }
}
