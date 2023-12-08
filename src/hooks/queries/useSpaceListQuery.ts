import { useQuery } from '@tanstack/react-query'
import { fetchSpaceListAPI } from '@/apis/space'
import { SPACE_LIST } from '@/constants/querykey'

export function useSpaceListQuery() {
  const { data: res, ...rest } = useQuery([SPACE_LIST], () => fetchSpaceListAPI())
  const spaceList = res?.data
  return { spaceList, ...rest }
}
