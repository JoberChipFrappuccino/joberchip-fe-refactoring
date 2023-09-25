import BlockCover from '@/components/Space/BlockCover'
import BlockPortal from '@/components/Space/BlockPortal'
import { DropDownMenu } from '@/components/Space/DropDownMenu'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { type BlockBase, type BlockType, type BlockWith } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useSpaceStore } from '@/store/space'
import ModalPortal from '@/templates/ModalPortal'
import { clip } from '@/utils/copy'
import { Switch } from 'antd'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ConfirmModal } from '../Modal/ConfirmModal'
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
  const [confirmModal, setConfirmModal] = useState(false)

  const items = useMemo(() => {
    const switchItems = []
    let blockName = '블록'
    if (block.type === 'page') {
      blockName = '페이지'
    } else if (block.type === 'template') {
      blockName = '템플릿'
    }

    const divider = {
      key: 'ViewBlockBase-divider-1',
      type: 'divider'
    }

    const publickSwitchItem = {
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
    }

    const pageInformationEditItem = {
      key: `${block.blockId}-view-block-2`,
      icon: (
        <button
          className={styles.kebobBtn}
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
          {`${blockName} 정보 수정`}
        </button>
      )
    }

    const copyLinkItem = {
      key: `${block.blockId}-view-block-3`,
      icon: (
        <button
          className={styles.kebobBtn}
          onClick={() => {
            clip((block as BlockWith<'template'>).url)
          }}
        >
          링크 복사
        </button>
      )
    }

    const templateDetailSettingItem = {
      key: `${block.blockId}-view-block-4`,
      icon: <button className={styles.kebobBtn}>템플릿 상세 설정</button>
    }

    const deleteItem = {
      key: `${block.blockId}-view-block-5`,
      danger: true,
      label: '삭제하기',
      onClick: () => setConfirmModal(true)
    }

    switchItems.push(publickSwitchItem)
    switchItems.push(divider)
    switchItems.push(pageInformationEditItem)
    switchItems.push(divider)

    if (block.type === 'template') {
      switchItems.push(copyLinkItem)
      switchItems.push(divider)
      switchItems.push(templateDetailSettingItem)
      switchItems.push(divider)
    }
    switchItems.push(deleteItem)

    return switchItems
  }, [])

  useEffect(() => {
    setFocus(activeBlockId === block.blockId)
  }, [activeBlockId])

  return (
    <div className={styles.container}>
      {mode === 'edit' && (
        <aside className={[styles.menu, activeBlockId === block.blockId ? 'kebobMenu' : ''].join(' ')}>
          <DropDownMenu
            trigger="click"
            items={items}
            statefulKeys={[`${block.blockId}-view-block-1`, `${block.blockId}-view-block-5`]}
          >
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
      {confirmModal && (
        <ModalPortal>
          <ConfirmModal
            cancelBtnText="취소"
            confirmBtnText="삭제하기"
            onConfirm={(isConfirm) => {
              if (isConfirm) removeBlockById(block.blockId)
              setConfirmModal(false)
            }}
          >
            <p
              style={{
                margin: 0
              }}
            >
              진짜 지웁니다?
            </p>
            <p
              style={{
                margin: 0
              }}
            >
              복구 못해요?
            </p>
          </ConfirmModal>
        </ModalPortal>
      )}
      {children}
    </div>
  )
}
