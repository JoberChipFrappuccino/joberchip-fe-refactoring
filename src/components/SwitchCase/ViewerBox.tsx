import { EmbedBlock } from '@/components/Blocks/EmbedBlock'
import { GoogleMapBlock } from '@/components/Blocks/GoogleMapBlock'
import { ImageBlock } from '@/components/Blocks/ImageBlock'
import { LinkBlock } from '@/components/Blocks/LinkBlock'
import { PageBlock } from '@/components/Blocks/PageBlock'
import { TemplateBlock } from '@/components/Blocks/TemplateBlock'
import { TextBlock } from '@/components/Blocks/TextBlock'
import { VideoBlock } from '@/components/Blocks/VideoBlock'
import { EMBED, IMAGE, LINK, MAP, PAGE, TEMPLATE, TEXT, VIDEO } from '@/constants/blockTypeConstant'
import type { BlockType, BlockWith } from '@/models/space'

export interface BlockBaseWithBlockProps<T extends BlockType> {
  block: BlockWith<T>
  mode: SpaceMode
}

function getViewerComponent<T extends BlockType>({ block, mode }: BlockBaseWithBlockProps<T>) {
  switch (block.type) {
    case TEXT:
      return <TextBlock mode={mode} block={block} />
    case IMAGE:
      return <ImageBlock mode={mode} block={block} />
    case LINK:
      return <LinkBlock mode={mode} block={block} />
    case PAGE:
      return <PageBlock mode={mode} block={block} />
    case EMBED:
      return <EmbedBlock mode={mode} block={block} />
    case VIDEO:
      return <VideoBlock mode={mode} block={block} />
    case MAP:
      return <GoogleMapBlock mode={mode} block={block} />
    case TEMPLATE:
      return <TemplateBlock mode={mode} block={block} />
    default: {
      if (process.env.NODE_ENV === 'development') {
        throw new Error('Please add a component')
      }
      return null
    }
  }
}

export function ViewerBox<T extends BlockType>({ block, mode }: BlockBaseWithBlockProps<T>) {
  return getViewerComponent({ block, mode })
}
