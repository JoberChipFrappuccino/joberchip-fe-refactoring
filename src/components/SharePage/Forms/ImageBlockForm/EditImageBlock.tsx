import type { EditImageBlockBody } from '@/apis/blocks/imageBlock'
import { useQueryClient } from '@tanstack/react-query'
import { type BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { editImageBlockMutate } from '@/queries/mutates/imageBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { dataURIToBlob } from '@/utils/SharePage'
import { ImageBlockForm } from './ImageBlockForm'
import styles from './ImageBlockForm.module.scss'

export function EditImageBlock({ block }: BlockBaseWithBlockFormProps<TImage>) {
  const { pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const queryClient = useQueryClient()
  const editMutation = editImageBlockMutate(queryClient)

  /** 이미지 블록 정보 API 전달 함수 */
  const handleSubmit = async (title: string, thumbnail: string) => {
    const body = getEditImageBlockBody(block?.objectId, title, thumbnail)
    editMutation.mutate({ pageId, body })
    setOpenDrawer(false)
  }

  return (
    <div className={styles.container}>
      <ImageBlockForm block={block} onSubmit={handleSubmit} />
    </div>
  )
}

function getEditImageBlockBody(blockId: string | undefined, title: string, thumbnail: string): EditImageBlockBody {
  if (typeof blockId === 'undefined') throw new Error('blockId is undefined')
  const body: EditImageBlockBody = {
    objectId: blockId,
    title,
    attachedImage: dataURIToBlob(thumbnail)
  }
  thumbnail.startsWith('http') && delete body.attachedImage
  !title && delete body.title
  return body
}
