import { fetchBreadCrumb } from '@/api/space'
import { DEFAULT_CACHE_TIME } from '@/constants'
import { BREAD_CRUMB } from '@/constants/queryKeyConstant'
import { useTree } from '@/hooks/tree'
import { useSharePageStore } from '@/store/sharePage'
import { useQuery } from '@tanstack/react-query'
import { Tree } from 'antd'
import type { DataNode } from 'antd/es/tree'
import { useEffect, useState } from 'react'
import { IoChevronDownOutline } from 'react-icons/io5'

interface Props {
  onSelectTreeNode?: () => void
  drawerMode?: boolean
}

export default function TreeLayout({ onSelectTreeNode, drawerMode = true }: Props) {
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
      setGData([treeData]) // 또는 treeData 전체를 사용할 수 있음
    }
  }, [treeData, spaceId])

  // const onDrop: TreeProps['onDrop'] = (info) => {
  //   const dropKey = info.node.key
  //   const dragKey = info.dragNode.key
  //   const dropPos = info.node.pos.split('-')
  //   const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

  //   const loop = (
  //     data: TreeModel[],
  //     key: React.Key,
  //     callback: (node: TreeModel, i: number, data: TreeModel[]) => void
  //   ) => {
  //     for (let i = 0; i < data.length; i++) {
  //       if (data[i].pageId === key) {
  //         return callback(data[i], i, data)
  //       }
  //       if (data[i].children) {
  //         loop(data[i].children!, key, callback)
  //       }
  //     }
  //   }
  //   const data = [...gData]

  //   // Find dragObject
  //   let dragObj: TreeModel
  //   loop(data, dragKey, (item, index, arr) => {
  //     arr.splice(index, 1)
  //     dragObj = item
  //   })

  //   if (!info.dropToGap) {
  //     // Drop on the content
  //     loop(data, dropKey, (item) => {
  //       item.children = item.children || []
  //       // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
  //       item.children.unshift(dragObj)
  //     })
  //   } else if (
  //     ((info.node as any).props.children || []).length > 0 && // Has children
  //     (info.node as any).props.expanded && // Is expanded
  //     dropPosition === 1 // On the bottom gap
  //   ) {
  //     loop(data, dropKey, (item) => {
  //       item.children = item.children || []
  //       // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
  //       item.children.unshift(dragObj)
  //       // in previous version, we use item.children.push(dragObj) to insert the
  //       // item to the tail of the children
  //     })
  //   } else {
  //     let ar: TreeModel[] = []
  //     let i: number
  //     loop(data, dropKey, (_item, index, arr) => {
  //       ar = arr
  //       i = index
  //     })
  //     if (dropPosition === -1) {
  //       ar.splice(i!, 0, dragObj!)
  //     } else {
  //       ar.splice(i! + 1, 0, dragObj!)
  //     }
  //   }
  //   setGData(data)
  // }

  return (
    <Tree
      className="draggable-tree"
      // defaultExpandedKeys={expandedKeys}
      // draggable={drawerMode}
      draggable={false}
      blockNode
      switcherIcon={<IoChevronDownOutline />}
      // onDrop={onDrop}
      treeData={gData}
      defaultExpandAll
      // titleRender={(nodeData: TreeMode) => (
      //   <>
      //     <GrDocument /> {nodeData.title}
      //   </>
      // )}
      onSelect={onSelectTreeNode}
    />
  )
}
