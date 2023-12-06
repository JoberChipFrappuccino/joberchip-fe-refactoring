import { useQueryClient } from '@tanstack/react-query'
import { type AddLinkBlockBody } from '@/apis/blocks/linkBlock'
import { type SharePage } from '@/models/space'
import { useAddLinkBlockMutate } from '@/queries/mutates/linkBlockMutation'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { getNextYOfLastBlock } from '@/utils/SharePage'
import { LinkBlockForm, type LinkBlockFromInputs } from './LinkBlockForm'
import styles from './LinkBlockForm.module.scss'

export function AddLinkBlock() {
  const { sharePage, pageId } = useSharePageQuery()
  const queryClient = useQueryClient()
  const addLinkMutation = useAddLinkBlockMutate(queryClient)
  const handleSubmit = (data: LinkBlockFromInputs) => {
    const body = getLinkBlockBody(sharePage.children, data.title, data.link)
    addLinkMutation.mutate({ pageId, body })
  }
  return (
    <div className={styles.container}>
      <LinkBlockForm onSubmit={handleSubmit} />
    </div>
  )
}

function getLinkBlockBody(blocks: SharePage['children'], title: string, link: string): AddLinkBlockBody {
  return {
    x: 0,
    y: getNextYOfLastBlock(blocks),
    w: 2,
    h: 1,
    title,
    link
  }
}
