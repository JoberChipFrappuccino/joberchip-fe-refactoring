import { addTextBlockAPI, editTextBlockAPI } from '@/api/textblock'
import { PARSE_ERROR_TEXT } from '@/constants/textEditorOptions'
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import { getNextYOfLastBlock } from '@/utils/api'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { useEffect, useState } from 'react'
import { checkValidation } from '../Blocks/TextBlock'
import { type BlockBaseWithBlockFormProps } from '../SwitchCase/DrawerEditForm'
import TextEditor from '../TextEditor/TextEditor'
import FormButton from '../Ui/Button'
import styles from './TextBlockForm.module.scss'

export function TextBlockForm({ block }: BlockBaseWithBlockFormProps<TText>) {
  const [editorIsOpen, setEditorIsOpen] = useState(false)
  const { drawerMode, setOpenDrawer } = useBlockAction()
  const [isButtonDisabled, setisButtonDisabled] = useState(true)
  const [textValue, setTextValue] = useState(block?.src ?? '')
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const { sharePage, setSharePage } = useSharePageStore()

  useEffect(() => {
    setTextValue(block?.src ?? '')
  }, [block?.objectId])

  useEffect(() => {
    if (drawerMode === 'create') {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const pageId = sharePage.pageId
    const editortext = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    try {
      if (drawerMode === 'create') {
        const textblock = {
          content: editortext,
          x: 0,
          y: getNextYOfLastBlock(sharePage.children),
          w: 1,
          h: 1
        }
        const { data: responseData } = await addTextBlockAPI(pageId, textblock)
        const updatedSharePage = {
          ...sharePage,
          children: [...sharePage.children, { ...responseData }]
        }
        setSharePage(updatedSharePage)
        setOpenDrawer(false)
      } else if (drawerMode === 'edit') {
        const blockId = block?.objectId ?? ''
        const textblock = {
          content: editortext
        }
        const { data: responseData } = await editTextBlockAPI(pageId, blockId, textblock)
        const existingBlockIndex = sharePage.children.findIndex((block) => block.objectId === responseData.objectId)
        const updatedChildren = [...sharePage.children]
        if (existingBlockIndex !== -1) {
          updatedChildren[existingBlockIndex] = responseData
        } else {
          updatedChildren.push(responseData)
        }
        const updatedSharePage = {
          ...sharePage,
          children: updatedChildren
        }
        setSharePage(updatedSharePage)
        setOpenDrawer(false)
      }
    } catch (error) {
      console.error(error)
    }
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
      <FormButton title={drawerMode === 'create' ? '텍스트 추가하기' : '텍스트 수정하기'} event={isButtonDisabled} />
    </form>
  )
}
