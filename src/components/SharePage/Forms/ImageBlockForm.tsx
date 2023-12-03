import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { TiDeleteOutline } from '@react-icons/all-files/ti/TiDeleteOutline'
import { Input } from 'antd'
import { useState, type FormEvent } from 'react'
import { addImageBlockAPI, editImageBlockAPI } from '@/apis/blocks'
import FormButton from '@/components/Common/Ui/Button'
import ImgThumbnail from '@/components/Common/Ui/ImgThumbnail'
import { IMAGE } from '@/constants/blockTypeConstant'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import FormManager from '@/utils/FormManager'
import styles from './ImageBlockForm.module.scss'

const form = new FormManager()

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

    if (drawerMode === 'CREATE') {
      form.addDefaultOptionToBlock(sharePage.children)
      form.append('type', IMAGE)
      form.append('attachedImage', thumbnail, 'image.png')
      form.append('title', title)
      await addImageBlockAPI(pageId, form.getForm())
    } else if (drawerMode === 'EDIT') {
      form.append('title', title)
      form.append('attachedImage', thumbnail, 'image.png')
      await editImageBlockAPI(pageId, blockId, form.getForm())
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
