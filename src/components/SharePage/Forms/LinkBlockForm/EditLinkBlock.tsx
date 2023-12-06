import type { EditLinkBlockBody } from '@/apis/blocks/linkBlock'
import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { useQueryClient } from '@tanstack/react-query'
import { LinkBlockForm, type LinkBlockFromInputs } from '@/components/SharePage/Forms/LinkBlockForm/LinkBlockForm'
import { useEditLinkBlockMutate } from '@/queries/mutates/linkBlockMutation'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import styles from './LinkBlockForm.module.scss'

export function EditLinkBlock({ block }: BlockBaseWithBlockFormProps<TLink>) {
  const { pageId } = useSharePageQuery()
  const queryClient = useQueryClient()
  const editLinkMutation = useEditLinkBlockMutate(queryClient)
  const handleSubmit = (data: LinkBlockFromInputs) => {
    const body: EditLinkBlockBody = {
      objectId: block?.objectId ?? '',
      ...data
    }
    editLinkMutation.mutate({ pageId, body })
  }
  return (
    <div className={styles.container}>
      <LinkBlockForm block={block} onSubmit={handleSubmit} />
    </div>
  )
}
