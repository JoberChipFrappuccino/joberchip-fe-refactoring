import type { RequestTextBlockEditData } from '@/apis/blocks/draftTextBlock'
import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { useEditTextBlockMutation } from '@/queries/mutates/textBlockMutation'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { TextBlockForm } from './TextBlockForm'

export default function EditTextBlock({ block }: BlockBaseWithBlockFormProps<TText>) {
  const { pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const editTextMutation = useEditTextBlockMutation()
  const handleSubmit = (content: string) => {
    const data: RequestTextBlockEditData = {
      objectId: block?.objectId ?? '',
      content
    }
    setOpenDrawer(false)
    editTextMutation.mutate({ pageId, block: data })
  }
  return <TextBlockForm block={block} onSubmit={handleSubmit} />
}
