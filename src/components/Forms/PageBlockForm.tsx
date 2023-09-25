import { useState, type ChangeEvent, type FormEvent } from 'react'
import TreeLayout from '../Tree/TreeLayout'
import FormButton from '../Ui/Button'
import styles from './PageBlockForm.module.scss'

export default function PageBlockForm() {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [isLocationVisible, setLocationVisible] = useState(false)
    const isButtonDisabled = !title || !description || !location

    const toggleLocation = () => {
      setLocationVisible(!isLocationVisible)
    }

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const body = {
        text: title,
        description,
        location: isLocationVisible ? location : ''
      }
      // body에 data를 담아 post 전달 알림창으로 체크
      alert(JSON.stringify(body))
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setTitle(e.target.value)
    }
    const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setDescription(e.target.value)
    }
    const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setLocation(e.target.value)
    }

    return (
        <div className={styles.container}>
          <form className={styles.formBox} onSubmit={submitHandler}>
            <div className={styles.forms}>
              <h3>페이지 제목</h3>
              <input type="text" value={title} onChange={onChangeTitle} placeholder="페이지제목" />
              <h3>페이지 설명</h3>
              <input type="text" value={description} onChange={onChangeDescription} placeholder="페이지 설명을 입력해주세요." />
              <h3>페이지 위치 설정</h3>
              <div >
                <input
                  type="text"
                  value={location}
                  onChange={onChangeLocation}
                  onClick={toggleLocation}
                  readOnly
                  placeholder="페이지 위치를 설정해주세요."
                />
                {isLocationVisible && (
                  <div>
                    <TreeLayout/>
                  </div>
                )}
              </div>
            </div>
            <FormButton title={'페이지 수정하기'} event={isButtonDisabled} />
        </form>
      </div>
    )
}
