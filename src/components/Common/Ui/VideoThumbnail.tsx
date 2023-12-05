import { HiOutlineMinusCircle } from '@react-icons/all-files/hi/HiOutlineMinusCircle'
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import styles from './VideoThumbnail.module.scss'

type Props = {
  radio: string
  imgData?: Dispatch<SetStateAction<string>>
  buttonActive?: Dispatch<SetStateAction<boolean>>
  img: string
  videoUrl: string
}

export default function VideoThumbnail({ radio, imgData, buttonActive, img, videoUrl }: Props) {
  const [selectedRadio, setSelectedRadio] = useState<string>(radio)
  const [thumbnail, setThumbnail] = useState<string>('')
  const [youtubeThumb, setYoutubeThumb] = useState<string>('')
  const [key, setKey] = useState(0)
  const editImg = img

  useEffect(() => {
    setThumbnail(editImg)
    setSelectedRadio(radio ?? 'radio1')
    if (videoUrl.includes('be/')) {
      setYoutubeThumb(videoUrl.split('be/')[1])
    } else if (videoUrl.includes('v=')) {
      setYoutubeThumb(videoUrl.split('v=')[1])
    }
  }, [radio, img, videoUrl])

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
      {thumbnail ? (
        ''
      ) : (
        <label
          htmlFor="file"
          className={styles.addButton}
          style={selectedRadio !== 'radio2' ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
        >
          <p>+</p>
        </label>
      )}
      <input
        type="file"
        id="file"
        name="file"
        accept=".mp4, .webm, .ogg, .quicktime"
        style={{ display: 'none' }}
        onChange={(e) => {
          changeMedia(e)
        }}
        disabled={selectedRadio !== 'radio2'}
        key={key}
      />
      {thumbnail ? (
        <button className={styles.thumbnailVideo} type="button" onClick={() => changeMediaRemove()}>
          {thumbnail.includes('youtu') ? (
            <img src={`https://img.youtube.com/vi/${youtubeThumb}/maxresdefault.jpg`} />
          ) : (
            <div className={styles.default}>
              <video src={thumbnail} />
            </div>
          )}
          <div className={styles.minus}>
            <HiOutlineMinusCircle />
          </div>
        </button>
      ) : (
        <div style={{ display: selectedRadio !== 'radio2' ? 'none' : 'block' }} />
      )}
    </>
  )
}
