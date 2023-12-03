import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { type EditVideoBlockBody, type AddVideoBlockBody } from '@/apis/blocks/videoBlock'
import { type BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import FormButton from '@/components/Common/Ui/Button'
import { addVideoBlockMutate, editVideoBlockMutate } from '@/queries/mutates/videoBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils'
import { dataURIToBlob } from '@/utils/SharePage'
import Preview from './Preview'
import { Radio } from './Radio'
import styles from './VideoBlockForm.module.scss'

interface VideoInputs {
  url: string
  file: FileList
}
export default function FixedVideoBlockForm({ block }: BlockBaseWithBlockFormProps<TVideo>) {
  const { openDrawer, drawerMode, setOpenDrawer } = useBlockActionStore()
  const { sharePage, pageId } = useSharePageQuery()
  const fileRef = useRef<HTMLInputElement | null>(null)
  const [activeRadio, setActiveRadio] = useState('')
  const { register, handleSubmit, watch, reset } = useForm<VideoInputs>({ mode: 'onBlur' })
  const { ref, ...rest } = register('file')
  const queryClient = useQueryClient()
  const addVideoMutation = addVideoBlockMutate(queryClient)
  const editVideoMutation = editVideoBlockMutate(queryClient)

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
    const bodyCommon: { videoLink?: string; attachedVideo?: Blob } = {}
    if (activeRadio === 'radio1') bodyCommon.videoLink = `https://www.youtube.com/embed/${extractVideoId(data.url)}`
    else {
      const buf = await extractFileUrl(data.file)
      bodyCommon.attachedVideo = dataURIToBlob(buf ?? '')
    }

    if (drawerMode === 'CREATE') {
      const body: AddVideoBlockBody = {
        x: 0,
        y: getNextYOfLastBlock(sharePage.children),
        w: 2,
        h: 1,
        title: 'video.mp4',
        ...bodyCommon
      }
      addVideoMutation.mutate({ pageId, body })
    }

    if (drawerMode === 'EDIT') {
      const body: EditVideoBlockBody = {
        objectId: block?.objectId ?? '',
        title: 'video.mp4',
        ...bodyCommon
      }
      editVideoMutation.mutate({ pageId, body })
    }
    setOpenDrawer(false)
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
