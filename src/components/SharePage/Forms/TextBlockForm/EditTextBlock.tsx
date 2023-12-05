import type { RequestTextBlockEditData } from '@/apis/blocks/textBlock'
import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { useQueryClient } from '@tanstack/react-query'
import { editTtextBlockMutate } from '@/queries/mutates/textBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { TextBlockForm } from './TextBlockForm'

export default function EditTextBlock({ block }: BlockBaseWithBlockFormProps<TText>) {
  const { pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()

  const queryClient = useQueryClient()
  const editMutation = editTtextBlockMutate(queryClient)
  const handleSubmit = (content: string) => {
    const data: RequestTextBlockEditData = {
      objectId: block?.objectId ?? '',
      content
    }
    setOpenDrawer(false)
    editMutation.mutate({ pageId, block: data })
  }
  return <TextBlockForm block={block} onSubmit={handleSubmit} />
}
