import classNames from 'classnames'
import { useMemo, type ReactNode } from 'react'
import { BiCaretRightSquare, BiImageAlt, BiLink, BiMapAlt, BiPencil } from 'react-icons/bi'
import { IMAGE, LINK, MAP, TEXT, VIDEO } from '@/constants/blockTypeConstant'
import { BLOCK_TYPE_TO_KOR } from '@/constants/drawerConstant'
import { type BlockType } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import styles from './ActionBlockFormBase.module.scss'

interface Props {
  children: ReactNode
}

export function ActionBlockFormBase({ children }: Props) {
  const { blockType, setBlockType, drawerMode } = useBlockAction()

  type FormType = {
    title: string
    type: BlockType
    icon: ReactNode
  }
  const formTypes: FormType[] = useMemo(
    () => [
      {
        type: LINK,
        title: BLOCK_TYPE_TO_KOR[LINK],
        icon: <BiLink />
      },
      {
        type: IMAGE,
        title: BLOCK_TYPE_TO_KOR[IMAGE],
        icon: <BiImageAlt />
      },
      {
        type: VIDEO,
        title: BLOCK_TYPE_TO_KOR[VIDEO],
        icon: <BiCaretRightSquare />
      },
      {
        type: MAP,
        title: BLOCK_TYPE_TO_KOR[MAP],
        icon: <BiMapAlt />
      },
      {
        type: TEXT,
        title: BLOCK_TYPE_TO_KOR[TEXT],
        icon: <BiPencil />
      }
    ],
    []
  )
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div className={styles.container}>
        <h2>
          {formTypes.find((form) => form.type === blockType)?.title} {drawerMode === 'create' ? '추가' : '수정'}하기
        </h2>
        <div
          className={classNames([
            styles.actionNavigation,
            {
              [styles.focusable]: drawerMode === 'create'
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
                      [styles.disable]: drawerMode === 'edit'
                    }
                  ])}
                  onClick={() => setBlockType(form.type)}
                  disabled={drawerMode === 'edit'}
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
      <div style={{ display: 'flex', height: '100%', width: '100%' }}>{children}</div>
    </div>
  )
}
