import { useEffect } from 'react'
import { useSharePageModeStore } from '@/store/sharePage'
import { useSharePage } from './useSharePageManager'

export const useSharePageMode = () => {
  const { pageId, isSuccess } = useSharePage()
  const { mode, setSharePageMode } = useSharePageModeStore()

  useEffect(() => {
    if (isSuccess) {
      setSharePageMode(mode === 'EDIT' ? 'VIEW' : 'EDIT')
    }
  }, [pageId, isSuccess])

  return { mode, setSharePageMode }
}
