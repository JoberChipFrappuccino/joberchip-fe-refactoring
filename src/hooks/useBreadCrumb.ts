import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getBreadCrumb } from '@/apis/page'
import { BREAD_CRUMB } from '@/constants/querykey'

export const useBreadCrumb = () => {
  const { pageId } = useParams()
  const { data, isLoading } = useQuery([BREAD_CRUMB, pageId ?? ''], () => getBreadCrumb(pageId), {
    enabled: !!pageId
  })
  return {
    breadCrumb: data?.data,
    pageId,
    isLoading
  }
}
