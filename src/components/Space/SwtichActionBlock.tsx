import { useDrawerFormType } from '@/store/formMode'
import type { ReactNode } from 'react'
import { ActionBlockFormBase } from './ActionBlockFormBase'
import TextBlockForm from '../Forms/TextBlockForm'

export default function SwtichActionBlock() {
  const { blockType } = useDrawerFormType()
  let blockComponent: ReactNode | null = null
  switch (blockType) {
    case 'text':
      blockComponent = <TextBlockForm />
      break
    case 'image':
      blockComponent = <h1>Image block form example</h1>
      break
    case 'link':
      blockComponent = <h1>Link block form example</h1>
      break
    case 'page':
      blockComponent = <h1>Page block form example</h1>
      break
    case 'embed':
      blockComponent = <h1>Embed block form example</h1>
      break
    case 'video':
      blockComponent = <h1>Video block form example</h1>
      break
    case 'googleMap':
      blockComponent = <h1>GoogleMap block form example</h1>
      break
  }

  return <ActionBlockFormBase>{blockComponent}</ActionBlockFormBase>
}
