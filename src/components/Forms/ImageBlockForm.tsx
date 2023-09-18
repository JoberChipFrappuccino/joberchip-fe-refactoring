import { type BlockWith } from '@/models/space'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import FormButton from '../Ui/Button'
import Thumbnail from '../Ui/Thumbnail'
import styles from './ImageBlockForm.module.scss'

interface Props {
  block?: BlockWith<'image'>
}
export default function ImageBlockForm({ block }: Props) {
  const [thumbnail, setThumbnail] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const isButtonDisabled = !title || !thumbnail

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

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={submitHandler}>
        <div className={styles.forms}>
          <h3>사진 제목*</h3>
          <input type="text" value={title} onChange={onChangetitle} placeholder="사진 제목을 입력해주세요." />
          <h3>사진 첨부</h3>
          <Thumbnail img={thumbnail} imgData={setThumbnail} />
        </div>
        <FormButton title={'사진 추가하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
