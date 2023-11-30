import { useEffect } from 'react'
import { useSharePageModeStore } from '@/store/sharePage'
import { useSharePageQuery } from '../queries/useSharePageQuery'

export const useSharePageMode = () => {
  const { pageId, isSuccess } = useSharePageQuery()
  const { mode, setSharePageMode } = useSharePageModeStore()

  useEffect(() => {
    if (isSuccess) {
      setSharePageMode(mode === 'EDIT' ? 'VIEW' : 'EDIT')
    }
  }, [pageId, isSuccess])

  return { mode, setSharePageMode }
}
