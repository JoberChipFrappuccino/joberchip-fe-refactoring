import ImageBlockForm from '@/components/Forms/ImageBlockForm'
import LinkBlockForm from '@/components/Forms/LinkBlockForm'
import PageBlockForm from '@/components/Forms/PageBlockForm'
import TextBlockForm from '@/components/Forms/TextBlockForm'
import VideoBlockForm from '@/components/Forms/VideoBlockForm'
import { type BlockType } from '@/models/space'
import { TemplateBlockCreateForm } from '../Forms/TemplateBlockCreateForm'

interface Props {
  blockType: BlockType
}

const PropsData = {
  alt: undefined,
  src: undefined,
  text: undefined,
  url: undefined,
  title: undefined,
  description: undefined,
  location: undefined
}
function getCreateFormComponent({ blockType }: Props) {
  switch (blockType) {
    case 'TEXT':
      return <TextBlockForm />
    case 'IMAGE':
      return <ImageBlockForm />
    case 'LINK':
      return <LinkBlockForm />
    case 'EMBED':
      return <h1>Embed block form example</h1>
    case 'VIDEO':
      return <VideoBlockForm />
    case 'MAP':
      return <h1>GoogleMap block form example</h1>
    case 'PAGE':
      return <PageBlockForm block={PropsData} />
    case 'TEMPLATE':
      return <TemplateBlockCreateForm />
    default: {
      if (process.env.NODE_ENV === 'development') {
        throw new Error('Please add a component')
      }
      return null
    }
  }
}

export function DrawerCreateForm({ blockType }: Props) {
  return getCreateFormComponent({ blockType })
}
