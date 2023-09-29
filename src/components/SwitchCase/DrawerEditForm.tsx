import ImageBlockForm from '@/components/Forms/ImageBlockForm'
import LinkBlockForm from '@/components/Forms/LinkBlockForm'
import PageBlockForm from '@/components/Forms/PageBlockForm'
import TextBlockForm from '@/components/Forms/TextBlockForm'
import VideoBlockForm from '@/components/Forms/VideoBlockForm'
import { EMBED, IMAGE, LINK, MAP, PAGE, TEMPLATE, TEXT, VIDEO } from '@/constants/blockTypeConstant'
import { type BlockType, type BlockWith } from '@/models/space'
import { type DrawerMode } from '@/store/blockAction'
import { TemplateBlockEditForm } from '../Forms/TemplateBlockEditForm'

interface Props<T extends BlockType> {
  block: BlockWith<T>
  mode: DrawerMode
}
function getEditFormComponent<T extends BlockType>({ block, mode }: Props<T>) {
  switch (block.type) {
    case TEXT:
      return <TextBlockForm block={block} />
    case IMAGE:
      return <ImageBlockForm block={block} />
    case LINK:
      return <LinkBlockForm block={block} />
    case EMBED:
      return <h1>Embed block form example</h1>
    case VIDEO:
      return <VideoBlockForm block={block} />
    case MAP:
      return <h1>GoogleMap block form example</h1>
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

export function DrawerEditForm<T extends BlockType>({ block, mode }: Props<T>) {
  return getEditFormComponent({ block, mode })
}
