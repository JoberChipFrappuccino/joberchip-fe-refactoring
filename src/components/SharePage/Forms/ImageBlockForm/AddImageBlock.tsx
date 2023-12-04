import type { AddImageBlockBody } from '@/apis/blocks/imageBlock'
import type { SharePage } from '@/models/space'
import { useQueryClient } from '@tanstack/react-query'
import { IMAGE } from '@/constants/blockTypeConstant'
import { addImageBlockMutate } from '@/queries/mutates/imageBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { dataURLToBlob, getNextYOfLastBlock } from '@/utils'
import { ImageBlockForm } from './ImageBlockForm'
import styles from './ImageBlockForm.module.scss'

export function AddImageBlock() {
  const { sharePage, pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const queryClient = useQueryClient()
  const addMutate = addImageBlockMutate(queryClient)

  /** 이미지 블록 정보 API 전달 함수 */
  const handleSubmit = async (title: string, thumbnail: string) => {
    const body = getAddImageBlockBody(sharePage?.children ?? [], title, thumbnail)
    addMutate.mutate({ pageId, body })
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
    attachedImage: dataURLToBlob(thumbnail)
  }
}
