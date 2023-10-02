import { PARSE_ERROR_TEXT, StyleMap } from '@/constants/textEditorOptions'
import classNames from 'classnames'
import { Editor, EditorState, convertFromRaw, type ContentBlock } from 'draft-js'
import { useEffect, useState } from 'react'
import { type BlockBaseWithBlockProps } from '../SwitchCase/ViewerBox'
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
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    try {
      const descriptionJSON = JSON.parse(block.description)
      setEditorState(EditorState.createWithContent(convertFromRaw(descriptionJSON)))
    } catch (error) {
      console.error('JSON 파싱 중 오류가 발생했습니다:', error)
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(PARSE_ERROR_TEXT))))
    }
  }, [])

  const onchange = () => {
    setEditorState(editorState)
  }

  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'edit' && 'cover')} />
      <div className={styles.editorContainer}>
        <Editor
          editorState={editorState}
          readOnly={true}
          onChange={onchange}
          customStyleMap={StyleMap}
          blockStyleFn={blockStyleFn}
        />
      </div>
    </div>
  )
}
