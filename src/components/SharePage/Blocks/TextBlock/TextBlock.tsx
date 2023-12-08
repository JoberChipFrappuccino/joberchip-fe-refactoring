import classNames from 'classnames'
import { Editor, EditorState, convertFromRaw, type ContentBlock, type RawDraftContentState } from 'draft-js'
import { useEffect, useState } from 'react'
import { type BlockBaseWithBlockProps } from '@/components/Common/SwitchCases/ViewerBox'
import { SEO } from '@/constants'
import { StyleMap } from '@/constants/textEditorOptions'
import useServerSideProps from '@/hooks/serverSideProps'
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
  const { isServerSide } = useServerSideProps(SEO)
  const [source, setSource] = useState<unknown>('')

  // * Draft.js에서 componentDidMount시 blokc.src의 불변성이 유지되지 않으면 에러가 발생하기 떄문애, serverSide에서 렌더링하지 않습니다.
  useEffect(() => {
    if (isServerSide || !block.src) return
    setSource(JSON.parse(block.src))
  }, [block.src])

  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'EDIT' && 'cover')} />
      <div className={styles.editorBoxr}>
        <div className={styles.editorContainer}>
          <Editor
            editorState={
              source
                ? EditorState.createWithContent(convertFromRaw(source as RawDraftContentState))
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
