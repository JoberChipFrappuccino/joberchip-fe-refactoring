import { QueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { type FetchLayoutBlocksParam, getSpaceFromBackAPI, fetchLayoutAPI } from '@/apis/page'
import { SPACE } from '@/constants'
import { SHARE_PAGE } from '@/constants/querykey'
import { type SharePage } from '@/models/space'
import { to, toast } from '@/utils'
import { useServerSideProps } from '../serverSideProps'
import { useSuspenseQuery } from './useSuspenseQuery'

type SharePageHook = () => {
  sharePage: SharePage
  isSuccess: boolean
  pageId: string | undefined
  fetchLayout: (pageId: string | undefined, layout: FetchLayoutBlocksParam[]) => Promise<void>
}
export const useSharePageQuery: SharePageHook = () => {
  const queryClient = new QueryClient()
  const { source, isServerSide } = useServerSideProps<SharePage>(SPACE)
  const { pageId } = useParams()
  const { data, ...rest } = useSuspenseQuery([SHARE_PAGE, pageId], () => {
    if (isServerSide) return { ...source, privilege: source.privilege ?? 'VIEW' }
    return getSpaceFromBackAPI(pageId ?? '')
  })

  const fetchLayout = async (pageId: string | undefined, layout: FetchLayoutBlocksParam[]) => {
    if (!pageId) return toast('잘못된 접근입니다.', 'error')
    const res = await to(fetchLayoutAPI(pageId, layout))
    if (res.status === 'success') {
      toast(res.message, res.status)
    } else {
      toast(res.message, res.status)
      queryClient.fetchQuery([SHARE_PAGE, pageId], () => getSpaceFromBackAPI(pageId))
    }
  }
  return { sharePage: data, pageId, fetchLayout, ...rest }
}
