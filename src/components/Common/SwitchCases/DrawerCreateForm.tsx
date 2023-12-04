import { AddImageBlock } from '@/components/SharePage/Forms/ImageBlockForm/AddImageBlock'
import { AddLinkBlock } from '@/components/SharePage/Forms/LinkBlockForm/AddLinkBlock'
import { AddMapBlock } from '@/components/SharePage/Forms/MapBlockForm/AddMapBlock'
import { PageBlockForm } from '@/components/SharePage/Forms/PageBlockForm'
import { TemplateBlockCreateForm } from '@/components/SharePage/Forms/TemplateBlockCreateForm'
import { TextBlockForm } from '@/components/SharePage/Forms/TextBlockForm'
import AddVideoBlock from '@/components/SharePage/Forms/VideoBlockForm/AddVideoBlock'
import { IMAGE, LINK, MAP, PAGE, TEMPLATE, TEXT, VIDEO } from '@/constants/blockTypeConstant'
import { type BlockType } from '@/models/space'

interface DrawerCreateFormProps {
  blockType: BlockType
}

function getCreateFormComponent({ blockType }: DrawerCreateFormProps) {
  switch (blockType) {
    case TEXT:
      return <TextBlockForm />
    case IMAGE:
      return <AddImageBlock />
    case LINK:
      return <AddLinkBlock />
    case VIDEO:
      return <AddVideoBlock />
    case MAP:
      return <AddMapBlock />
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
