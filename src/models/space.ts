export interface SharePage {
  pageId: string
  pageProfileImage: string
  title: string
  description: string
  previlige: {
    edit: boolean
    delete: boolean
  }
  children: Array<BlockWith<BlockType>>
}

export type BlockType = TText | TImage | TLink | TPage | TEmbed | TVideo | TMap | TTemplate | 'BASE' // HACK : "BASE"는 임시 코드

export type BlockBase<T extends BlockType> = {
  objectId: string
  type: T
  y: number
  x: number
  height: number
  width: number
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

export interface TextBlock extends BlockBase<'TEXT'> {
  alt: string
  src: string
  text: string
}

export interface ImageBlock extends BlockBase<'IMAGE'> {
  src: string
  alt: string
}

export interface LinkBlock extends BlockBase<'LINK'> {
  url: string
  text: string
}
export interface PageBlock extends BlockBase<'PAGE'> {
  title: string
  description: string
  location: string
  url: string
}
export interface EmbedGoogleMapBlock extends BlockBase<'MAP'> {
  src: string
  caption: string
}

export interface EmbedBlock extends BlockBase<'EMBED'> {
  src: string
  caption: string
}
export interface VideoBlock extends BlockBase<'VIDEO'> {
  src: string
  caption: string
}

export interface TemplateBlock extends BlockBase<'TEMPLATE'> {
  templateId: string
  title: string
  description: string
  previewURL: string
  iconUrl: string
  url: string
}

export type BlockWith<T> = //
  T extends 'TEXT'
    ? TextBlock
    : T extends 'IMAGE'
    ? ImageBlock
    : T extends 'LINK'
    ? LinkBlock
    : T extends 'PAGE'
    ? PageBlock
    : T extends 'EMBED'
    ? EmbedBlock
    : T extends 'VIDEO'
    ? VideoBlock
    : T extends 'MAP'
    ? EmbedGoogleMapBlock
    : T extends 'TEMPLATE'
    ? TemplateBlock
    : never

export interface SpaceList {
  spaceId: string
  mainPageId: string
  participationType: ParticipationType
}
