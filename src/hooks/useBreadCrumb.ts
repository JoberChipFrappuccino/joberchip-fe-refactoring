import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { fetchBreadCrumb } from '@/apis/space'
import { BREAD_CRUMB } from '@/constants/querykey'

export const useBreadCrumb = () => {
  const { pageId } = useParams()
  const { data } = useQuery([BREAD_CRUMB, pageId ?? ''], () => fetchBreadCrumb(pageId), {
    enabled: !!pageId
  })
  return {
    breadCrumb: data?.data
  }
}
