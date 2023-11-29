import { useQuery } from '@tanstack/react-query'
import { fetchSpaceListAPI } from '@/apis/space'
import { DEFAULT_CACHE_TIME } from '@/constants'
import { SPACE_LIST } from '@/constants/queryKeyConstant'
import { type SpaceList } from '@/models/space'
import { to, type ResponseBase } from '@/utils/api'

interface SpaceListResponse {
  isLoaded: boolean
}
export function useSpaceList(userId: string): ResponseBase<SpaceList[]> & SpaceListResponse {
  const { data: res } = useQuery([SPACE_LIST, userId], () => to(fetchSpaceListAPI()), {
    staleTime: DEFAULT_CACHE_TIME,
    enabled: !!userId
  })

  return {
    data: res?.data ?? null,
    message: res?.message ?? '스페이스 리스트를 불러오지 못했습니다.',
    status: res?.status ?? 'failure',
    isLoaded: !!res
  }
}
