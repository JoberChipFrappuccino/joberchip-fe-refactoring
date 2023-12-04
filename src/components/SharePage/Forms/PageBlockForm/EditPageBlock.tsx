import { useQueryClient } from '@tanstack/react-query'
import { type EditPageBlockBody } from '@/apis/page/page'
import { type BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { editPageBlockMutate } from '@/queries/mutates/pageBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { PageBlockForm, type PageBlockSubmitData } from './PageBlockForm'
import styles from './PageBlockForm.module.scss'

export const EditPageBlock = ({ block }: BlockBaseWithBlockFormProps<TPage>) => {
  const { pageId } = useSharePageQuery()
  const queryClient = useQueryClient()
  const editPageMutate = editPageBlockMutate(queryClient)

  const handleSubmit = (data: PageBlockSubmitData) => {
    const { parentPageId, title, description } = data
    const body: EditPageBlockBody = {
      parentPageId,
      title,
      description
    }
    editPageMutate.mutate({ pageId, body })
  }

  return (
    <div className={styles.container}>
      <PageBlockForm block={block} onSubmit={handleSubmit} />
    </div>
  )
}
