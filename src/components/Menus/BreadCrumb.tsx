import { fetchBreadCrumb, type BreadCrumbItems } from '@/api/space'
import { to } from '@/utils/api'
import { toast } from '@/utils/toast'
import { Breadcrumb } from 'antd'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function BreadCrumbBox() {
  const { pageId } = useParams<{ pageId: string }>()

  const [items, setItems] = useState<BreadCrumbItems[]>([])

  useEffect(() => {
    if (!pageId) {
      process.env.NODE_ENV === 'development' && console.error('pageId가 없습니다.')
      return
    }
    to(fetchBreadCrumb(pageId)).then((res) => {
      if (!res.data || res.status === 'failure') {
        toast(res.message, res.status)
        return
      }
      setItems(convertResponseToAntdBreadCrumb(pageId, res.data))
    })
  }, [pageId])

  return <Breadcrumb separator=">" items={items} />
}

function convertResponseToAntdBreadCrumb(pageId: string, res: BreadCrumbItems): BreadCrumbItems[] {
  const items = []
  items.push({
    pageId: res.pageId,
    title: res.pageId === pageId ? res.title : <Link to={`/temp/space/${res.pageId}`}>{res.title}</Link>
  })
  let children = res.children ? res.children[0] : null
  while (children?.pageId) {
    items.push({
      pageId: children.pageId,
      title:
        children.pageId === pageId ? (
          children.title
        ) : (
          <Link to={`/temp/space/${children.pageId}`}>{children.title}</Link>
        )
    })
    children = children.children ? children.children[0] : null
  }
  return items
}
