import type { AddImageBlockBody } from '@/apis/blocks/imageBlock'
import type { SharePage } from '@/models/space'
import { useQueryClient } from '@tanstack/react-query'
import { IMAGE } from '@/constants/block'
import { useAddImageBlockMutation } from '@/queries/mutates/imageBlockMutation'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { dataURIToBlob, getNextYOfLastBlock } from '@/utils/SharePage'
import { ImageBlockForm } from './ImageBlockForm'
import styles from './ImageBlockForm.module.scss'

export function AddImageBlock() {
  const { sharePage, pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const queryClient = useQueryClient()
  const addImageMutation = useAddImageBlockMutation(queryClient)

  /** 이미지 블록 정보 API 전달 함수 */
  const handleSubmit = async (title: string, thumbnail: string) => {
    const body = getAddImageBlockBody(sharePage?.children ?? [], title, thumbnail)
    addImageMutation.mutate({ pageId, body })
    setOpenDrawer(false)
  }

  return (
    <div className={styles.container}>
      <ImageBlockForm onSubmit={handleSubmit} />
    </div>
  )
}

function getAddImageBlockBody(blocks: SharePage['children'], title: string, thumbnail: string): AddImageBlockBody {
  return {
    x: 0,
    y: getNextYOfLastBlock(blocks),
    w: 2,
    h: 1,
    type: IMAGE,
    title,
    attachedImage: dataURIToBlob(thumbnail)
  }
}
