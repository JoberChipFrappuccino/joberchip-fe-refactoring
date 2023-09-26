import { type BlockWith } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import FormButton from '../Ui/Button'
import VideoThumbnail from '../Ui/VideoThumbnail'
import styles from './VideoBlockForm.module.scss'

type Props = {
  block?: BlockWith<'video'>
}

export default function VideoBlockForm({ block }: Props) {
  const [selectedRadio, setSelectedRadio] = useState('radio1')
  const [thumbnail, setThumbnail] = useState<string>('')
  const [videoUrl, setVideoUrl] = useState<string>('')
  const { drawerMode } = useBlockAction()
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const thumbnailValue = block?.src ?? ''

  useEffect(() => {
    setThumbnail(thumbnailValue ?? '')
    if (thumbnailValue) {
      if (thumbnailValue.includes('youtube')) {
        setSelectedRadio('radio1')
      } else if (thumbnailValue.endsWith('.mp4')) {
        setSelectedRadio('radio2')
      }
    }
    if (thumbnailValue) {
      if (thumbnailValue.includes('youtube')) {
        setVideoUrl(thumbnailValue)
        setThumbnail('')
      } else if (thumbnailValue.endsWith('.mp4')) {
        setVideoUrl('')
      }
    }
  }, [thumbnailValue])

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      src: thumbnail
    }
    // body에 data를 담아 post 전달 알림창으로 체크
    alert(JSON.stringify(body))
  }

  const onChangetitle = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setVideoUrl(newValue) // 먼저 videoUrl을 업데이트합니다.
    setThumbnail(newValue) // 그리고 thumbnail을 업데이트합니다.
    setIsButtonDisabled(newValue === '')
  }

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(e.target.value)
    setVideoUrl('')
    setThumbnail('')
    setIsButtonDisabled(true)
  }

  const deleteHandler = () => {
    setVideoUrl('')
    setThumbnail('')
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={submitHandler}>
        <div className={styles.forms}>
          <label>
            <div className={styles.checkbox}>
              <input
                className={styles.radios}
                type="radio"
                value="radio1"
                checked={selectedRadio === 'radio1'}
                onChange={handleRadioChange}
              />
              <h3>동영상 URL 첨부*</h3>
            </div>
            <div className={styles.inputbox}>
              <input
                type="text"
                value={videoUrl}
                onChange={onChangetitle}
                placeholder="유튜브 주소를 입력해주세요.(https://youtu.be/동영상링크)"
                disabled={selectedRadio !== 'radio1'}
              />
              {videoUrl && (
                <div className={styles.delete} onClick={deleteHandler}>
                  <TiDeleteOutline />
                </div>
              )}
            </div>
          </label>
          <label>
            <div className={styles.checkbox}>
              <input
                className={styles.radios}
                type="radio"
                value="radio2"
                checked={selectedRadio === 'radio2'}
                onChange={handleRadioChange}
              />
              <h3>동영상 파일 첨부</h3>
            </div>
          </label>
          <VideoThumbnail
            img={thumbnail}
            radio={selectedRadio}
            imgData={setThumbnail}
            buttonActive={setIsButtonDisabled}
            videoUrl={videoUrl}
          />
        </div>
        <FormButton title={drawerMode === 'create' ? '동영상 추가하기' : '동영상 수정하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
