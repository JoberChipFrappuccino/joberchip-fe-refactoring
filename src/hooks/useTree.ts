import { useQuery } from '@tanstack/react-query'
import { getTreeAPI } from '@/apis/page'
import { SEO } from '@/constants'
import { TREE } from '@/constants/querykey'
import { type ResponseBase } from '@/utils/api'
import useServerSideProps from './serverSideProps'

export interface ITree {
  key: string
  pageId: string
  parentId: string
  title: string
  selectable: boolean
  children: ITree[]
}

export function useTree(spaceId: string): ResponseBase<ITree> {
  const { isServerSide } = useServerSideProps(SEO)
  const { data: res } = useQuery([TREE, spaceId], () => getTreeAPI(spaceId), {
    staleTime: 1000 * 60 * 60,
    enabled: !!spaceId && !isServerSide
  })

  return {
    data: res?.data,
    message: res?.message ?? '스페이스 리스트를 불러오지 못했습니다.',
    status: res?.status ?? 'failure'
  }
}
