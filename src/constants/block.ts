import type { DrawerI18N } from '@/models/space'
import { type Libraries } from '@react-google-maps/api'

export const TEXT: TText = 'TEXT'
export const IMAGE: TImage = 'IMAGE'
export const VIDEO: TVideo = 'VIDEO'
export const AUDIO: TAudio = 'AUDIO'
export const LINK: TLink = 'LINK'
export const MAP: TMap = 'MAP'
export const PAGE: TPage = 'PAGE'
export const TEMPLATE: TTemplate = 'TEMPLATE'
export const BLOCK: TBlock = 'BLOCK'

export const BLOCK_SIZE = {
  TEXT: {
    minWidth: 2,
    maxWidth: 4,
    minHeight: 1,
    maxHeight: 2
  },
  IMAGE: {
    minWidth: 1,
    maxWidth: 4,
    minHeight: 1,
    maxHeight: 2
  },
  VIDEO: {
    minWidth: 1,
    maxWidth: 4,
    minHeight: 1,
    maxHeight: 2
  },
  LINK: {
    minWidth: 2,
    maxWidth: 4,
    minHeight: 1,
    maxHeight: 2
  },
  MAP: {
    minWidth: 1,
    maxWidth: 4,
    minHeight: 1,
    maxHeight: 2
  },
  PAGE: {
    minWidth: 2,
    maxWidth: 4,
    minHeight: 1,
    maxHeight: 2
  },
  TEMPLATE: {
    minWidth: 2,
    maxWidth: 4,
    minHeight: 1,
    maxHeight: 2
  },
  BLOCK: {
    minWidth: 2,
    maxWidth: 4,
    minHeight: 1,
    maxHeight: 2
  }
}

export const BLOCK_TO: DrawerI18N = {
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

export const libraries: Libraries = ['places']
