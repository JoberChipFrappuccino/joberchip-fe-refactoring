import { useCreatePageBlockMutation } from '@/queries/mutates/pageBlockMutation'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { getNextYOfLastBlock } from '@/utils/SharePage'
import { PageBlockForm, type PageBlockSubmitData } from './PageBlockForm'
import styles from './PageBlockForm.module.scss'

export function AddPageBlock() {
  const { sharePage } = useSharePageQuery()
  const createPageMutation = useCreatePageBlockMutation()

  const handleSubmit = (data: PageBlockSubmitData) => {
    const { parentPageId, title, description } = data
    const body = {
      parentPageId,
      title,
      description,
      x: 0,
      y: getNextYOfLastBlock(sharePage.children),
      w: 2,
      h: 1
    }
    createPageMutation.mutate({ body })
  }

  return (
    <div className={styles.container}>
      <PageBlockForm onSubmit={handleSubmit} />
    </div>
  )
}
