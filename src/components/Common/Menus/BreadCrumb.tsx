import { useQuery } from '@tanstack/react-query'
import { Breadcrumb } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { fetchBreadCrumb, type BreadCrumbItems } from '@/apis/space'
import { BREAD_CRUMB } from '@/constants/queryKeyConstant'
import { toast } from '@/utils/toast'

export function BreadCrumbBox() {
  const { pageId } = useParams<{ pageId: string }>()
  const { data } = useQuery([BREAD_CRUMB, pageId ?? ''], () => fetchBreadCrumb(pageId), {
    enabled: !!pageId
  })

  if (data?.status === 'failure') toast(data?.message, data?.status, { autoClose: 500 })

  return data?.data && pageId ? (
    <Breadcrumb
      style={{
        paddingLeft: '1rem'
      }}
      separator=">"
      items={convertResponseToAntdBreadCrumb(pageId ?? '', data?.data)}
    />
  ) : (
    <div>loading...</div>
  )
}

function convertResponseToAntdBreadCrumb(pageId: string, res: BreadCrumbItems): BreadCrumbItems[] {
  const items = []
  items.push({
    pageId: res.pageId,
    title: res.pageId === pageId ? res.title : <Link to={`/space/${res.pageId}`}>{res.title}</Link>
  })
  let children = res.children ? res.children[0] : null
  while (children?.pageId) {
    items.push({
      pageId: children.pageId,
      title:
        children.pageId === pageId ? children.title : <Link to={`/space/${children.pageId}`}>{children.title}</Link>
    })
    children = children.children ? children.children[0] : null
  }
  return items
}
