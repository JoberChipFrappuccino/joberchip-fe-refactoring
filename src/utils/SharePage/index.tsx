import { type Layout } from 'react-grid-layout'
import { type FetchLayoutBlocksParam } from '@/apis/space'
import { type BlockType, type SharePage } from '@/models/space'

interface BlockItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  type?: BlockType
  MaxH?: number
  MaxW?: number
  isDraggable?: boolean
  isResizable?: boolean
}

export function sortLayout(layout: BlockItem[]): Layout[] {
  return layout.sort((a, b) => {
    if (a.y === b.y) {
      return a.x > b.x ? 1 : -1
    }
    return a.y > b.y ? 1 : -1
  })
}

interface GetLatoutByMode {
  breakpoints: 'lg'
  layouts: { lg: Layout[] }
}
export function getLayoutByMode(blocks: SharePage['children'], mode: SharePageMode): GetLatoutByMode {
  const layout = blocks.map((block) => {
    const { objectId, ...rest } = block
    return {
      objectId,
      i: objectId,
      isDraggable: mode !== 'VIEW',
      isResizable: mode !== 'VIEW',
      static: false, // ?? : 고정 여부 확인이 필요합니다.
      minW: 1,
      maxW: 4,
      minH: 1,
      maxH: 2,
      ...rest
    }
  })
  return {
    breakpoints: 'lg',
    layouts: { lg: layout }
  }
}

export function calculateRatio(width: number, cols: number, radio: number) {
  return (width * radio) / cols
}

/**
 * @description 레이아웃 변경시 블록의 위치를 업데이트합니다.
 * @description 참조값만 바꾸기 때문에 리렌더링이 발생하지 않습니다.
 */
export function updateBlockPosition(changedLayout: Layout[], blocks: SharePage['children']) {
  changedLayout.forEach((item) => {
    const block = blocks.find((block) => block.objectId === item.i)
    if (!block) return block
    block.x = item.x
    block.y = item.y
    block.w = item.w
    block.h = item.h
    return block
  })
  return blocks
}

export function convertLayoutToParam(children: SharePage['children'], layout: Layout[]): FetchLayoutBlocksParam[] {
  return layout.map((item) => {
    const type = children.find((child) => child.objectId === item.i)?.type
    if (typeof type === 'undefined') {
      throw new Error('type is undefined')
    }
    const { i, x, y, w, h } = item
    return {
      blockId: i,
      blockType: type,
      x,
      y,
      w,
      h
    }
  })
}
