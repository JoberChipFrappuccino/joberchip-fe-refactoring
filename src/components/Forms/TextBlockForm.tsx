import 'draft-js/dist/Draft.css'
import { useState } from 'react'
import { type BlockBaseWithBlockFormProps } from '../SwitchCase/DrawerEditForm'
import TextEditor from '../TextEditor/TextEditor'
import FormButton from '../Ui/Button'
import styles from './TextBlockForm.module.scss'

export function TextBlockForm({ block }: BlockBaseWithBlockFormProps<TText>) {
  const [editorIsOpen, setEditorIsOpen] = useState(false)
  const [editableBlock, setEditableBlock] = useState(undefined)
  const isButtonDisabled = true

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
      <FormButton title={editableBlock ? '텍스트 수정하기' : '텍스트 추가하기'} event={isButtonDisabled} />
    </div>
  )
}
