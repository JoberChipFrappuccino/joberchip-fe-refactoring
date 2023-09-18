import { EmbedBlock } from '@/components/Blocks/EmbedBlock'
import { GoogleMapBlock } from '@/components/Blocks/GoogleMapBlock'
import { ImageBlock } from '@/components/Blocks/ImageBlock'
import { LinkBlock } from '@/components/Blocks/LinkBlock'
import { PageBlock } from '@/components/Blocks/PageBlock'
import { TextBlock } from '@/components/Blocks/TextBlock'
import { VideoBlock } from '@/components/Blocks/VideoBlock'
import type { BlockBase, BlockType, BlockWith } from '@/models/space'

type Props = {
  type: BlockType
  block: BlockBase
  mode: SpaceMode
}

export function SwitchViewerBlock({ type, block, mode }: Props) {
  switch (type) {
    case 'text':
      return <TextBlock mode={mode} block={block as BlockWith<'text'>} />
    case 'image':
      return <ImageBlock mode={mode} block={block as BlockWith<'image'>} />
    case 'link':
      return <LinkBlock mode={mode} block={block as BlockWith<'link'>} />
    case 'page':
      return <PageBlock mode={mode} block={block as BlockWith<'page'>} />
    case 'embed':
      return <EmbedBlock mode={mode} block={block as BlockWith<'embed'>} />
    case 'video':
      return <VideoBlock mode={mode} block={block as BlockWith<'video'>} />
    case 'googleMap':
      return <GoogleMapBlock mode={mode} block={block as BlockWith<'googleMap'>} />
  }
  return null
}
