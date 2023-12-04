import type { RequestTextBlockAddData } from '@/apis/blocks/textblock'
import { useQueryClient } from '@tanstack/react-query'
import { addTextBlockMutate } from '@/queries/mutates/textBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils'
import { TextBlockForm } from './TextBlockForm'

export default function AddTextBlock() {
  const { setOpenDrawer } = useBlockActionStore()
  const { pageId, sharePage } = useSharePageQuery()
  const queryClient = useQueryClient()
  const addTextMutation = addTextBlockMutate(queryClient)
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