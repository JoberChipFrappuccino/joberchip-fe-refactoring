import { type RequestTextBlockAddData } from '@/apis/blocks'
import { useAddTextBlockMutation } from '@/queries/mutates/textBlockMutation'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils/SharePage'
import { TextBlockForm } from './TextBlockForm'

export default function AddTextBlock() {
  const { setOpenDrawer } = useBlockActionStore()
  const { pageId, sharePage } = useSharePageQuery()
  const addTextMutation = useAddTextBlockMutation()
  const handleSubmit = (content: string) => {
    const block: RequestTextBlockAddData = {
      content,
      x: 0,
      y: getNextYOfLastBlock(sharePage.children),
      w: 1,
      h: 1
    }
    setOpenDrawer(false)
    addTextMutation.mutate({ pageId, block })
  }
  return <TextBlockForm onSubmit={handleSubmit} />
}
