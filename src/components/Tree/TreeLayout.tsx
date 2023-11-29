import type { DataNode } from 'antd/es/tree'
import { IoChevronDownOutline } from '@react-icons/all-files/io5/IoChevronDownOutline'
import { useQuery } from '@tanstack/react-query'
import { Tree } from 'antd'
import { useEffect, useState } from 'react'
import { fetchBreadCrumb } from '@/api/space'
import { DEFAULT_CACHE_TIME } from '@/constants'
import { BREAD_CRUMB } from '@/constants/queryKeyConstant'
import { useSharePageStore } from '@/store/sharePage'
import { useTree } from '@/hooks/tree'

interface Props {
  onSelectTreeNode?: () => void
  drawerMode?: boolean
}
export default function TreeLayout({ onSelectTreeNode }: Props) {
  const { sharePage } = useSharePageStore()
  const { data: breadCrumbData } = useQuery(
    [BREAD_CRUMB, sharePage.pageId ?? ''],
    () => fetchBreadCrumb(sharePage.pageId),
    {
      staleTime: DEFAULT_CACHE_TIME,
      enabled: !!sharePage.pageId
    }
  )

  const spaceId = breadCrumbData?.data?.parentId
  const defaultData: DataNode[] = []
  const { data: treeData } = useTree(spaceId ?? '')
  const [gData, setGData] = useState(defaultData)

  useEffect(() => {
    if (treeData) {
      setGData([treeData] as unknown as DataNode[])
    }
  }, [treeData, spaceId])

  return (
    <Tree
      className="draggable-tree"
      draggable={false}
      blockNode
      switcherIcon={<IoChevronDownOutline />}
      treeData={gData}
      defaultExpandAll
      onSelect={onSelectTreeNode}
    />
  )
}
