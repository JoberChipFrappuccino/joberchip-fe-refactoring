import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SPACE } from '@/constants'
import { type SharePage } from '@/models/space'
import { useSharePageStore } from '@/store/sharePage'
import useServerSideProps from './serverSideProps'

type SharePageStateManager = () => {
  isFetching: boolean
  isLoaded: boolean
  isFalture: boolean
}
export const useSharePageStateManager: SharePageStateManager = () => {
  const { loadSharePageFromBack, setSharePageMode, setSharePage, isFetching, isLoaded, isFalture } = useSharePageStore()
  const SSRSharePageState: SharePage = useServerSideProps(SPACE)
  const { pageId } = useParams()
  useEffect(() => {
    if (isLoaded) {
      return
    }
    if (SSRSharePageState.pageId) {
      setSharePage(SSRSharePageState)
      setSharePageMode(SSRSharePageState.privilege === 'EDIT' ? 'edit' : 'view')
      return
    }
    loadSharePageFromBack(pageId)
  }, [pageId, isLoaded])

  return { isFetching, isLoaded, isFalture }
}
