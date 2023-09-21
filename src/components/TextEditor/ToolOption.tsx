import {
  ALIGN_OPTIONS,
  FONT_OPTIONS,
  SIZE_OPTIONS,
  TEXT_BGCOLORS_OPTIONS,
  TEXT_COLORS_OPTIONS
} from '@/constants/textEditorOptions'
import { type EditorState } from 'draft-js'
import styles from './ToolOption.module.scss'

export type Toggles = {
  [font1: string]: boolean
  font2: boolean
  font3: boolean
  red: boolean
}

export default function ToolOption({
  type,
  handle,
  editorState,
  blockButton,
  toggleButton,
  setToggleButton,
  activeSize,
  setActiveSize
}: {
  type: string
  handle: (e: React.MouseEvent, value: string) => void
  editorState: EditorState
  blockButton: string
  toggleButton: Record<string, boolean>
  setToggleButton: Record<string, boolean>
  activeSize: stirng
  setActiveSize: string
}) {
  const handleSizeClick = (e, selectedSize) => {
    e.preventDefault()

    const newSizeToggleState = { ...toggleButton }
    SIZE_OPTIONS.forEach((size) => {
      newSizeToggleState[size] = size === selectedSize
    })

    setToggleButton({
      ...toggleButton,
      [selectedSize]: true,
      [activeSize]: false
    })

    setActiveSize(selectedSize)
    handle(e, selectedSize)
  }

  return (
    <div className={styles.container}>
      {type === 'size-options' && (
        <>
          <span className={styles.label}>글자크기</span>
          <div className={styles.optionContainer}>
            {SIZE_OPTIONS.map((size, index) => (
              <div
                key={index}
                className={`${styles.option} ${toggleButton[size] ? styles.optionActive : styles.optionnonActive}`}
                onMouseDown={(e) => {
                  // handle(e, `${size}`)
                  handleSizeClick(e, size)
                }}
              >
                {size.slice(4)}
              </div>
            ))}
          </div>
        </>
      )}
      {type === 'color-options' && (
        <>
          <span className={styles.label}>글자색</span>
          <div className={styles.optionContainer}>
            {TEXT_COLORS_OPTIONS.map((colors, index) => (
              <div
                key={index}
                className={`${styles.textOptions} ${colors.className} ${
                  toggleButton[colors.style] ? styles.colorOptionActive : ''
                }`}
                onMouseDown={(e) => {
                  handle(e, colors.style)
                }}
              >
                가
              </div>
            ))}
          </div>
          <span className={styles.label}>글자 배경색</span>
          <div className={styles.optionContainer}>
            {TEXT_BGCOLORS_OPTIONS.map((bg, index) => (
              <div
                key={index}
                className={`${styles.bgOptions} ${toggleButton[bg.style] ? styles.colorOptionActive : ''}`}
                onMouseDown={(e) => {
                  handle(e, bg.style)
                }}
              >
                <div className={`${styles.innerrect} ${bg.className}`}>가</div>
              </div>
            ))}
          </div>
        </>
      )}
      {type === 'font-options' && (
        <div className={`${styles.optionContainer} ${styles.fontContainer} `}>
          {FONT_OPTIONS.map((font, index) => (
            <div
              key={index}
              onMouseDown={(e) => {
                handle(e, font.style)
              }}
              className={`${toggleButton[font.style] ? styles.optionActive : ''}`}
            >
              {font.label}
            </div>
          ))}
        </div>
      )}
      {type === 'align-options' && (
        <div className={styles.optionContainer}>
          {ALIGN_OPTIONS.map((align, index) => (
            <div
              key={index}
              onMouseDown={(e) => {
                handle(e, align.style)
              }}
              className={blockButton && align.style === blockButton ? styles.optionActive : ''}
            >
              {align.style}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
