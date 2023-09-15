/* eslint-disable multiline-ternary */
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { HiOutlineMinusCircle } from 'react-icons/hi'
import styles from './Thumbnail.module.scss'

type Props = {
  radio?: string
  imgData?: Dispatch<SetStateAction<string>>
  buttonActive?: Dispatch<SetStateAction<boolean>>
  img?: string
}

export default function Thumbnail({ radio, imgData, buttonActive, img }: Props) {
  const [selectedRadio, setSelectedRadio] = useState<string>('radio1')
  const [thumbnail, setThumbnail] = useState<string>('')
  const [key, setKey] = useState(0)

  useEffect(() => {
    setSelectedRadio(radio ?? 'radio1')
  }, [radio])

  /** 제품 썸네일 이미지 Base64 포멧 변환 */
  function changeMedia(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files as FileList
    for (const file of files) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.addEventListener('load', (e) => {
        const result = (e.target as FileReader).result as string
        setThumbnail(result)
        imgData && imgData(result)
        setKey((e) => e + 1)
      })
    }
    buttonActive && buttonActive(e.target.value === '')
  }

  /** 썸네일 이미지 삭제 기능 */
  function changeMediaRemove() {
    setThumbnail('')
    imgData && imgData('')
    buttonActive && buttonActive(true)
    setKey((e) => e + 1)
  }

  return (
    <>
      <label
        htmlFor="file"
        className={styles.addVideoButton}
        style={selectedRadio && img !== 'radio2' && img ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
      >
        +
      </label>
      <input
        type="file"
        id="file"
        name="file"
        style={{ display: 'none' }}
        onChange={(e) => {
          changeMedia(e)
        }}
        disabled={!!(selectedRadio && img !== 'radio2' && img)}
        key={key}
      />
      {thumbnail ? (
        <div
          className={styles.thumbnailVideo}
          onClick={() => {
            changeMediaRemove()
          }}
        >
          {thumbnail.includes('image') ? <img src={thumbnail} /> : <video src={thumbnail} />}
          <div className={styles.minus}>
            <HiOutlineMinusCircle />
          </div>
        </div>
      ) : (
        <div style={{ display: selectedRadio !== 'radio2' ? 'none' : 'block' }} />
      )}
    </>
  )
}
