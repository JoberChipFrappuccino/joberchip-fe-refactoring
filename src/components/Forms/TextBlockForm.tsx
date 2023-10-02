import { PARSE_ERROR_TEXT } from '@/constants/textEditorOptions'
import { useBlockAction } from '@/store/blockAction'
import { EditorState, convertFromRaw } from 'draft-js'
import { useEffect, useState } from 'react'
import { type BlockBaseWithBlockFormProps } from '../SwitchCase/DrawerEditForm'
import TextEditor from '../TextEditor/TextEditor'
import FormButton from '../Ui/Button'
import styles from './TextBlockForm.module.scss'

export function TextBlockForm({ block }: BlockBaseWithBlockFormProps<TText>) {
  const [editorIsOpen, setEditorIsOpen] = useState(false)
  const [editableBlock, setEditableBlock] = useState<EditorState>(EditorState.createEmpty())
  const { drawerMode, setOpenDrawer } = useBlockAction()
  const [isButtonDisabled, setisButtonDisabled] = useState(true)
  const [textValue] = useState(block?.description ?? '')

  useEffect(() => {
    if (drawerMode === 'create') {
      setEditableBlock(EditorState.createEmpty())
    } else {
      try {
        const descriptionJSON = JSON.parse(textValue)
        setEditableBlock(EditorState.createWithContent(convertFromRaw(descriptionJSON)))
      } catch (error) {
        console.error('JSON 파싱 중 오류가 발생했습니다:', error)
        setEditableBlock(EditorState.createWithContent(convertFromRaw(JSON.parse(PARSE_ERROR_TEXT))))
      }
    }
  }, [])

  const handleSubmit = () => {
    setOpenDrawer(false)
  }

  const handleEditorFocus = () => {
    setEditorIsOpen(true)
  }

  const handleEditorBlur = () => {
    setEditorIsOpen(false)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <span className={styles.label}>텍스트 첨부</span>
        <div
          className={`${styles.editorContainer} ${editorIsOpen ? styles.opened : ''}`}
          onFocus={handleEditorFocus}
          onBlur={handleEditorBlur}
        >
          <TextEditor
            editorIsOpen={editorIsOpen}
            editableBlock={editableBlock}
            setEditableBlock={setEditableBlock}
            setisButtonDisabled={setisButtonDisabled}
            isButtonDisabled={isButtonDisabled}
          />
        </div>
      </div>
      <FormButton title={drawerMode === 'create' ? '텍스트 추가하기' : '텍스트 수정하기'} event={isButtonDisabled} />
    </form>
  )
}
