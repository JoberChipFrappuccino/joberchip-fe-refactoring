import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { useCallback, useEffect, useState } from 'react'
import TextEditor from '@/components/Common/TextEditor/TextEditor'
import FormButton from '@/components/Common/Ui/Button'
import { checkValidation } from '@/components/SharePage/Blocks/TextBlock/TextBlock'
import { PARSE_ERROR_TEXT } from '@/constants/textEditorOptions'
import { useBlockActionStore } from '@/store/blockAction'
import styles from './TextBlockForm.module.scss'

type TextBlockFormProps = BlockBaseWithBlockFormProps<TText> & {
  onSubmit: (content: string) => void
}
export function TextBlockForm({ block, onSubmit }: TextBlockFormProps) {
  const { drawerMode } = useBlockActionStore()
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [editorIsOpen, setEditorIsOpen] = useState(false)
  const [isButtonDisabled, setisButtonDisabled] = useState(true)
  const [textValue, setTextValue] = useState(block?.src ?? '')

  useEffect(() => {
    setTextValue(block?.src ?? '')
  }, [block?.objectId])

  useEffect(() => {
    if (drawerMode === 'CREATE') {
      setEditorState(EditorState.createEmpty())
    } else {
      try {
        const descriptionJSON = JSON.parse(checkValidation(textValue, '“', '”'))
        setEditorState(EditorState.createWithContent(convertFromRaw(descriptionJSON)))
      } catch (error) {
        console.error('JSON 파싱 중 오류가 발생했습니다:', error)
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(PARSE_ERROR_TEXT))))
      }
    }
  }, [textValue])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const editortext = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    onSubmit(editortext)
  }

  const handleEditorFocus = useCallback(() => {
    setEditorIsOpen(true)
  }, [])

  const handleEditorBlur = useCallback(() => {
    setEditorIsOpen(false)
  }, [])

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <h3>텍스트 첨부</h3>
        <div
          className={`${styles.editorContainer} ${editorIsOpen ? styles.opened : ''}`}
          onFocus={handleEditorFocus}
          onBlur={handleEditorBlur}
        >
          <TextEditor
            editorIsOpen={editorIsOpen}
            setisButtonDisabled={setisButtonDisabled}
            isButtonDisabled={isButtonDisabled}
            editorState={editorState}
            setEditorState={setEditorState}
            objectId={block?.objectId ?? ''}
          />
        </div>
      </div>
      <FormButton title={drawerMode === 'CREATE' ? '텍스트 추가하기' : '텍스트 수정하기'} disabled={isButtonDisabled} />
    </form>
  )
}
