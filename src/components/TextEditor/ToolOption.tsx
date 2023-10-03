import {
  ALIGN_OPTIONS,
  FONT_OPTIONS,
  SIZE_OPTIONS,
  TEXT_BGCOLORS_OPTIONS,
  TEXT_COLORS_OPTIONS
} from '@/constants/textEditorOptions'
import styles from './ToolOption.module.scss'

interface ToolOptionProps {
  type: string
  handle: (e: React.MouseEvent, value: string) => void
  blockButton: string
  toggleButton: Record<string, boolean>
  handleOptionToggle: (e: React.MouseEvent, value: string, type: string) => void
}

export default function ToolOption(props: ToolOptionProps) {
  return (
    <div className={styles.container}>
      {props.type === 'font-options' && (
        <>
          <span className={styles.label}>글자서체</span>
          <div className={`${styles.optionContainer} ${styles.fontContainer} `}>
            {FONT_OPTIONS.map((font, index) => (
              <div
                key={index}
                onMouseDown={(e) => {
                  props.handleOptionToggle(e, font.style, 'font')
                }}
                className={`${styles.fontOption} ${props.toggleButton[font.style] ? styles.optionActive : ''}`}
              >
                {font.label}
              </div>
            ))}
          </div>
        </>
      )}
      {props.type === 'size-options' && (
        <>
          <span className={styles.label}>글자크기</span>
          <div className={`${styles.optionContainer} ${styles.sizeContainer}`}>
            {SIZE_OPTIONS.map((size, index) => (
              <div
                key={index}
                className={`${styles.sizeOption} ${props.toggleButton[size] ? styles.optionActive : ''}`}
                onMouseDown={(e) => {
                  props.handleOptionToggle(e, size, 'size')
                }}
              >
                {size.slice(4)}
              </div>
            ))}
          </div>
        </>
      )}
      {props.type === 'color-options' && (
        <>
          <span className={styles.label}>글자색</span>
          <div className={`${styles.optionContainer} ${styles.colorWrap}`}>
            {TEXT_COLORS_OPTIONS.map((colors, index) => (
              <div
                key={index}
                className={`${styles.textOptions} ${colors.className} ${
                  props.toggleButton[colors.style] ? styles.colorOptionActive : ''
                }`}
                onMouseDown={(e) => {
                  props.handleOptionToggle(e, colors.style, 'textcolor')
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
                className={`${styles.bgOptions} ${props.toggleButton[bg.style] ? styles.colorOptionActive : ''}`}
                onMouseDown={(e) => {
                  props.handleOptionToggle(e, bg.style, 'bgcolor')
                }}
              >
                <div className={`${styles.innerrect} ${bg.className}`}>가</div>
              </div>
            ))}
          </div>
        </>
      )}
      {props.type === 'align-options' && (
        <>
          <span className={styles.label}>글자정렬</span>
          <div className={styles.optionContainer}>
            {ALIGN_OPTIONS.map((align, index) => (
              <div
                key={index}
                onMouseDown={(e) => {
                  props.handle(e, align.style)
                }}
                className={props.blockButton && align.style === props.blockButton ? styles.optionActive : ''}
              >
                {align.text}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
