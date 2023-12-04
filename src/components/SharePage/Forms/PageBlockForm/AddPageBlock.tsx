import { useQueryClient } from '@tanstack/react-query'
import { createPageBlockMutate } from '@/queries/mutates/pageBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { getNextYOfLastBlock } from '@/utils/api'
import { PageBlockForm, type PageBlockSubmitData } from './PageBlockForm'
import styles from './PageBlockForm.module.scss'

export function AddPageBlock() {
  const { sharePage } = useSharePageQuery()
  const queryClient = useQueryClient()
  const createPageMutation = createPageBlockMutate(queryClient)

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
