// import { type BlockBase } from './space'
// export type Spaces = {
//   [key: string]: Space
// }

export interface Space {
  spaceId: string
  profileImage: string
  title: string
  description: string
  previlige: {
    edit: boolean
    delete: boolean
  }
  blocks: Array<BlockWith<BlockType>>
}

export type BlockType = 'text' | 'image' | 'link' | 'page' | 'embed' | 'video' | 'googleMap' | 'template' | 'base'

export type BlockBase<T extends BlockType> = {
  blockId: string
  type: T
  y: number
  x: number
  h: number
  w: number
  visible: boolean
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

export interface TextBlock extends BlockBase<'text'> {
  alt: string
  src: string
}

export interface ImageBlock extends BlockBase<'image'> {
  src: string
  alt: string
}

export interface LinkBlock extends BlockBase<'link'> {
  url: string
  text: string
}
export interface PageBlock extends BlockBase<'page'> {
  text: string
  url: string
}
export interface EmbedGoogleMapBlock extends BlockBase<'googleMap'> {
  src: string
  caption: string
}

export interface EmbedBlock extends BlockBase<'embed'> {
  src: string
  caption: string
}
export interface VideoBlock extends BlockBase<'video'> {
  src: string
  caption: string
}

export interface TemplateBlock extends BlockBase<'template'> {
  templateId: string
  title: string
  description: string
  previewURL: string
  iconUrl: string
  url: string
}

export type BlockWith<T> = //
  T extends 'text'
    ? TextBlock
    : T extends 'image'
    ? ImageBlock
    : T extends 'link'
    ? LinkBlock
    : T extends 'page'
    ? PageBlock
    : T extends 'embed'
    ? EmbedBlock
    : T extends 'video'
    ? VideoBlock
    : T extends 'googleMap'
    ? EmbedGoogleMapBlock
    : T extends 'template'
    ? TemplateBlock
    : never
