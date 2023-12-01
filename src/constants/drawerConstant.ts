import { type BlockType } from '@/models/space'

export interface DrawerConstant {
  KR: Record<BlockType, string>
}
export const BLOCK_TO: DrawerConstant = {
  KR: {
    TEMPLATE: '템플릿',
    PAGE: '페이지',
    TEXT: '텍스트',
    IMAGE: '이미지',
    VIDEO: '비디오',
    MAP: '지도',
    LINK: '링크',
    BLOCK: '블럭'
  }
}
