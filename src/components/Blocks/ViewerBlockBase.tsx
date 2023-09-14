import BlockCover from '@/components/Space/BlockCover'
import BlockPortal from '@/components/Space/BlockPortal'
import { DropDownMenu } from '@/components/Space/DropDownMenu'
import { type BlockBase } from '@/models/space'
import { useActiveBlock } from '@/store/activeBlock'
import { useSpaceModeStore } from '@/store/spaceMode'
import { Switch } from 'antd'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import styles from './ViewerBlockBase.module.scss'

type Props = {
  children: ReactNode
  block: BlockBase
}
export default function ViewerBlockBase({ block, children }: Props) {
  const { mode } = useSpaceModeStore()
  const [focus, setFocus] = useState(false)
  const { activeBlockId, setActiveBlockId } = useActiveBlock()

  const items = useMemo(
    () => [
      {
        key: `${block.blockId}-view-block-1`,
        label: <Switch onChange={() => {}} />,
        icon: <p>공개 설정</p>
      },
      {
        key: `${block.blockId}-view-block-2`,
        icon: <button>페이지 정보 수정</button>
      },
      {
        key: `${block.blockId}-view-block-3`,
        danger: true,
        label: '삭제하기'
      }
    ],
    [mode]
  )

  useEffect(() => {
    setFocus(activeBlockId === block.blockId)
  }, [activeBlockId])

  return (
    <div className={styles.container}>
      {mode === 'edit' && (
        <aside className={[styles.menu, activeBlockId === block.blockId ? 'kebobMenu' : ''].join(' ')}>
          <DropDownMenu items={items}>
            <div className={styles.iconCover}>
              <BsThreeDotsVertical
                className={activeBlockId === block.blockId ? styles.activeIcon : styles.inactiveIcon}
              />
            </div>
          </DropDownMenu>
        </aside>
      )}
      {focus && (
        <BlockPortal>
          <BlockCover
            onClick={() => {
              setActiveBlockId('')
              setFocus(() => false)
            }}
          />
        </BlockPortal>
      )}
      {children}
    </div>
  )
}
