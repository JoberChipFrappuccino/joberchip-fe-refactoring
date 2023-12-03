import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { TiDeleteOutline } from '@react-icons/all-files/ti/TiDeleteOutline'
import { Input } from 'antd'
import { useState, type FormEvent } from 'react'
import { editImageBlockAPI } from '@/apis/blocks'
import FormButton from '@/components/Common/Ui/Button'
import ImgThumbnail from '@/components/Common/Ui/ImgThumbnail'
import { IMAGE } from '@/constants/blockTypeConstant'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils/api'
import styles from './ImageBlockForm.module.scss'
// import { addImageBlockAPI, editImageBlockAPI } from '@/apis/blocks'

export function ImageBlockForm({ block }: BlockBaseWithBlockFormProps<TImage>) {
  const { sharePage, pageId } = useSharePageQuery()
  const { drawerMode } = useBlockActionStore()
  const { setOpenDrawer } = useBlockActionStore()

  const [thumbnail, setThumbnail] = useState(block?.src ?? '')
  const [title, setTitle] = useState(block?.title ?? '')
  const isButtonDisabled = !title || !thumbnail

  const blockId = block?.objectId ?? ''

  /** 이미지 블록 정보 API 전달 함수 */
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const addform = new FormData()
    const editform = new FormData()

    if (thumbnail.startsWith('data:image')) {
      const base64ImageData = thumbnail
      const blob = await fetch(base64ImageData).then((response) => response.blob())
      const file = new File([blob], 'image.png', { type: 'image/png' })
      addform.append('attachedImage', file, 'image.png')
      editform.append('attachedImage', file, 'image.png')
    }

    addform.append('x', '0')
    addform.append('y', getNextYOfLastBlock(sharePage.children).toString())
    addform.append('w', '1')
    addform.append('h', '2')
    addform.append('title', title)
    addform.append('type', IMAGE)
    addform.append('visible', 'true')

    editform.append('title', title)

    try {
      if (drawerMode === 'CREATE') {
        // const { data: responseData } = await addImageBlockAPI(pageId, addform)
        // const updatedSharePage = {z
        //   ...sharePage,
        //   children: [...sharePage.children, { ...responseData }]
        // }
        // setSharePage(updatedSharePage)
        setOpenDrawer(false)
      } else if (drawerMode === 'EDIT') {
        const { data: responseData } = await editImageBlockAPI(pageId, blockId, editform)
        const existingBlockIndex = sharePage.children.findIndex((block) => block.objectId === responseData.objectId)
        const updatedChildren = [...sharePage.children]
        if (existingBlockIndex !== -1) {
          updatedChildren[existingBlockIndex] = responseData
        } else {
          updatedChildren.push(responseData)
        }
        // const updatedSharePage = {
        //   ...sharePage,
        //   children: updatedChildren
        // }
        // setSharePage(updatedSharePage)
        setOpenDrawer(false)
      }
    } catch (error) {
      console.error(error)
    }
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
