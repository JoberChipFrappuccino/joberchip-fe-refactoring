export type BlockType = TText | TImage | TLink | TPage | TVideo | TMap | TTemplate | TBlock

export interface BlockBase<T extends BlockType> {
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
export interface TextBlock extends BlockBase<TText> {
  src: string
}

export interface ImageBlock extends BlockBase<TImage> {
  src: string
  title: string
}

export interface LinkBlock extends BlockBase<TLink> {
  src: string
  title: string
  description: string
}
export interface PageBlock extends BlockBase<TPage> {
  title: string
  description: string
  location: string
  url: string
}
export interface EmbedGoogleMapBlock extends BlockBase<TMap> {
  src: string | undefined
  blockId?: number
  address: string
  title: string
  latitude: string
  longitude: string
  x: number
  y: number
  height: number
  width: number
}
export interface VideoBlock extends BlockBase<TVideo> {
  src: string
  caption: string
}
export interface TemplateBlock extends BlockBase<TTemplate> {
  templateId: string
  title: string
  description: string
  previewURL: string
  iconUrl: string
  url: string
}

export type BlockWith<T> = //
  T extends TText
    ? TextBlock
    : T extends TImage
    ? ImageBlock
    : T extends TLink
    ? LinkBlock
    : T extends TPage
    ? PageBlock
    : T extends TVideo
    ? VideoBlock
    : T extends TMap
    ? EmbedGoogleMapBlock
    : T extends TTemplate
    ? TemplateBlock
    : never

export interface SpaceMeta {
  spaceId: string
  mainPageId: string
  mainPageTitle: string
  participationType: ParticipationType
}
export type SpaceList = SpaceMeta[]

export type BlockItem = BlockWith<BlockType>
export interface SharePage {
  profileImageLink: string
  title: string
  description: string
  privilege: PrivilegeType
  children: BlockItem[]
  visible?: boolean
}
