/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/quotes */
import { useState, type ChangeEvent, type FormEvent } from 'react'
import styles from './VideoBlockForm.module.scss'

export default function VideoBlockForm() {
  const [thumbnail, setThumbnail] = useState<string>('')
  const [title, setTitle] = useState<string>('')

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
  function changeVideo(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files as FileList
    for (const file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', (e) => {
        setThumbnail((e.target as FileReader).result as string)
      })
    }
  }
  /** 썸네일 이미지 삭제 기능 */
  function changeVideoRemove() {
    setThumbnail('')
  }
  // 이미지
  const onChangetitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <h3>동영상 URL 첨부*</h3>
        <input type="text" value={title} onChange={onChangetitle} placeholder="동영상 주소를 입력해주세요." />
        <h3>동영상 파일 첨부</h3>
        <label htmlFor="file" className={styles.addVideoButton}>
          +
        </label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={(e) => {
            changeVideo(e)
          }}
          style={{ display: 'none' }}
        />
        {thumbnail ? (
          <div
            className={styles.thumbnailVideo}
            onClick={() => {
              changeVideoRemove()
            }}
          >
            <video src={thumbnail} />
            <div className={styles.minus}>-</div>
          </div>
        ) : (
          <div style={{ display: 'none' }} />
        )}

        <button className={styles.button} type="submit">
          동영상 추가하기
        </button>
      </form>
    </div>
  )
}
