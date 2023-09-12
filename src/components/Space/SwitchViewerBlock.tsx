import { EmbedBlock } from '@/components/Blocks/EmbedBlock'
import { GoogleMapBlock } from '@/components/Blocks/GoogleMapBlock'
import { ImageBlock } from '@/components/Blocks/ImageBlock'
import { LinkBlock } from '@/components/Blocks/LinkBlock'
import { PageBlock } from '@/components/Blocks/PageBlock'
import { TextBlock } from '@/components/Blocks/TextBlock'
import { VideoBlock } from '@/components/Blocks/VideoBlock'
import ViewerBlockBase from '@/components/Blocks/ViewerBlockBase'

import type { BlockBase, BlockType, BlockWith } from '@/models/space'

type Props = {
  type: BlockType
  block: BlockBase
  mode: SpaceMode
  isActive: boolean
}

export function SwitchViewerBlock({ type, block, mode, isActive }: Props) {
  let blockComponent = null
  switch (type) {
    case 'text':
      blockComponent = <TextBlock mode={mode} block={block as BlockWith<'text'>} />
      break
    case 'image':
      blockComponent = <ImageBlock mode={mode} block={block as BlockWith<'image'>} />
      break
    case 'link':
      blockComponent = <LinkBlock mode={mode} block={block as BlockWith<'link'>} />
      break
    case 'page':
      blockComponent = <PageBlock mode={mode} block={block as BlockWith<'page'>} />
      break
    case 'embed':
      blockComponent = <EmbedBlock mode={mode} block={block as BlockWith<'embed'>} />
      break
    case 'video':
      blockComponent = <VideoBlock mode={mode} block={block as BlockWith<'video'>} />
      break
    case 'googleMap':
      blockComponent = <GoogleMapBlock mode={mode} block={block as BlockWith<'googleMap'>} />
  }

  return (
    <ViewerBlockBase isActive={isActive} block={block}>
      {blockComponent}
    </ViewerBlockBase>
  )
}
