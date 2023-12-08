import { type AddVideoBlockBody } from '@/apis/blocks/videoBlock'
import { useAddVideoBlockMutation } from '@/hooks/mutations/videoBlockMutation'
import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils/SharePage'
import Form from './Form'
import styles from './VideoBlockForm.module.scss'

export interface onSubmitAddFormParam {
  videoLink?: AddVideoBlockBody['videoLink']
  attachedVideo?: AddVideoBlockBody['attachedVideo']
}

export default function AddVideoBlock() {
  const { sharePage, pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const addVideoMutation = useAddVideoBlockMutation()

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
