import { Tree } from 'antd'
import type { DataNode, TreeProps } from 'antd/es/tree'
import React, { useEffect, useState } from 'react'
import { GrDocument } from 'react-icons/gr'
import { IoChevronDownOutline } from 'react-icons/io5'

const defaultData: DataNode[] = [
  {
    key: '1',
    title: '1',
    children: [
      {
        key: '1-2',
        title: '1-2',
        children: [
          {
            key: '1-2-1',
            title: '1-2-1'
          },
          {
            key: '1-2-2',
            title: '1-2-2',
            children: [
              {
                key: '1-2-2-1',
                title: '1-2-2-1'
              }
            ]
          }
        ]
      },
      {
        key: '1-1',
        title: '1-1',
        children: [
          {
            key: '1-1-1',
            title: '1-1-1'
          }
        ]
      }
    ]
  }
]

interface Props {
  onSelectTreeNode?: () => void
}

export default function TreeLayout({ onSelectTreeNode }: Props) {
  const [gData, setGData] = useState(defaultData)
  const [expandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0'])
  const onDrop: TreeProps['onDrop'] = (info) => {
    const droppedPosition = info.dropPosition
    if (droppedPosition === -1) {
      alert('안됨')
      return
    }
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          callback(data[i], i, data)
          return
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback)
        }
      }
    }
    const data = [...gData]

    // Find dragObject
    let dragObj: DataNode
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children ?? []
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj)
      })
    } else if (
      (info.node.props.children ?? []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children ?? []
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj)
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      })
    } else {
      let ar: DataNode[] = []
      let i: number
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!)
      } else {
        ar.splice(i! + 1, 0, dragObj!)
      }
    }
    setGData(data)
  }

  useEffect(() => {}, [gData])

  return (
    <Tree
      className="draggable-tree"
      defaultExpandedKeys={expandedKeys}
      draggable
      blockNode
      switcherIcon={<IoChevronDownOutline />}
      // onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={gData}
      defaultExpandAll
      titleRender={(nodeData: DataNode) => (
        <>
          <GrDocument /> {nodeData.title}
        </>
      )}
      onSelect={onSelectTreeNode}
    />
  )
}
