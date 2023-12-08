import { useParams } from 'react-router-dom'
import { type BreadCrumbItems, getBreadCrumb } from '@/apis/page'
import { SEO } from '@/constants'
import { BREAD_CRUMB } from '@/constants/querykey'
import useSuspenseQuery from './queries/useSuspenseQuery'
import useServerSideProps from './serverSideProps'

export const useBreadCrumb = () => {
  const { isServerSide } = useServerSideProps(SEO)
  const { pageId } = useParams()
  const { data, isLoading } = useSuspenseQuery([BREAD_CRUMB, pageId ?? ''], () => getBreadCrumb(pageId), {
    enabled: !!pageId && !isServerSide
  })
  return {
    breadCrumb: data?.data as BreadCrumbItems,
    pageId,
    isLoading
  }
}
