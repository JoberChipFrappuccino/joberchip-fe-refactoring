import { useParams } from 'react-router-dom'
import { getSpaceFromBackAPI } from '@/apis/page/page'
import { SPACE } from '@/constants'
import { SHARE_PAGE } from '@/constants/querykey'
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
  const { data, ...rest } = useSuspenseQuery([SHARE_PAGE, pageId], () => {
    if (typeof window === 'undefined') return { ...SSRSharePageState, privilege: SSRSharePageState.privilege ?? 'VIEW' }
    return getSpaceFromBackAPI(pageId ?? '')
  })

  // HACK : x,y,w,h가 없는 경우가 있으서 임의의 값으로 채워줍니다.
  // HACK : 화면이 로드되면 자동으로 최적화된 위치로 재배치됩니다.
  // data.children = data.children.map((child) => {
  //   if (typeof child.x !== 'number' || typeof child.x !== 'string') {
  //     child.x = 0
  //     child.y = 0
  //     child.w = 2
  //     child.h = 1
  //   }
  //   return child
  // })

  return { sharePage: data, pageId, ...rest }
}
