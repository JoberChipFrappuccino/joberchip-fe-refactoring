// export type Spaces = {
//   [key: string]: Space
// }

export type Space = {
  title: string
  description: string
  blocks: BlockBase[]
}

export type BlockType = 'text' | 'image' | 'link' | 'page' | 'embed' | 'video' | 'googleMap' | 'template'

export type BlockBase = {
  blockId: string
  type: BlockType
  y: number
  x: number
  h: number
  w: number
  i?: string
  maxH?: number
  maxW?: number
  minH?: number
  minW?: number
  isDraggable?: boolean
  isResizable?: boolean
  isBounded?: boolean
  static?: boolean
}

export type TextBlock = {
  text: string
}
export type ImageBlock = {
  src: string
  alt: string
}
export type LinkBlock = {
  url: string
  text: string
}
export type PageBlock = {
  text: string
  url: string
}
export type EmbedGoogleMapBlock = {
  src: string
  caption: string
}

export type EmbedBlock = {
  src: string
  caption: string
}
export type VideoBlock = {
  src: string
  caption: string
}

export type TemplateBlock = {
  templateId: string
  title: string
  description: string
  previewURL: string
}

/**
 * @description conponents/Blocks/* 에 있는 컴포넌트들의 props 타입을 정의합니다.
 * @description components/Space/SwithBlock.tsx에서 BlockWith<type>을 swith해서 사용합니다.
 */
export type BlockWith<T> = T extends 'text'
  ? TextBlock & BlockBase
  : T extends 'image'
  ? ImageBlock & BlockBase
  : T extends 'link'
  ? LinkBlock & BlockBase
  : T extends 'page'
  ? PageBlock & BlockBase
  : T extends 'embed'
  ? EmbedBlock & BlockBase
  : T extends 'video'
  ? VideoBlock & BlockBase
  : T extends 'googleMap'
  ? EmbedGoogleMapBlock & BlockBase
  : T extends 'template'
  ? TemplateBlock & BlockBase
  : never
