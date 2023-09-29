import { type BlockWith } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import FormButton from '../Ui/Button'
import ImgThumbnail from '../Ui/ImgThumbnail'
import styles from './ImageBlockForm.module.scss'

type Props = {
  block?: BlockWith<'IMAGE'>
}

export default function ImageBlockForm({ block }: Props) {
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
    const body = {
      text: title,
      src: thumbnail
    }
    // body에 data를 담아 post 전달 알림창으로 체크
    alert(JSON.stringify(body))
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
              <div className={styles.delTitle} onClick={deleteTitle}>
                <TiDeleteOutline />
              </div>
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
