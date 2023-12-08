import { Suspense } from 'react'
import { AddImageBlock } from '@/components/SharePage/Forms/ImageBlockForm/AddImageBlock'
import { AddLinkBlock } from '@/components/SharePage/Forms/LinkBlockForm/AddLinkBlock'
import { AddMapBlock } from '@/components/SharePage/Forms/MapBlockForm/AddMapBlock'
import { AddPageBlock } from '@/components/SharePage/Forms/PageBlockForm/AddPageBlock'
import { AddTemplateBlockForm } from '@/components/SharePage/Forms/TemplateBlockForm/AddTemplateBlockForm'
import AddTextBlock from '@/components/SharePage/Forms/TextBlockForm/AddTextBlock'
import AddVideoBlock from '@/components/SharePage/Forms/VideoBlockForm/AddVideoBlock'
import { IMAGE, LINK, MAP, PAGE, TEMPLATE, TEXT, VIDEO } from '@/constants/block'
import { type BlockType } from '@/models/block'

interface DrawerCreateFormProps {
  blockType: BlockType
}

function getCreateFormComponent({ blockType }: DrawerCreateFormProps) {
  switch (blockType) {
    case TEXT:
      return <AddTextBlock />
    case IMAGE:
      return <AddImageBlock />
    case LINK:
      return <AddLinkBlock />
    case VIDEO:
      return <AddVideoBlock />
    case MAP:
      return <AddMapBlock />
    case PAGE:
      return <AddPageBlock />
    case TEMPLATE:
      return (
        <Suspense fallback={<p>loading...</p>}>
          <AddTemplateBlockForm />
        </Suspense>
      )
    default: {
      if (process.env.NODE_ENV === 'development') {
        throw new Error('Please add a component')
      }
      return null
    }
  }
}

export function DrawerAddForm({ blockType }: DrawerCreateFormProps) {
  return getCreateFormComponent({ blockType })
}
