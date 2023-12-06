import { type Layout } from 'react-grid-layout'

import { v4 } from 'uuid'
import {
  editGoogleMapBlockAPI,
  editImageBlockAPI,
  editLinkBlockAPI,
  editTextBlockAPI,
  editVideoBlockAPI
} from '@/apis/blocks'
import { type FetchLayoutBlocksParam, editPageBlockAPI } from '@/apis/page'
import { IMAGE, LINK, MAP, PAGE, TEMPLATE, TEXT, VIDEO } from '@/constants/block'
import { type BlockBase, type BlockType, type EmbedGoogleMapBlock } from '@/models/block'
import { type SharePage } from '@/models/space'
import { type Center } from '@/store/map'
import { toast } from '../toast'

export function sortLayout(layout: BlockItem[]): Layout[] {
  return layout.sort((a, b) => {
    if (a.y === b.y) {
      return a.x > b.x ? 1 : -1
    }
    return a.y > b.y ? 1 : -1
  })
}
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

/**
 * @description 블록의 모드를 기반으로 옵션을 설정합니다.
 * @todo 현제 min, max값이 매직넘버로 되어 있지만, 추후 블럭의 타입에 따라서 min, max 제한이 필요합니다.
 */
export function getLayoutByMode(blocks: SharePage['children'], mode: SharePageMode): GetLatoutByMode {
  const layout = blocks.map((block) => {
    const { objectId, ...rest } = block
    return {
      objectId,
      i: objectId,
      isDraggable: mode !== 'VIEW',
      isResizable: mode !== 'VIEW',
      static: false,
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
interface GetLatoutByMode {
  breakpoints: 'lg'
  layouts: { lg: Layout[] }
}

/**
 * @description 가장 아래에 있는 블럭의 Y값을 반환합니다.
 */
export function getNextYOfLastBlock(blocks: SharePage['children']) {
  let lastOfY = 0
  for (let i = 0; i < blocks.length; i++) {
    if (lastOfY < blocks[i].y + blocks[i].h) lastOfY = blocks[i].y + blocks[i].h
  }
  return lastOfY + 1
}

/**
 * @description 스크린 사이즈에 따라서 블록의 크기를 계산합니다.
 */
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

/**
 * @description API 호출을 위한 파라미터로 레이아웃을 변환시킵니다.
 */
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

/**
 * @description 직렬화된 지도 정보에서 위도와 경도를 추출합니다.
 */
export function getCenter(block?: EmbedGoogleMapBlock) {
  if (!block?.src) {
    return {
      latitude: 37.5642135,
      longitude: 127.0016985
    }
  }
  const centerNoAddress: Omit<Center, 'address'> = JSON.parse(block.src)
  return centerNoAddress
}

/**
 * @description API 호출을 위한 파라미터로 변환합니다.
 */
export function needToConvertAbbr(center: Center) {
  return {
    lat: center.latitude,
    lng: center.longitude
  }
}

/**
 * @description dataURL을 blob으로 변환합니다.
 */
export function dataURIToBlob(dataURI: string) {
  const splitDataURI = dataURI.split(',')
  const byteString = splitDataURI[0].includes('base64') ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}

export function editBlockAPIByType(pageId: string | undefined, block: BlockBase<BlockType>) {
  if (!pageId) return toast("잘못된 접근입니다. 'pageId'가 존재하지 않습니다.", 'failure')
  const { objectId, visible } = block
  switch (block.type) {
    case TEXT:
      return editTextBlockAPI(pageId, { objectId, visible: !visible })
    case IMAGE:
      return editImageBlockAPI(pageId, { objectId, visible: !visible })
    case LINK:
      return editLinkBlockAPI(pageId, { objectId, visible: !visible })
    case PAGE:
      return editPageBlockAPI(pageId, { visible: !visible })
    case VIDEO:
      return editVideoBlockAPI(pageId, { objectId, visible: !visible })
    case MAP:
      return editGoogleMapBlockAPI(pageId, { objectId, visible: !visible })
    case TEMPLATE:
      return toast('템플릿 공개 설정은 아직 지원하지 않습니다.', 'success')
    default:
      return toast('잘못된 입력입니다.', 'failure')
  }
}

/**
 * @description 유니크한 키를 가진 divider를 반환합니다.
 */
export function getUniqueDivier() {
  return {
    key: v4(),
    type: 'divider'
  }
}
