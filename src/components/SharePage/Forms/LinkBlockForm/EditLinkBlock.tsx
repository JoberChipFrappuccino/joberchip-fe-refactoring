import type { EditLinkBlockBody } from '@/apis/blocks/linkBlock'
import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { LinkBlockForm, type LinkBlockFromInputs } from '@/components/SharePage/Forms/LinkBlockForm/LinkBlockForm'
import { useEditLinkBlockMutate } from '@/hooks/mutations/linkBlockMutation'
import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import styles from './LinkBlockForm.module.scss'

export function EditLinkBlock({ block }: BlockBaseWithBlockFormProps<TLink>) {
  const { pageId } = useSharePageQuery()
  const editLinkMutation = useEditLinkBlockMutate()
  const { setOpenDrawer } = useBlockActionStore()

  const handleSubmit = (data: LinkBlockFromInputs) => {
    const body: EditLinkBlockBody = {
      objectId: block?.objectId ?? '',
      ...data
    }
    setOpenDrawer(false)
    editLinkMutation.mutate({ pageId, body })
  }
  return (
    <div className={styles.container}>
      <LinkBlockForm block={block} onSubmit={handleSubmit} />
    </div>
  )
}
