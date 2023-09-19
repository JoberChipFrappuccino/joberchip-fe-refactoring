import { StyleMap, TOOL_TYPES } from '@/constants/textEditorOptions'
import { Editor, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { useEffect, useState } from 'react'
import FormButton from '../Ui/Button'
import styles from './TextEditor.module.scss'
import ToolOption from './ToolOption'

export default function TextEditor({
  editorIsOpen,
  editableBlock,
  setEditableBlock
}: {
  editorIsOpen: boolean
  editableBlock: any
  setEditableBlock: any
}) {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [currentToolbar, setCurrentToolbar] = useState(0)
  const [optionType, setOptionType] = useState('')
  const isButtonDisabled = true

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  useEffect(() => {
    // editableBlock ? setEditorState('수정') : setEditorState(EditorState.createEmpty())
  }, [editableBlock])

  const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault()
    if (inlineStyle === null) return
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const handleBlockClick = (e: React.MouseEvent, blockType: string) => {
    e.preventDefault()
    if (blockType === null) return
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
  }

  const handleOptionType = (e: React.MouseEvent, type: string) => {
    e.preventDefault()
    if (type === optionType) {
      setOptionType('')
    } else {
      setOptionType(type)
    }
  }

  const nextToolbar = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentToolbar < TOOL_TYPES.length - 1) {
      setCurrentToolbar(currentToolbar + 1)
    }
  }

  const prevToolbar = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentToolbar > 0) {
      setCurrentToolbar(currentToolbar - 1)
    }
  }

  const isPrevButtonVisible = currentToolbar > 0
  const isNextButtonVisible = currentToolbar < TOOL_TYPES.length - 1

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
      {editorIsOpen && (
        <div className={styles.toolbar}>
          <div>{isPrevButtonVisible && <button className={styles.prevButton} onMouseDown={prevToolbar} />}</div>
          <div className={styles.toolsWrap}>
            {TOOL_TYPES[currentToolbar].tools.map((tool, index) => (
              <div
                key={index}
                className={styles.toolButton}
                onMouseDown={(e) => {
                  if (tool.type === 'block') {
                    handleBlockClick(e, tool.action)
                  } else if (tool.type === 'inline') {
                    handleTogggleClick(e, tool.action)
                  } else {
                    if (tool.option) {
                      handleOptionType(e, tool.option)
                    }
                  }
                }}
              >
                {tool.icon ? <img src={`/EditorIcons/${tool.icon}`} /> : <span>{tool.text}</span>}
              </div>
            ))}
          </div>
          <div>{isNextButtonVisible && <button className={styles.nextButton} onMouseDown={nextToolbar} />}</div>
        </div>
      )}
      {optionType && (
        <ToolOption type={optionType} handle={optionType === 'align-options' ? handleBlockClick : handleTogggleClick} />
      )}

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
