import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import FormButton from '@/components/Common/Ui/Button'
import { type onSubmitAddFormParam } from '@/components/SharePage/Forms/VideoBlockForm/AddVideoBlock'
import { type onSubmitEditFormParam } from '@/components/SharePage/Forms/VideoBlockForm/EditVideoBlock'
import Preview from '@/components/SharePage/Forms/VideoBlockForm/Preview'
import { Radio } from '@/components/SharePage/Forms/VideoBlockForm/Radio'
import { useBlockActionStore } from '@/store/blockAction'
import { dataURIToBlob } from '@/utils/SharePage'
import styles from './VideoBlockForm.module.scss'

interface VideoInputs {
  url: string
  file: FileList
}

type VideoBlockFormProps = BlockBaseWithBlockFormProps<TVideo> & {
  onSubmit: (data: onSubmitAddFormParam | onSubmitEditFormParam) => void
}
export default function Form({ block, onSubmit: onSubmitForm }: VideoBlockFormProps) {
  const { openDrawer, drawerMode } = useBlockActionStore()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [activeRadio, setActiveRadio] = useState('')
  const { register, handleSubmit, watch, reset } = useForm<VideoInputs>({ mode: 'onBlur' })
  const { ref, ...rest } = register('file')

  useEffect(() => {
    if (typeof block?.src !== 'string') {
      setActiveRadio('radio1')
    } else if (block?.src.includes('http')) {
      setActiveRadio('radio1')
    } else {
      setActiveRadio('radio2')
    }
  }, [openDrawer])

  const onSubmit = async (data: VideoInputs) => {
    const body: { videoLink?: string; attachedVideo?: Blob } = {}
    if (activeRadio === 'radio1') body.videoLink = `https://www.youtube.com/embed/${extractVideoId(data.url)}`
    else {
      const buf = await extractFileUrl(data.file)
      body.attachedVideo = dataURIToBlob(buf ?? '')
    }
    onSubmitForm(body)
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputCover}>
          <Radio
            id="radio1"
            value="radio1"
            title="동영상 URL 첨부"
            checked={activeRadio === 'radio1'}
            onToggle={(e) => {
              setActiveRadio(e)
            }}
          />
          <input
            id="url"
            type="text"
            className={classNames(styles.urlInput, {
              [styles.inactive]: activeRadio === 'radio2',
              [styles.active]: activeRadio !== 'radio2'
            })}
            placeholder="유튜브 주소를 입력하세요."
            disabled={activeRadio === 'radio2'}
            {...register('url')}
          />
          <Radio
            id="radio2"
            value="radio2"
            title="동영상 파일 첨부"
            checked={activeRadio === 'radio2'}
            onToggle={(e) => setActiveRadio(e)}
          />
          <label
            id="file"
            className={classNames(styles.fileLabel, {
              [styles.inactive]: activeRadio === 'radio1',
              [styles.active]: activeRadio !== 'radio1'
            })}
            onClick={() => {
              fileRef.current?.click()
            }}
          >
            <p>+</p>
          </label>
          <input
            ref={(e) => {
              ref(e)
              fileRef.current = e
            }}
            id="file"
            type="file"
            className={styles.fileInput}
            accept=".mp4"
            disabled={activeRadio === 'radio1'}
            {...rest}
          />
          <div
            className={styles.previewCover}
            onClick={() => {
              reset({ file: undefined })
              setActiveRadio('radio1')
            }}
          >
            <Preview radio={activeRadio} url={watch('url')} videoSrc={watch('file')} />
          </div>
        </div>
        <FormButton
          title={drawerMode === 'CREATE' ? '동영상 추가하기' : '동영상 수정하기'}
          event={!watch('url') || watch('file').length === 0}
        />
      </form>
    </div>
  )
}

function extractVideoId(url?: string) {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

async function extractFileUrl(files: FileList | undefined) {
  if (!files?.length) return undefined
  const reader = new FileReader()
  reader.readAsDataURL(files[0])
  const buf: string = await new Promise((resolve) => {
    reader.addEventListener('load', (e) => {
      const buf = e.target?.result as string
      resolve(buf)
    })
  })
  return buf
}
