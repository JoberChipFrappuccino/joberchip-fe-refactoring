import ImageBlockForm from '@/components/Forms/ImageBlockForm'
import LinkBlockForm from '@/components/Forms/LinkBlockForm'
import TextBlockForm from '@/components/Forms/TextBlockForm'
import VideoBlockForm from '@/components/Forms/VideoBlockForm'
import { ActionBlockFormBase } from '@/components/Space/ActionBlockFormBase'
import { useDrawerFormType } from '@/store/formMode'

export default function SwtichCreateActionBlock() {
  const { blockType } = useDrawerFormType()
  switch (blockType) {
    case 'text':
      return <ActionBlockFormBase>{<TextBlockForm />}</ActionBlockFormBase>
    case 'image':
      return <ActionBlockFormBase>{<ImageBlockForm />}</ActionBlockFormBase>
    case 'link':
      return <ActionBlockFormBase>{<LinkBlockForm />}</ActionBlockFormBase>
    case 'embed':
      return <ActionBlockFormBase>{<h1>Embed block form example</h1>}</ActionBlockFormBase>
    case 'video':
      return <ActionBlockFormBase>{<VideoBlockForm />}</ActionBlockFormBase>
    case 'googleMap':
      return <ActionBlockFormBase>{<h1>GoogleMap block form example</h1>}</ActionBlockFormBase>
    case 'page':
      return <h1>Page block form example</h1>
    case 'template':
      return <h1>Template block form example</h1>
  }
}
