import { StyleMap } from '@/constants/textEditorOptions'
import { Editor, EditorState } from 'draft-js'
import { useEffect, useState } from 'react'
import FormButton from '../Ui/Button'
import styles from './TextEditor.module.scss'
import ToolBar from './ToolBar'
import './draft.css'

export default function TextEditor({
  editorIsOpen,
  editableBlock,
  setEditableBlock,
  setisButtonDisabled,
  isButtonDisabled
}: {
  editorIsOpen: boolean
  editableBlock: any
  setEditableBlock: any
  setisButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>
  isButtonDisabled: boolean
}) {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
    if (editorState.getCurrentContent().hasText()) {
      setEditableBlock(editorState)
      setisButtonDisabled(false)
    } else {
      setisButtonDisabled(true)
    }
  }

  useEffect(() => {
    editableBlock ? setEditorState(editableBlock) : setEditorState(EditorState.createEmpty())
  }, [editableBlock])

  const getBlockStyle = (block: any): string => {
    switch (block.getType()) {
      case 'left':
        return styles.alignLeft
      case 'center':
        return styles.alignCenter
      case 'right':
        return styles.alignRight
      default:
        return 'unstyled'
    }
  }

  return (
    <div className={styles.container}>
      {editorIsOpen && <ToolBar editorState={editorState} setEditorState={setEditorState} toolWidth={58} />}
      <div className={`${styles.editorContainer}  ${editorIsOpen ? styles.focused : ''}`}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder="텍스트를 입력해주세요"
          customStyleMap={StyleMap}
          blockStyleFn={getBlockStyle}
        />
      </div>
      {editorIsOpen && <FormButton title={'텍스트 입력완료'} event={isButtonDisabled} />}
    </div>
  )
}
