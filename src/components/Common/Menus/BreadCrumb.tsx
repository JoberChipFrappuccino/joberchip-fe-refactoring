import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import { type BreadCrumbItems } from '@/apis/page'
import { useBreadCrumb } from '@/hooks/useBreadCrumb'

export function BreadCrumbBox() {
  const { breadCrumb, pageId } = useBreadCrumb()

  if (!breadCrumb) return null

  return <Breadcrumb style={{ paddingLeft: '1rem' }} separator=">" items={convertItem(pageId, breadCrumb, [])} />
}

function convertItem(pageBlockId: string | undefined, breadCrumb: BreadCrumbItems, breadCurmbs: BreadCrumbItems[]) {
  const { pageId, title, children } = breadCrumb
  breadCurmbs.push({
    pageId,
    title: pageId === pageBlockId ? title : <Link to={`/space/${pageId}`}>{title}</Link>
  })
  if (!children || children.length === 0) return breadCurmbs
  return convertItem(pageBlockId, children[0], breadCurmbs)
}
