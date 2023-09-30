import { useBlockAction } from '@/store/blockAction'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { TiDeleteOutline } from 'react-icons/ti'
import { type BlockBaseWithBlockFormProps } from '../SwitchCase/DrawerEditForm'
import FormButton from '../Ui/Button'
import styles from './LinkBlockForm.module.scss'

export function LinkBlockForm({ block }: BlockBaseWithBlockFormProps<TLink>) {
  const [link, setLink] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const isButtonDisabled = !link || !title
  const { drawerMode } = useBlockAction()

  const titleValue = block?.title ?? ''
  const linkValue = block?.src ?? ''

  useEffect(() => {
    setTitle(titleValue ?? '')
    setLink(linkValue ?? '')
  }, [titleValue, linkValue])

  const submitAddHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      text: title,
      url: link
    }
    // body에 data를 담아 post 전달 알림창으로 체크
    alert(JSON.stringify(body))
  }

  const submitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      text: title,
      url: link
    }
    // body에 data를 담아 post 전달 알림창으로 체크
    alert(JSON.stringify(body))
  }

  const onChangeLink = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const deleteTitle = () => {
    setTitle('')
  }

  const deleteLink = () => {
    setLink('')
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={drawerMode === 'create' ? submitAddHandler : submitEditHandler}>
        <div className={styles.forms}>
          <h3>URL 링크 주소 제목</h3>
          <div className={styles.inputbox}>
            <input type="text" value={title} onChange={onChangeTitle} placeholder="링크 제목을 입력해주세요." />
            {title && (
              <button type="button" className={styles.delTitle} onClick={deleteTitle}>
                <TiDeleteOutline />
              </button>
            )}
          </div>
          <h3 className={styles.formTexts}>URL 링크 주소 삽입</h3>
          <div className={styles.inputbox}>
            <input type="text" value={link} onChange={onChangeLink} placeholder="링크 주소를 입력해주세요." />
            {link && (
              <button type="button" className={styles.delLink} onClick={deleteLink}>
                <TiDeleteOutline />
              </button>
            )}
          </div>
        </div>
        <FormButton title={drawerMode === 'create' ? '링크 추가하기' : '링크 수정하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
