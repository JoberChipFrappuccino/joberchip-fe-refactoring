import { SIZE_OPTIONS, TEXT_BGCOLORS_OPTIONS, TEXT_COLORS_OPTIONS } from '@/constants/textEditorOptions'
import styles from './ToolOption.module.scss'
export default function ToolOption({
  type,
  handle
}: {
  type: string
  handle: (e: React.MouseEvent, value: string) => void
}) {
  return (
    <div className={styles.container}>
      {type === 'size-options' && (
        <>
          <span className={styles.label}>글자크기</span>
          <div className={styles.optionContainer}>
            {SIZE_OPTIONS.map((size, index) => (
              <div
                key={index}
                className={styles.option}
                onMouseDown={(e) => {
                  handle(e, `size${size}`)
                }}
              >
                {size}
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
                className={`${styles.textOptions} ${colors.className}`}
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
                className={styles.bgOptions}
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
    </div>
  )
}
