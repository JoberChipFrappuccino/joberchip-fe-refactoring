import { useState, type ChangeEvent, type FormEvent } from 'react'
import styles from './LinkBlockForm.module.scss'

export default function LinkBlockForm() {
  const [link, setLink] = useState<string>('')
  const [title, setTitle] = useState<string>('')

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
    e.preventDefault()
    setLink(e.target.value)
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <h3>URL 링크 주소 제목</h3>
        <input type="text" value={title} onChange={onChangeTitle} placeholder="링크 제목을 입력해주세요." />
        <h3>URL 링크 주소 삽입</h3>
        <input type="text" value={link} onChange={onChangeLink} placeholder="링크 주소를 입력해주세요." />
        <button className={styles.button} type="submit">
          링크 추가하기
        </button>
      </form>
    </div>
  )
}
