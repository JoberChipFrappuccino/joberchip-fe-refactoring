import { fetchSpaceListAPI } from '@/apis/space'
import { SEO } from '@/constants'
import { SPACE_LIST } from '@/constants/querykey'
import { useServerSideProps } from '../serverSideProps'
import useSuspenseQuery from './useSuspenseQuery'

export function useSpaceListQuery() {
  const { isServerSide } = useServerSideProps(SEO)
  const { data: res, ...rest } = useSuspenseQuery([SPACE_LIST], () => fetchSpaceListAPI(), {
    enabled: !isServerSide
  })
  const spaceList = res?.data
  return { spaceList, ...rest }
}
