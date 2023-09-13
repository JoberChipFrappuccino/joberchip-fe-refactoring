/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/quotes */
import { useState, type ChangeEvent, type FormEvent } from 'react'
import FormButton from '../Ui/Button'
import styles from './VideoBlockForm.module.scss'

export default function VideoBlockForm() {
  const [selectedRadio, setSelectedRadio] = useState('radio1')
  const [thumbnail, setThumbnail] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [key, setKey] = useState(0)

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

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
        setKey((e) => e + 1)
      })
    }
    setIsButtonDisabled(e.target.value === '')
  }
  /** 썸네일 이미지 삭제 기능 */
  function changeVideoRemove() {
    setThumbnail('')
    setIsButtonDisabled(true)
    setKey((e) => e + 1)
  }
  // 이미지
  const onChangetitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitle(e.target.value)
    setIsButtonDisabled(e.target.value === '')
  }

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.target.value)
    setTitle('')
    setThumbnail('')
    setIsButtonDisabled(true)
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <label>
          <div className={styles.checkbox}>
            <input type="radio" value="radio1" checked={selectedRadio === 'radio1'} onChange={handleRadioChange} />
            <h3>동영상 URL 첨부*</h3>
          </div>
          <input
            type="text"
            value={title}
            onChange={onChangetitle}
            placeholder="동영상 주소를 입력해주세요."
            disabled={selectedRadio !== 'radio1'}
          />
        </label>
        <label>
          <div className={styles.checkbox}>
            <input type="radio" value="radio2" checked={selectedRadio === 'radio2'} onChange={handleRadioChange} />
            <h3>동영상 파일 첨부</h3>
          </div>
          <label
            htmlFor="file"
            className={styles.addVideoButton}
            style={selectedRadio !== 'radio2' ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
          >
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
            disabled={selectedRadio !== 'radio2'}
            key={key}
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
        </label>
        <FormButton title={'동영상 추가하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
