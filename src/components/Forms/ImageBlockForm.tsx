/* eslint-disable object-shorthand */
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import { getNextYOfLastBlock } from '@/utils/api'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { type BlockBaseWithBlockFormProps } from '../SwitchCase/DrawerEditForm'
import FormButton from '../Ui/Button'
import ImgThumbnail from '../Ui/ImgThumbnail'
import styles from './ImageBlockForm.module.scss'

export function ImageBlockForm({ block }: BlockBaseWithBlockFormProps<TImage>) {
  const { sharePage } = useSharePageStore()
  const [thumbnail, setThumbnail] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const isButtonDisabled = !title || !thumbnail
  const { drawerMode } = useBlockAction()

  const titleValue = block?.alt ?? ''
  const thumbnailValue = block?.src ?? ''

  useEffect(() => {
    setTitle(titleValue ?? '')
    setThumbnail(thumbnailValue ?? '')
  }, [titleValue, thumbnailValue])

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (drawerMode === 'create') {
      const body = {
        x: 0,
        y: getNextYOfLastBlock(sharePage.children),
        w: 1,
        h: 1,
        title: title,
        attachedImage: thumbnail
      }
      // body에 data를 담아 post 전달 알림창으로 체크
      alert(JSON.stringify(body))
      // eslint-disable-next-line no-console
      console.log('블록들의 상태', block)
    } else if (drawerMode === 'edit') {
      const body = {
        title: title,
        attachedImage: thumbnail
      }
      // body에 data를 담아 post 전달 알림창으로 체크
      alert(JSON.stringify(body))
    }
  }

  const onChangetitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  const deleteTitle = () => {
    setTitle('')
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={submitHandler}>
        <div className={styles.forms}>
          <h3>사진 제목*</h3>
          <div className={styles.inputbox}>
            <input type="text" value={title} onChange={onChangetitle} placeholder="사진 제목을 입력해주세요." />
            {title && (
              <button type="button" className={styles.delTitle} onClick={deleteTitle}>
                <TiDeleteOutline />
              </button>
            )}
          </div>
          <h3 className={styles.formText}>사진 첨부</h3>
          <ImgThumbnail img={thumbnail} imgData={setThumbnail} />
        </div>
        <FormButton title={drawerMode === 'create' ? '사진 추가하기' : '사진 수정하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
