import { type BlockItem, type BlockType } from './block'

export interface SpaceMeta {
  spaceId: string
  mainPageId: string
  mainPageTitle: string
  participationType: ParticipationType
}
export type SpaceList = SpaceMeta[]

export interface SharePage {
  profileImageLink: string
  title: string
  description: string
  privilege: PrivilegeType
  children: BlockItem[]
  visible?: boolean
}

export interface DrawerI18N {
  KR: Record<BlockType, string>
}
