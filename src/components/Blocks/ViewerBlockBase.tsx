import BlockCover from '@/components/Space/BlockCover'
import BlockPortal from '@/components/Space/BlockPortal'
import { DropDownMenu } from '@/components/Space/DropDownMenu'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { type BlockBase, type BlockType } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useSpaceStore } from '@/store/space'
import { Switch } from 'antd'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import styles from './ViewerBlockBase.module.scss'

interface Props {
  children: ReactNode
  block: BlockBase<BlockType>
}

export function ViewerBlockBase({ block, children }: Props) {
  const [focus, setFocus] = useState(false)
  const { activeBlockId, setActiveBlockId } = useBlockAction()
  const { space, removeBlockById, mode } = useSpaceStore()
  const { setOpenDrawer, setFormType, setDrawerMode, setBlockType } = useBlockAction()

  const items = useMemo(
    () => [
      {
        key: `${block.blockId}-view-block-1`,
        label: (
          <Switch
            defaultChecked={!block.visible}
            onChange={() => {
              for (let i = 0; i < space.blocks.length; i++) {
                if (space.blocks[i].blockId === block.blockId) {
                  space.blocks[i].visible = !space.blocks[i].visible
                  // todo : block visibe상태를 변경하는 API를 호출해야 합니다.
                  break
                }
              }
            }}
          />
        ),
        icon: <p>공개 설정</p>
      },
      {
        key: `${block.blockId}-view-block-2`,
        icon: (
          <button
            onClick={() => {
              setDrawerMode('edit')
              setBlockType(block.type)
              if (block.type === 'template') {
                setFormType('template')
              } else if (block.type === 'page') {
                setFormType('page')
              } else {
                setFormType('block')
              }
              setOpenDrawer(true)
            }}
          >
            페이지 정보 수정
          </button>
        )
      },
      {
        key: `${block.blockId}-view-block-3`,
        danger: true,
        icon: (
          <button
            onClick={() => {
              const confirmed = window.confirm('진짜 블록 삭제합니다?')
              if (!confirmed) return
              removeBlockById(block.blockId)
            }}
          >
            삭제하기
          </button>
        )
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
          <DropDownMenu trigger="click" items={items} statefulKeys={[`${block.blockId}-view-block-1`]}>
            <button id={DROPDOWN_TRIGGER_ICON_ID} className={styles.iconCover}>
              <BsThreeDotsVertical
                id={DROPDOWN_TRIGGER_ICON_ID}
                className={activeBlockId === block.blockId ? styles.activeIcon : styles.inactiveIcon}
              />
            </button>
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
