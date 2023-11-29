import { type BlockType } from '@/models/space'

export const BLOCK_TYPE_TO_KOR: Record<BlockType, string> = {
  TEMPLATE: '템플릿',
  PAGE: '페이지',
  TEXT: '텍스트',
  IMAGE: '이미지',
  VIDEO: '비디오',
  MAP: '지도',
  LINK: '링크',
  BASE: '기본'
}
