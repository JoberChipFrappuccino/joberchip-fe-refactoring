import {
  ALIGN_OPTIONS,
  FONT_OPTIONS,
  SIZE_OPTIONS,
  TEXT_BGCOLORS_OPTIONS,
  TEXT_COLORS_OPTIONS
} from '@/constants/textEditorOptions'
import styles from './ToolOption.module.scss'

export default function ToolOption({
  type,
  handle,
  blockButton,
  toggleButton,
  handleOptionToggle
}: {
  type: string
  handle: (e: React.MouseEvent, value: string) => void
  blockButton: string
  toggleButton: Record<string, boolean>
  handleOptionToggle: (e: React.MouseEvent, value: string, type: string) => void
}) {
  return (
    <div className={styles.container}>
      {type === 'font-options' && (
        <>
          <span className={styles.label}>글자서체</span>
          <div className={`${styles.optionContainer} ${styles.fontContainer} `}>
            {FONT_OPTIONS.map((font, index) => (
              <div
                key={index}
                onMouseDown={(e) => {
                  handleOptionToggle(e, font.style, 'font')
                }}
                className={`${toggleButton[font.style] ? styles.optionActive : ''}`}
              >
                {font.label}
              </div>
            ))}
          </div>
        </>
      )}
      {type === 'size-options' && (
        <>
          <span className={styles.label}>글자크기</span>
          <div className={`${styles.optionContainer} ${styles.sizeContainer}`}>
            {SIZE_OPTIONS.map((size, index) => (
              <div
                key={index}
                className={`${styles.sizeOption} ${toggleButton[size] ? styles.optionActive : styles.optionDisable}`}
                onMouseDown={(e) => {
                  handleOptionToggle(e, size, 'size')
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
          <div className={`${styles.optionContainer} ${styles.colorWrap}`}>
            {TEXT_COLORS_OPTIONS.map((colors, index) => (
              <div
                key={index}
                className={`${styles.textOptions} ${colors.className} ${
                  toggleButton[colors.style] ? styles.colorOptionActive : ''
                }`}
                onMouseDown={(e) => {
                  handleOptionToggle(e, colors.style, 'textcolor')
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
                  handleOptionToggle(e, bg.style, 'bgcolor')
                }}
              >
                <div className={`${styles.innerrect} ${bg.className}`}>가</div>
              </div>
            ))}
          </div>
        </>
      )}
      {type === 'align-options' && (
        <>
          <span className={styles.label}>글자정렬</span>
          <div className={`${styles.optionContainer} ${styles.alignContainer} `}>
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
        </>
      )}
    </div>
  )
}
