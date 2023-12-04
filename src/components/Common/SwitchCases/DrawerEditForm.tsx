import { EditImageBlock } from '@/components/SharePage/Forms/ImageBlockForm/EditImageBlock'
import { EditLinkBlock } from '@/components/SharePage/Forms/LinkBlockForm/EditLinkBlock'
import { EditMapBlock } from '@/components/SharePage/Forms/MapBlockForm/EditMapBlock'
import { PageBlockForm } from '@/components/SharePage/Forms/PageBlockForm'
import { EditTemplateBlockForm } from '@/components/SharePage/Forms/TemplateBlockForm/EditTemplateBlockForm'
import EditTextBlock from '@/components/SharePage/Forms/TextBlockForm/EditTextBlock'
import EditVideoBlock from '@/components/SharePage/Forms/VideoBlockForm/EditVideoBlock'
import { IMAGE, LINK, MAP, PAGE, TEMPLATE, TEXT, VIDEO } from '@/constants/block'
import { type BlockType } from '@/models/space'
import { type BlockBaseWithBlockProps } from './ViewerBox'

export interface BlockBaseWithBlockFormProps<T extends BlockType> extends Partial<BlockBaseWithBlockProps<T>> {}

function getEditFormComponent<T extends BlockType>({ block }: BlockBaseWithBlockFormProps<T>) {
  switch (block?.type) {
    case TEXT:
      return <EditTextBlock block={block} />
    case IMAGE:
      return <EditImageBlock block={block} />
    case LINK:
      return <EditLinkBlock block={block} />
    case VIDEO:
      return <EditVideoBlock block={block} />
    case MAP:
      return <EditMapBlock block={block} />
    case PAGE:
      return <PageBlockForm block={block} />
    case TEMPLATE:
      return <EditTemplateBlockForm block={block} />
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
