import type { BlockType } from '@/models/block'
import classNames from 'classnames'
import { useMemo, type ReactNode } from 'react'
import { BiCaretRightSquare, BiImageAlt, BiLink, BiMapAlt, BiPencil } from '@/components/SharePage/icons'
import { BLOCK_TO, IMAGE, LINK, MAP, TEXT, VIDEO } from '@/constants/block'
import { useBlockActionStore } from '@/store/blockAction'
import styles from './BlockFormBase.module.scss'

interface FormType {
  title: string
  type: BlockType
  icon: ReactNode
}
interface Props {
  children: ReactNode
}
export function BlockFormBase({ children }: Props) {
  const { blockType, setBlockType, drawerMode } = useBlockActionStore()

  const formTypes: FormType[] = useMemo(
    () => [
      {
        type: LINK,
        title: BLOCK_TO.KR[LINK],
        icon: <BiLink />
      },
      {
        type: IMAGE,
        title: BLOCK_TO.KR[IMAGE],
        icon: <BiImageAlt />
      },
      {
        type: VIDEO,
        title: BLOCK_TO.KR[VIDEO],
        icon: <BiCaretRightSquare />
      },
      {
        type: MAP,
        title: BLOCK_TO.KR[MAP],
        icon: <BiMapAlt />
      },
      {
        type: TEXT,
        title: BLOCK_TO.KR[TEXT],
        icon: <BiPencil />
      }
    ],
    []
  )

  if (blockType === 'PAGE' || blockType === 'TEMPLATE') {
    return children
  }

  return (
    <div className={styles.flexContainer}>
      <div className={styles.container}>
        <h2>
          {formTypes.find((form) => form.type === blockType)?.title} {drawerMode === 'CREATE' ? '추가하기' : '수정하기'}
        </h2>
        <div
          className={classNames([
            styles.actionNavigation,
            {
              [styles.focusable]: drawerMode === 'CREATE'
            }
          ])}
        >
          {formTypes.map((form) => {
            return (
              <div key={form.type}>
                <button
                  type="button"
                  className={classNames([
                    {
                      [styles.active]: form.type === blockType,
                      [styles.disable]: drawerMode === 'EDIT'
                    }
                  ])}
                  onClick={() => setBlockType(form.type)}
                  disabled={drawerMode === 'EDIT'}
                >
                  <div className={styles.icon}>{form.icon}</div>
                </button>
                <div
                  id={styles.btnTitle}
                  className={classNames([
                    {
                      [styles.activeText]: form.type === blockType
                    }
                  ])}
                >
                  {form.title}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}
