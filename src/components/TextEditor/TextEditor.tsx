import { Editor, EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { useState } from 'react'
import FormButton from '../Ui/Button'
import styles from './TextEditor.module.scss'

export default function TextEditor({ editorIsOpen }: { editorIsOpen: boolean }) {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [isFocused, setIsFocused] = useState(false)
  const isButtonDisabled = true

  const handleFocusEditor = () => {
    setIsFocused(true)
  }

  const handleBlurEditor = () => {
    setIsFocused(false)
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.editorContainer}  ${isFocused ? styles.focused : ''}`}
        onFocus={handleFocusEditor}
        onBlur={handleBlurEditor}
      >
        <Editor editorState={editorState} onChange={setEditorState} placeholder="텍스트를 입력해주세요" />
      </div>
      {editorIsOpen && <FormButton title={'텍스트 입력완료'} event={isButtonDisabled} />}
    </div>
  )
}
