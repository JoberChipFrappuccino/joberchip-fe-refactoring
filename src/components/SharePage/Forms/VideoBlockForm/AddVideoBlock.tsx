import { useQueryClient } from '@tanstack/react-query'
import { type AddVideoBlockBody } from '@/apis/blocks/videoBlock'
import { addVideoBlockMutate } from '@/queries/mutates/videoBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils'
import Form from './Form'
import styles from './VideoBlockForm.module.scss'

export interface onSubmitAddFormParam {
  videoLink?: AddVideoBlockBody['videoLink']
  attachedVideo?: AddVideoBlockBody['attachedVideo']
}

export default function AddVideoBlock() {
  const { sharePage, pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const queryClient = useQueryClient()
  const addVideoMutation = addVideoBlockMutate(queryClient)

  const handleSubmit = (data: onSubmitAddFormParam) => {
    const body: AddVideoBlockBody = {
      x: 0,
      y: getNextYOfLastBlock(sharePage.children),
      w: 2,
      h: 1,
      title: 'video.mp4',
      ...data
    }
    addVideoMutation.mutate({ pageId, body })
    setOpenDrawer(false)
  }

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}
