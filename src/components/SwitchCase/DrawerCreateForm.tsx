import ImageBlockForm from '@/components/Forms/ImageBlockForm'
import LinkBlockForm from '@/components/Forms/LinkBlockForm'
import TextBlockForm from '@/components/Forms/TextBlockForm'
import VideoBlockForm from '@/components/Forms/VideoBlockForm'
import { type BlockType } from '@/models/space'

interface Props {
  blockType: BlockType
}
function getCreateFormComponent({ blockType }: Props) {
  switch (blockType) {
    case 'text':
      return <TextBlockForm />
    case 'image':
      return <ImageBlockForm block={''} />
    case 'link':
      return <LinkBlockForm block={''} />
    case 'embed':
      return <h1>Embed block form example</h1>
    case 'video':
      return <VideoBlockForm block={''} />
    case 'googleMap':
      return <h1>GoogleMap block form example</h1>
    case 'page':
      return <h1>Page block form example</h1>
    case 'template':
      return <h1>Template block form example</h1>
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
