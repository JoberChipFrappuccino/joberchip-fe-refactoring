import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { TiDeleteOutline } from '@react-icons/all-files/ti/TiDeleteOutline'
import { Input } from 'antd'
import { useState, type FormEvent } from 'react'
import FormButton from '@/components/Common/Ui/Button'
import ImgThumbnail from '@/components/Common/Ui/ImgThumbnail'
import { useBlockActionStore } from '@/store/blockAction'
import styles from './ImageBlockForm.module.scss'

type ImageBlockFormProps = BlockBaseWithBlockFormProps<TImage> & {
  onSubmit: (title: string, thumbnail: string) => void
}
export function ImageBlockForm({ block, onSubmit }: ImageBlockFormProps) {
  const { drawerMode } = useBlockActionStore()

  const [thumbnail, setThumbnail] = useState(block?.src ?? '')
  const [title, setTitle] = useState(block?.title ?? '')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(title, thumbnail)
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={handleSubmit}>
        <div className={styles.forms}>
          <h3>사진 제목*</h3>
          <div className={styles.inputbox}>
            <Input
              className={styles.input}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="사진 제목을 입력해주세요."
            />
            {title && (
              <button type="button" className={styles.delTitle} onClick={() => setTitle('')}>
                <TiDeleteOutline />
              </button>
            )}
          </div>
          <h3 className={styles.formText}>사진 첨부*</h3>
          <ImgThumbnail img={thumbnail} imgData={setThumbnail} />
        </div>
        <FormButton title={drawerMode === 'CREATE' ? '사진 추가하기' : '사진 수정하기'} event={!title || !thumbnail} />
      </form>
    </div>
  )
}
