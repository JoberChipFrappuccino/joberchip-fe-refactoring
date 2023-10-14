import { StyleMap } from '@/constants/textEditorOptions'
import { Editor, EditorState } from 'draft-js'
import { useEffect } from 'react'
import FormButton from '../Ui/Button'
import styles from './TextEditor.module.scss'
import ToolBar from './ToolBar'
import './draft.css'

interface TextEditorProps {
  editorIsOpen: boolean
  setisButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>
  isButtonDisabled: boolean
  editorState: EditorState
  setEditorState: any
  objectId: string
}

export default function TextEditor(props: TextEditorProps) {
  const onChange = (editorState: EditorState) => {
    props.setEditorState(editorState)
    if (editorState.getCurrentContent().hasText()) {
      props.setEditorState(editorState)
      props.setisButtonDisabled(false)
    } else {
      props.setisButtonDisabled(true)
    }
  }

  useEffect(() => {
    props.editorState ? props.setEditorState(props.editorState) : props.setEditorState(EditorState.createEmpty())
  }, [props.objectId])

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
      {props.editorIsOpen && (
        <ToolBar editorState={props.editorState} setEditorState={props.setEditorState} toolWidth={58} />
      )}
      <div className={`${styles.editorContainer}  ${props.editorIsOpen ? styles.focused : ''}`}>
        <Editor
          editorState={props.editorState}
          onChange={onChange}
          placeholder="텍스트를 입력해주세요"
          customStyleMap={StyleMap}
          blockStyleFn={getBlockStyle}
        />
      </div>
      {props.editorIsOpen && <FormButton title={'텍스트 입력완료'} event={props.isButtonDisabled} />}
    </div>
  )
}
