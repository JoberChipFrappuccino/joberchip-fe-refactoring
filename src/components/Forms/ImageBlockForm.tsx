/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/quotes */
import { useState, type ChangeEvent, type FormEvent } from 'react'
import FormButton from '../Ui/Button'
import styles from './ImageBlockForm.module.scss'

export default function ImageBlockForm() {
  const [key, setKey] = useState(0)
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
  // 제품 썸네일 이미지 Base64 포멧 변환
  function changeImg(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files as FileList
    for (const file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', (e) => {
        setThumbnail((e.target as FileReader).result as string)
        setKey((e) => e + 1)
      })
    }
  }
  /** 썸네일 이미지 삭제 기능 */
  function changeImgRemove() {
    setThumbnail('')
    setKey((e) => e + 1)
  }
  // 이미지
  const onChangetitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <h3>사진 제목*</h3>
        <input type="text" value={title} onChange={onChangetitle} placeholder="사진 제목을 입력해주세요." />
        <h3>사진 첨부</h3>
        <label htmlFor="file" className={styles.addImgButton}>
          +
        </label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={(e) => {
            changeImg(e)
          }}
          style={{ display: 'none' }}
          key={key}
        />
        {thumbnail ? (
          <div
            className={styles.thumbnailImg}
            onClick={() => {
              changeImgRemove()
            }}
          >
            <img src={thumbnail} />
            <div className={styles.minus}>-</div>
          </div>
        ) : (
          <div style={{ display: 'none' }} />
        )}
        <FormButton title={'사진 추가하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
