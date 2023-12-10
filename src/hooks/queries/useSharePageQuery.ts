import { useParams } from 'react-router-dom'
import { getSpaceFromBackAPI } from '@/apis/page'
import { SPACE } from '@/constants'
import { SHARE_PAGE } from '@/constants/querykey'
import { type SharePage } from '@/models/space'
import { useServerSideProps } from '../serverSideProps'
import { useSuspenseQuery } from './useSuspenseQuery'

type SharePageHook = () => {
  sharePage: SharePage
  isSuccess: boolean
  pageId: string | undefined
}
export const useSharePageQuery: SharePageHook = () => {
  const { source, isServerSide } = useServerSideProps<SharePage>(SPACE)
  const { pageId } = useParams()
  const { data, ...rest } = useSuspenseQuery([SHARE_PAGE, pageId], () => {
    if (isServerSide) return { ...source, privilege: source.privilege ?? 'VIEW' }
    return getSpaceFromBackAPI(pageId ?? '')
  })
  return { sharePage: data, pageId, ...rest }
}
