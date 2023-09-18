import { type BlockWith } from '@/models/space'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import FormButton from '../Ui/Button'
import styles from './LinkBlockForm.module.scss'
interface Props {
  block?: BlockWith<'link'>
}
export default function LinkBlockForm({ block }: Props) {
  const [link, setLink] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const isButtonDisabled = !link || !title

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      text: title,
      url: link
    }
    // body에 data를 담아 post 전달 알림창으로 체크
    alert(JSON.stringify(body))
  }

  const onChangeLink = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={submitHandler}>
        <div className={styles.forms}>
          <h3>URL 링크 주소 제목</h3>
          <input type="text" value={title} onChange={onChangeTitle} placeholder="링크 제목을 입력해주세요." />
          <h3>URL 링크 주소 삽입</h3>
          <input type="text" value={link} onChange={onChangeLink} placeholder="링크 주소를 입력해주세요." />
        </div>
        <FormButton title={'링크 추가하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
