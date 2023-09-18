import { EmbedBlock } from '@/components/Blocks/EmbedBlock'
import { GoogleMapBlock } from '@/components/Blocks/GoogleMapBlock'
import { ImageBlock } from '@/components/Blocks/ImageBlock'
import { LinkBlock } from '@/components/Blocks/LinkBlock'
import { PageBlock } from '@/components/Blocks/PageBlock'
import { TextBlock } from '@/components/Blocks/TextBlock'
import { VideoBlock } from '@/components/Blocks/VideoBlock'
import type { BlockType, BlockWith } from '@/models/space'

interface Props<T extends BlockType> {
  block: BlockWith<T>
  mode: SpaceMode
}
function getViewerComponent<T extends BlockType>({ block, mode }: Props<T>) {
  switch (block.type) {
    case 'text':
      return <TextBlock mode={mode} block={block} />
    case 'image':
      return <ImageBlock mode={mode} block={block} />
    case 'link':
      return <LinkBlock mode={mode} block={block} />
    case 'page':
      return <PageBlock mode={mode} block={block} />
    case 'embed':
      return <EmbedBlock mode={mode} block={block} />
    case 'video':
      return <VideoBlock mode={mode} block={block} />
    case 'googleMap':
      return <GoogleMapBlock mode={mode} block={block} />
    default: {
      if (process.env.NODE_ENV === 'development') {
        throw new Error('Please add a component')
      }
      return null
    }
  }
}

export function ViewerBox<T extends BlockType>({ block, mode }: Props<T>) {
  return getViewerComponent({ block, mode })
}
