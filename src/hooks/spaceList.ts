import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchSpaceListAPI } from '@/apis/space'
import { SPACE_LIST } from '@/constants/queryKeyConstant'
import { type SpaceList } from '@/models/space'
import { toast } from '@/utils'

const errorMessage = '스페이스 리스트를 불러오지 못했습니다.'

interface UseSpaceListResponse {
  spaceList: SpaceList | null
}
export function useSpaceList(userId: string): UseSpaceListResponse {
  const navagate = useNavigate()
  const {
    data: res,
    isError,
    isFetched
  } = useQuery([SPACE_LIST, userId], () => fetchSpaceListAPI(), {
    enabled: !!userId
  })

  if (isError) {
    toast(res?.message ?? errorMessage, 'failure')
    navagate('/')
  }

  if (isFetched && res) {
    toast(res.message, 'success')
  }

  const spaceList = res?.data ?? null
  return { spaceList }
}
