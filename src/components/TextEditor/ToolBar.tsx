import {
  FONT_OPTIONS,
  SIZE_OPTIONS,
  TEXT_BGCOLORS_OPTIONS,
  TEXT_COLORS_OPTIONS,
  TOOL_TYPES,
  optionStyleMaps
} from '@/constants/textEditorOptions'
import { EditorState, Modifier, RichUtils, type ContentState, type DraftInlineStyle } from 'draft-js'
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
  const [selectedOption, setselectedOption] = useState('')

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    if (offset > 0) {
      setOffset(0)
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    setOffset(toolWidth * 5)
  }

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

  const handleOptionType = (e: React.MouseEvent, type: string, label: string) => {
    e.preventDefault()
    if (type === optionType) {
      setOptionType('')
    } else {
      setOptionType(type)
      setselectedOption(label)
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

  const toggleSubOption = (selectedStyle: string, style: string) => {
    const selection = editorState.getSelection()
    const currentContent = editorState.getCurrentContent()

    let nextContentState: ContentState = currentContent

    if (
      selectedOption === style ||
      selectedOption === 'color' ||
      (selectedOption === 'textcolor' && style === 'bgcolor') ||
      (selectedOption === 'bgcolor' && style === 'textcolor')
    ) {
      if (style in optionStyleMaps) {
        const styleMap = optionStyleMaps[style as keyof typeof optionStyleMaps]
        nextContentState = Object.keys(styleMap).reduce((contentState, color) => {
          return Modifier.removeInlineStyle(contentState, selection, color)
        }, currentContent)
      }

      let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style')
      const currentStyle = editorState.getCurrentInlineStyle()

      if (selection.isCollapsed()) {
        nextEditorState = currentStyle.reduce((state, color) => {
          return RichUtils.toggleInlineStyle(state as EditorState, color as string)
        }, nextEditorState)
      }

      if (!currentStyle.has(selectedStyle)) {
        nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, selectedStyle)
      }

      setEditorState(nextEditorState)
    } else {
      setEditorState(RichUtils.toggleInlineStyle(editorState, selectedStyle))
    }
    setselectedOption(style)
  }

  const handleOptionToggle = (e: React.MouseEvent, selectedStyle: string, style: string) => {
    e.preventDefault()
    toggleSubOption(selectedStyle, style)
  }
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
          className={`${styles.slideButtons} ${styles.nextButton} ${offset < 290 ? styles.show : styles.hidden}`}
          onMouseDown={handleNext}
        />
      </div>
      {optionType && (
        <ToolOption
          type={optionType}
          toggleButton={toggleButton}
          blockButton={blockButton}
          handleOptionToggle={handleOptionToggle}
          handle={optionType === 'align-options' ? handleBlockClick : handleTogggleClick}
        />
      )}
    </>
  )
}

export default ToolBar
