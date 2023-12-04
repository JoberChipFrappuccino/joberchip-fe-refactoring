import type { EventDataNode } from 'antd/es/tree'
import type { Key } from 'react'
import { IoChevronDownOutline } from '@react-icons/all-files/io5/IoChevronDownOutline'
import { Tree } from 'antd'
import { useTree } from '@/hooks/tree'
import type { ITree } from '@/hooks/tree'

export type TreeInfo = {
  event: 'select'
  selected: boolean
  selectedNodes: ITree[]
  node: EventDataNode<ITree>
  nativeEvent: MouseEvent
}

interface TreeLayoutProps {
  spaceId: string
  onSelectTreeNode: (key: Key[], info: TreeInfo) => void
}
export default function TreeLayout({ onSelectTreeNode, spaceId }: TreeLayoutProps) {
  const { data: treeData } = useTree(spaceId)

  if (!treeData) return null

  return (
    <Tree
      className="draggable-tree"
      draggable={false}
      blockNode
      switcherIcon={<IoChevronDownOutline />}
      treeData={[addKey(treeData)]}
      onSelect={(key, info) => {
        onSelectTreeNode(key, info)
      }}
    />
  )
}

function addKey(treeData: ITree) {
  treeData.key = treeData.pageId
  treeData.children = treeData.children?.map((item) => {
    return addKey(item)
  })
  return treeData
}
