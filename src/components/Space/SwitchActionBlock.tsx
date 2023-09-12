import { useDrawerFormType } from '@/store/formMode'
import type { ReactNode } from 'react'
import ImageBlockForm from '../Forms/ImageBlockForm'
import LinkBlockForm from '../Forms/LinkBlockForm'
import TextBlockForm from '../Forms/TextBlockForm'
import VideoBlockForm from '../Forms/VideoBlockForm'
import { ActionBlockFormBase } from './ActionBlockFormBase'

export default function SwtichActionBlock() {
  const { blockType } = useDrawerFormType()
  let blockComponent: ReactNode | null = null
  switch (blockType) {
    case 'text':
      blockComponent = <TextBlockForm />
      break
    case 'image':
      blockComponent = <ImageBlockForm />
      break
    case 'link':
      blockComponent = <LinkBlockForm />
      break
    case 'page':
      blockComponent = <h1>Page block form example</h1>
      break
    case 'embed':
      blockComponent = <h1>Embed block form example</h1>
      break
    case 'video':
      blockComponent = <VideoBlockForm />
      break
    case 'googleMap':
      blockComponent = <h1>GoogleMap block form example</h1>
      break
  }

  return <ActionBlockFormBase>{blockComponent}</ActionBlockFormBase>
}
