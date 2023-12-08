import classNames from 'classnames'
import { Editor, EditorState, convertFromRaw, type ContentBlock } from 'draft-js'
import { type BlockBaseWithBlockProps } from '@/components/Common/SwitchCases/ViewerBox'
import { StyleMap } from '@/constants/textEditorOptions'
import styles from './TextBlock.module.scss'

function blockStyleFn(contentBlock: ContentBlock) {
  const type = contentBlock.getType()

  if (type === 'center') {
    return styles.alignCenter
  } else if (type === 'right') {
    return styles.alignRight
  } else if (type === 'left') {
    return styles.alignLeft
  }
  return styles.alignLeft
}

export function TextBlock({ block, mode }: BlockBaseWithBlockProps<TText>) {
  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'EDIT' && 'cover')} />
      <div className={styles.editorBoxr}>
        <div className={styles.editorContainer}>
          <Editor
            editorState={
              block.src
                ? EditorState.createWithContent(convertFromRaw(JSON.parse(block.src)))
                : EditorState.createEmpty()
            }
            readOnly={true}
            onChange={() => {}}
            customStyleMap={StyleMap}
            blockStyleFn={blockStyleFn}
          />
        </div>
      </div>
    </div>
  )
}

export function checkValidation(text: string, ...validator: string[]) {
  let newText = text
  let isChaged = false
  for (let i = 0; i < validator.length; i++) {
    if (!text.includes(validator[i])) continue
    newText = newText.split(validator[i]).join('"')
    isChaged = true
  }
  if (!isChaged) return text
  return newText.slice(1, newText.length - 1)
}
