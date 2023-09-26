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

function getCreateFormComponent({ blockType }: Props) {
  switch (blockType) {
    case 'text':
      return <TextBlockForm />
    case 'image':
      return <ImageBlockForm />
    case 'link':
      return <LinkBlockForm />
    case 'embed':
      return <h1>Embed block form example</h1>
    case 'video':
      return <VideoBlockForm />
    case 'googleMap':
      return <h1>GoogleMap block form example</h1>
    case 'page':
      return (
          <PageBlockForm />
      )
    case 'template':
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
