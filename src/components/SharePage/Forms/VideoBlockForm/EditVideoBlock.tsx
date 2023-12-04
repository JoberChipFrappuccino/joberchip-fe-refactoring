import type { EditVideoBlockBody } from '@/apis/blocks/videoBlock'
import { useQueryClient } from '@tanstack/react-query'
import { type BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { editVideoBlockMutate } from '@/queries/mutates/videoBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import Form from './Form'
import styles from './VideoBlockForm.module.scss'

export interface onSubmitEditFormParam {
  videoLink?: EditVideoBlockBody['videoLink']
  attachedVideo?: EditVideoBlockBody['attachedVideo']
}

export default function EditVideoBlock({ block }: BlockBaseWithBlockFormProps<TVideo>) {
  const { pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const queryClient = useQueryClient()
  const editVideoMutation = editVideoBlockMutate(queryClient)

  const handleSubmit = (data: onSubmitEditFormParam) => {
    const body: EditVideoBlockBody = {
      objectId: block?.objectId ?? '',
      title: 'video.mp4',
      ...data
    }
    editVideoMutation.mutate({ pageId, body })
    setOpenDrawer(false)
  }

  return (
    <div className={styles.container}>
      <Form block={block} onSubmit={handleSubmit} />
    </div>
  )
}