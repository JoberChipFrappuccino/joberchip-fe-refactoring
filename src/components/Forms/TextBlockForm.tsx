import { useBlockAction } from '@/store/blockAction'
import { EditorState, convertFromRaw } from 'draft-js'
import { useEffect, useState } from 'react'
import { type BlockBaseWithBlockFormProps } from '../SwitchCase/DrawerEditForm'
import TextEditor from '../TextEditor/TextEditor'
import FormButton from '../Ui/Button'
import styles from './TextBlockForm.module.scss'

const mock =
  '{"blocks":[{"key":"c3r5h","text":"자버칩푸라푸치노","type":"center","depth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"size24"},{"offset":0,"length":2,"style":"red"},{"offset":6,"length":2,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"5lp3j","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":2,"style":"STRIKETHROUGH"},{"offset":3,"length":5,"style":"font3"}],"entityRanges":[],"data":{}},{"key":"6sut3","text":"자버칩푸라푸치노","type":"right","depth":0,"inlineStyleRanges":[{"offset":0,"length":1,"style":"BOLD"},{"offset":1,"length":1,"style":"ITALIC"},{"offset":5,"length":1,"style":"size30"},{"offset":5,"length":1,"style":"greenBg"},{"offset":5,"length":1,"style":"white"}],"entityRanges":[],"data":{}},{"key":"d0c5c","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cg06b","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"bipql","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"orange"}],"entityRanges":[],"data":{}},{"key":"3rgkh","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"purple"}],"entityRanges":[],"data":{}},{"key":"f58pm","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"blue"}],"entityRanges":[],"data":{}}],"entityMap":{}}'

export function TextBlockForm({ block }: BlockBaseWithBlockFormProps<TText>) {
  const [editorIsOpen, setEditorIsOpen] = useState(false)
  const [editableBlock, setEditableBlock] = useState<EditorState>(EditorState.createEmpty())
  const { drawerMode, setOpenDrawer } = useBlockAction()
  const [isButtonDisabled, setisButtonDisabled] = useState(true)

  useEffect(() => {
    if (drawerMode === 'create') {
      setEditableBlock(EditorState.createEmpty())
    } else {
      setEditableBlock(EditorState.createWithContent(convertFromRaw(JSON.parse(block.text))))
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
