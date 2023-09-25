import { StyleMap } from '@/constants/textEditorOptions'
import classNames from 'classnames'
import { Editor, EditorState, convertFromRaw, type ContentBlock } from 'draft-js'
import { useEffect, useState } from 'react'
import { type BlockBaseWithBlockProps } from '../SwitchCase/ViewerBox'
import styles from './TextBlock.module.scss'
type Props = {
  block: BlockWith<'text'>
  mode: SpaceMode
}

const mock =
  '{"blocks":[{"key":"c3r5h","text":"자버칩푸라푸치노","type":"center","depth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"size24"},{"offset":0,"length":2,"style":"red"},{"offset":6,"length":2,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"5lp3j","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":2,"style":"STRIKETHROUGH"},{"offset":3,"length":5,"style":"font3"}],"entityRanges":[],"data":{}},{"key":"6sut3","text":"자버칩푸라푸치노","type":"right","depth":0,"inlineStyleRanges":[{"offset":0,"length":1,"style":"BOLD"},{"offset":1,"length":1,"style":"ITALIC"},{"offset":5,"length":1,"style":"size30"},{"offset":5,"length":1,"style":"greenBg"},{"offset":5,"length":1,"style":"white"}],"entityRanges":[],"data":{}},{"key":"d0c5c","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cg06b","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"bipql","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"orange"}],"entityRanges":[],"data":{}},{"key":"3rgkh","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"purple"}],"entityRanges":[],"data":{}},{"key":"f58pm","text":"자버칩푸라푸치노","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"blue"}],"entityRanges":[],"data":{}}],"entityMap":{}}'

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
    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(mock))))
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
