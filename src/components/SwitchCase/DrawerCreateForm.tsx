import { ImageBlockForm } from '@/components/Forms/ImageBlockForm'
import { LinkBlockForm } from '@/components/Forms/LinkBlockForm'
import { PageBlockForm } from '@/components/Forms/PageBlockForm'
import { TemplateBlockCreateForm } from '@/components/Forms/TemplateBlockCreateForm'
import { TextBlockForm } from '@/components/Forms/TextBlockForm'
import { VideoBlockForm } from '@/components/Forms/VideoBlockForm'
import { EMBED, IMAGE, LINK, MAP, PAGE, TEMPLATE, TEXT, VIDEO } from '@/constants/blockTypeConstant'
import { type BlockType } from '@/models/space'

interface DrawerCreateFormProps {
  blockType: BlockType
}

function getCreateFormComponent({ blockType }: DrawerCreateFormProps) {
  switch (blockType) {
    case TEXT:
      return <TextBlockForm />
    case IMAGE:
      return <ImageBlockForm />
    case LINK:
      return <LinkBlockForm />
    case EMBED:
      return <h1>Embed block form example</h1>
    case VIDEO:
      return <VideoBlockForm />
    case MAP:
      return <h1>GoogleMap block form example</h1>
    case PAGE:
      return <PageBlockForm />
    case TEMPLATE:
      return <TemplateBlockCreateForm />
    default: {
      if (process.env.NODE_ENV === 'development') {
        throw new Error('Please add a component')
      }
      return null
    }
  }
}

export function DrawerCreateForm({ blockType }: DrawerCreateFormProps) {
  return getCreateFormComponent({ blockType })
}
