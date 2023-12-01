import { useParams } from 'react-router-dom'
import { getSpaceFromBackAPI } from '@/apis/space'
import { SPACE } from '@/constants'
import { type SharePage } from '@/models/space'
import useServerSideProps from '../hooks/serverSideProps'
import useSuspenseQuery from './useSuspenseQuery'

type SharePageHook = () => {
  sharePage: SharePage
  isSuccess: boolean
  pageId: string | undefined
}
export const useSharePageQuery: SharePageHook = () => {
  const SSRSharePageState: SharePage = useServerSideProps(SPACE)
  const { pageId } = useParams()
  const { data, ...rest } = useSuspenseQuery(['sharePage', pageId], () => {
    if (typeof window === 'undefined') return { ...SSRSharePageState, privilege: SSRSharePageState.privilege ?? 'VIEW' }
    return getSpaceFromBackAPI(pageId ?? '')
  })

  // HACK : children 중에 x가 없는 것들은 제거해준다.
  data.children = data.children.filter((child) => typeof child.x === 'number' || typeof child.x === 'string')

  return { sharePage: data, pageId, ...rest }
}