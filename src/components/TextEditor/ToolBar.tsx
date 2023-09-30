import {
  FONT_OPTIONS,
  SIZE_OPTIONS,
  TEXT_BGCOLORS_OPTIONS,
  TEXT_COLORS_OPTIONS,
  TOOL_TYPES
} from '@/constants/textEditorOptions'
import { RichUtils, type DraftInlineStyle, type EditorState } from 'draft-js'
import React, { useEffect, useState } from 'react'
import styles from './ToolBar.module.scss'
import ToolButton from './ToolButton'
import ToolOption from './ToolOption'

interface ToolbarProps {
  toolWidth: number
  editorState: EditorState
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>
}

const ToolBar: React.FC<ToolbarProps> = ({ toolWidth, editorState, setEditorState }) => {
  const [optionType, setOptionType] = useState('')
  const [blockButton, setBlockButton] = useState('')
  const [toggleButton, setToggleButton] = useState<Record<string, boolean>>({})
  const [offset, setOffset] = useState(0)

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    if (offset > 0) {
      setOffset(0)
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    setOffset(toolWidth * 4)

    // if (offset < (tools.length - 1) * toolWidth) {
    //   // setOffset(offset + toolWidth + 46);
    //   setOffset(46 * 4)
    // }
  }

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
    <>
      <div className={styles.toolbar}>
        <div
          className={`${styles.slideButtons} ${styles.prevButton} ${offset > 0 ? styles.show : styles.hidden}`}
          onMouseDown={handlePrev}
        />
        <div className={styles.toolSlider}>
          <div
            className={styles.toolList}
            style={{
              transform: `translateX(-${offset}px)`,
              width: `${TOOL_TYPES.length * toolWidth}px`
            }}
          >
            {TOOL_TYPES.map((tool, index) => (
              <ToolButton
                key={index}
                tool={tool}
                optionType={optionType}
                blockButton={blockButton}
                toggleButton={toggleButton}
                handleBlockClick={handleBlockClick}
                handleTogggleClick={handleTogggleClick}
                handleOptionType={handleOptionType}
              />
            ))}
          </div>
        </div>
        <div
          className={`${styles.slideButtons} ${styles.nextButton} ${offset < 232 ? styles.show : styles.hidden}`}
          onMouseDown={handleNext}
        />
      </div>
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
    </>
  )
}

export default ToolBar
