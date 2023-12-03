import { GoogleMapBlockForm } from '@/components/SharePage/Forms/GoogleMapBlockForm/GoogleMapBlockForm'
import { ImageBlockForm } from '@/components/SharePage/Forms/ImageBlockForm/ImageBlockForm'
import { LinkBlockForm } from '@/components/SharePage/Forms/LinkBlockForm'
import { PageBlockForm } from '@/components/SharePage/Forms/PageBlockForm'
import { TemplateBlockEditForm } from '@/components/SharePage/Forms/TemplateBlockEditForm'
import { TextBlockForm } from '@/components/SharePage/Forms/TextBlockForm'
import { VideoBlockForm } from '@/components/SharePage/Forms/VideoBlockForm'
import { IMAGE, LINK, MAP, PAGE, TEMPLATE, TEXT, VIDEO } from '@/constants/blockTypeConstant'
import { type BlockType } from '@/models/space'
import { type BlockBaseWithBlockProps } from './ViewerBox'

export interface BlockBaseWithBlockFormProps<T extends BlockType> extends Partial<BlockBaseWithBlockProps<T>> {}

function getEditFormComponent<T extends BlockType>({ block }: BlockBaseWithBlockFormProps<T>) {
  switch (block?.type) {
    case TEXT:
      return <TextBlockForm block={block} />
    case IMAGE:
      return <ImageBlockForm block={block} />
    case LINK:
      return <LinkBlockForm block={block} />
    case VIDEO:
      return <VideoBlockForm block={block} />
    case MAP:
      return <GoogleMapBlockForm block={block} />
    case PAGE:
      return <PageBlockForm block={block} />
    case TEMPLATE:
      return <TemplateBlockEditForm block={block} />
    default: {
      if (process.env.NODE_ENV === 'development') {
        throw new Error('Please add a component')
      }
      return null
    }
  }
}

export function DrawerEditForm<T extends BlockType>({ block, mode }: BlockBaseWithBlockFormProps<T>) {
  return getEditFormComponent({ block, mode })
}
