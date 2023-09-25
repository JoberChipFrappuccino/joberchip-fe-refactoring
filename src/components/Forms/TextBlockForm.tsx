import { useDrawerFormType } from '@/store/formMode'
import { useEffect, useState } from 'react'
import { type BlockBaseWithBlockFormProps } from '../SwitchCase/DrawerEditForm'
import TextEditor from '../TextEditor/TextEditor'
import FormButton from '../Ui/Button'
import styles from './TextBlockForm.module.scss'

export function TextBlockForm({ block }: BlockBaseWithBlockFormProps<TText>) {
  const [editorIsOpen, setEditorIsOpen] = useState(false)
  const [editableBlock, setEditableBlock] = useState('')
  const { drawerMode } = useDrawerFormType()
  const [isButtonDisabled, setisButtonDisabled] = useState(true)

  useEffect(() => {
    if (editableBlock.length > 0) {
      setisButtonDisabled(false)
    }
  })

  // 데이터 확인
  /* const handleClickSubmit = () => {
    console.log(JSON.stringify(editableBlock))
  } */

  const handleEditorFocus = () => {
    setEditorIsOpen(true)
  }

  const handleEditorBlur = () => {
    setEditorIsOpen(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <span className={styles.label}>텍스트 첨부</span>
        <div
          className={`${styles.editorContainer} ${editorIsOpen ? styles.opened : ''}`}
          onFocus={handleEditorFocus}
          onBlur={handleEditorBlur}
        >
          <TextEditor editorIsOpen={editorIsOpen} editableBlock={editableBlock} setEditableBlock={setEditableBlock} />
        </div>
      </div>
      <FormButton title={drawerMode === 'create' ? '텍스트 추가하기' : '텍스트 수정하기'} event={isButtonDisabled} />
      {/* <button onClick={handleClickSubmit}>추가</button> */}
    </div>
  )
}
