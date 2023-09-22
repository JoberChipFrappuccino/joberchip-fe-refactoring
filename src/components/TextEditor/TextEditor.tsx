import {
  FONT_OPTIONS,
  SIZE_OPTIONS,
  StyleMap,
  TEXT_BGCOLORS_OPTIONS,
  TEXT_COLORS_OPTIONS,
  TOOL_TYPES
} from '@/constants/textEditorOptions'
import { Editor, EditorState, RichUtils, convertToRaw, type DraftInlineStyle } from 'draft-js'
import { useEffect, useState } from 'react'
import FormButton from '../Ui/Button'
import styles from './TextEditor.module.scss'
import ToolOption from './ToolOption'
import './draft.css'

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
  const [isButtonDisabled, setisButtonDisabled] = useState(true)
  const [blockButton, setBlockButton] = useState('')
  const [toggleButton, setToggleButton] = useState<Record<string, boolean>>({})
  // const [activeSize, setActiveSize] = useState('')

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
    const content = editorState.getCurrentContent()

    const data = JSON.stringify(convertToRaw(content))

    const plainText = content.getPlainText()
    if (plainText.length > 0) {
      setisButtonDisabled(false)
      setEditableBlock(data)
    } else {
      setisButtonDisabled(true)
    }
  }

  useEffect(() => {
    // editableBlock ? setEditorState('수정') : setEditorState(EditorState.createEmpty())
  }, [editableBlock])

  const handleTogggleClick = (e: React.MouseEvent, inlineStyle: string) => {
    e.preventDefault()
    if (inlineStyle === null) return
    // 토글 중복 활성화 수정중
    // if (inlineStyle.includes('size')) {
    //   setActiveSize(inlineStyle)
    // }
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

  const createInlineStyleToggle = (inlineStyles: DraftInlineStyle, options: any[]) => {
    const toggleState: Record<string, boolean> = {}
    options.forEach((option) => {
      if (options === SIZE_OPTIONS) {
        toggleState[option] = inlineStyles.has(option)
      } else {
        toggleState[option.style] = inlineStyles.has(option.style)
      }
    })

    return toggleState
  }
  useEffect(() => {
    const inlineStyle = editorState.getCurrentInlineStyle()

    const BOLD = inlineStyle.has('BOLD')
    const ITALIC = inlineStyle.has('ITALIC')
    const UNDERLINE = inlineStyle.has('UNDERLINE')
    const STRIKETHROUGH = inlineStyle.has('STRIKETHROUGH')
    const fontToggleState = createInlineStyleToggle(inlineStyle, FONT_OPTIONS)
    const sizeToggleState = createInlineStyleToggle(inlineStyle, SIZE_OPTIONS)
    const textColorToggleState = createInlineStyleToggle(inlineStyle, TEXT_COLORS_OPTIONS)
    const textBgColorToggleState = createInlineStyleToggle(inlineStyle, TEXT_BGCOLORS_OPTIONS)

    setToggleButton({
      BOLD,
      ITALIC,
      UNDERLINE,
      STRIKETHROUGH,
      ...fontToggleState,
      ...sizeToggleState,
      ...textColorToggleState,
      ...textBgColorToggleState
    })

    const currentSelection = editorState.getSelection()
    const currentKey = currentSelection.getStartKey()
    const currentBlock = editorState.getCurrentContent().getBlockForKey(currentKey)

    setBlockButton(currentBlock.getType())
  }, [editorState])

  return (
    <div className={styles.container}>
      {editorIsOpen && (
        <div className={styles.toolbar}>
          <div>{isPrevButtonVisible && <button className={styles.prevButton} onMouseDown={prevToolbar} />}</div>
          <div className={styles.toolsWrap}>
            {TOOL_TYPES[currentToolbar].tools.map((tool, index) => (
              <div
                key={index}
                className={`${styles.toolButton} ${
                  tool.action === blockButton || toggleButton[tool.action] ? styles.toolActive : ''
                } ${tool.option === optionType && styles.toolOptionActive} `}
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
        <ToolOption
          type={optionType}
          toggleButton={toggleButton}
          blockButton={blockButton}
          // editorState={editorState}
          // setToggleButton={setToggleButton}
          // activeSize={activeSize}
          // setActiveSize={setActiveSize}
          handle={optionType === 'align-options' ? handleBlockClick : handleTogggleClick}
        />
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
