import { useParams } from 'react-router-dom'
import { getSpaceFromBackAPI } from '@/apis/space'
import { SPACE } from '@/constants'
import { type SharePage } from '@/models/space'
import useServerSideProps from './serverSideProps'
import useSuspenseQuery from './useSuspenseQuery'

type SharePageStateManager = () => {
  sharePage: SharePage
  isSuccess: boolean
  pageId: string | undefined
}
export const useSharePage: SharePageStateManager = () => {
  const SSRSharePageState: SharePage = useServerSideProps(SPACE)
  const { pageId } = useParams()
  const { data, isSuccess } = useSuspenseQuery(['sharePage', pageId], () => {
    if (typeof window === 'undefined') return { ...SSRSharePageState, privilege: SSRSharePageState.privilege ?? 'VIEW' }
    return getSpaceFromBackAPI(pageId ?? '')
  })

  return { sharePage: data, pageId, isSuccess }
}
