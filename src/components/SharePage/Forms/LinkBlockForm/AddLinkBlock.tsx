import { type AddLinkBlockBody } from '@/apis/blocks/linkBlock'
import { useAddLinkBlockMutate } from '@/hooks/mutations/linkBlockMutation'
import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import { type SharePage } from '@/models/space'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils/SharePage'
import { LinkBlockForm, type LinkBlockFromInputs } from './LinkBlockForm'
import styles from './LinkBlockForm.module.scss'

export function AddLinkBlock() {
  const { sharePage, pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const addLinkMutation = useAddLinkBlockMutate()
  const handleSubmit = (data: LinkBlockFromInputs) => {
    const body = getLinkBlockBody(sharePage.children, data.title, data.link)
    addLinkMutation.mutate({ pageId, body })
    setOpenDrawer(false)
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
