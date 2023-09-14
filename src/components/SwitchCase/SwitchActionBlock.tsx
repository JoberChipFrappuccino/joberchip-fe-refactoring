import ImageBlockForm from '@/components/Forms/ImageBlockForm'
import LinkBlockForm from '@/components/Forms/LinkBlockForm'
import TextBlockForm from '@/components/Forms/TextBlockForm'
import VideoBlockForm from '@/components/Forms/VideoBlockForm'
import { ActionBlockFormBase } from '@/components/Space/ActionBlockFormBase'
import { useDrawerFormType } from '@/store/formMode'
import type { ReactNode } from 'react'

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
