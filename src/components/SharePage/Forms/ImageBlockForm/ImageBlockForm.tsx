import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { TiDeleteOutline } from '@react-icons/all-files/ti/TiDeleteOutline'
import { useQueryClient } from '@tanstack/react-query'
import { Input } from 'antd'
import { useState, type FormEvent } from 'react'
import { type EditImageBlockBody, type AddImageBlockBody } from '@/apis/blocks/imageBlock'
import FormButton from '@/components/Common/Ui/Button'
import ImgThumbnail from '@/components/Common/Ui/ImgThumbnail'
import { IMAGE } from '@/constants/blockTypeConstant'
import { type SharePage } from '@/models/space'
import { addImageBlockMutate, editImageBlockMutate } from '@/queries/mutates/imageBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { dataURLToBlob, getNextYOfLastBlock } from '@/utils'
import styles from './ImageBlockForm.module.scss'

export function ImageBlockForm({ block }: BlockBaseWithBlockFormProps<TImage>) {
  const { sharePage, pageId } = useSharePageQuery()
  const { drawerMode } = useBlockActionStore()
  const { setOpenDrawer } = useBlockActionStore()
  const queryClient = useQueryClient()
  const addMutate = addImageBlockMutate(queryClient)
  const editMutate = editImageBlockMutate(queryClient)

  const [thumbnail, setThumbnail] = useState(block?.src ?? '')
  const [title, setTitle] = useState(block?.title ?? '')
  const isButtonDisabled = !title || !thumbnail

  const blockId = block?.objectId ?? ''

  /** 이미지 블록 정보 API 전달 함수 */
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (drawerMode === 'CREATE') {
      const body = getAddImageBlockBody(sharePage?.children ?? [], title, thumbnail)
      addMutate.mutate({ pageId, body })
    } else if (drawerMode === 'EDIT') {
      const body = getEditImageBlockBody(blockId, title, thumbnail)
      editMutate.mutate({ pageId, body })
    }
    setOpenDrawer(false)
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={submitHandler}>
        <div className={styles.forms}>
          <h3>사진 제목*</h3>
          <div className={styles.inputbox}>
            <Input
              className={styles.input}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="사진 제목을 입력해주세요."
            />
            {title && (
              <button type="button" className={styles.delTitle} onClick={() => setTitle('')}>
                <TiDeleteOutline />
              </button>
            )}
          </div>
          <h3 className={styles.formText}>사진 첨부*</h3>
          <ImgThumbnail img={thumbnail} imgData={setThumbnail} />
        </div>
        <FormButton title={drawerMode === 'CREATE' ? '사진 추가하기' : '사진 수정하기'} event={isButtonDisabled} />
      </form>
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

function getEditImageBlockBody(blockId: string, title: string, thumbnail: string): EditImageBlockBody {
  const body: EditImageBlockBody = {
    objectId: blockId,
    title,
    attachedImage: dataURLToBlob(thumbnail)
  }
  thumbnail.startsWith('http') && delete body.attachedImage
  !title && delete body.title
  return body
}
