import { useQuery } from '@tanstack/react-query'
import { fetchTreeAPI } from '@/apis/tree'
import { TREE } from '@/constants/queryKeyConstant'
import { to, type ResponseBase } from '@/utils/api'

interface TreeResponse {
  isLoaded: boolean
}

interface Tree {
  id: string
  name: string
  children: Tree[]
}

export function useTree(spaceId: string): ResponseBase<Tree> & TreeResponse {
  const { data: res } = useQuery([TREE, spaceId], () => to(fetchTreeAPI(spaceId)), {
    staleTime: 1000 * 60 * 60,
    enabled: !!spaceId
  })

  return {
    data: res?.data ?? null,
    message: res?.message ?? '스페이스 리스트를 불러오지 못했습니다.',
    status: res?.status ?? 'failure',
    isLoaded: !!res
  }
}
