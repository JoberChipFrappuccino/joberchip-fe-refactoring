import { useState, type ChangeEvent, type FormEvent } from 'react'
import FormButton from '../Ui/Button'
import Thumbnail from '../Ui/Thumbnail'
import styles from './VideoBlockForm.module.scss'

export default function VideoBlockForm() {
  const [selectedRadio, setSelectedRadio] = useState('radio1')
  const [thumbnail, setThumbnail] = useState<string>('')
  const [title, setTitle] = useState<string>('')

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
      <form className={styles.formBox} onSubmit={submitHandler}>
        <div className={styles.forms}>
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
          </label>
          <Thumbnail radio={selectedRadio} imgData={setThumbnail} buttonActive={setIsButtonDisabled} />
        </div>
        <FormButton title={'동영상 추가하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
