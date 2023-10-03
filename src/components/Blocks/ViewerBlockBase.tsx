import { BlockCover } from '@/components/SharePage/BlockCover'
import BlockPortal from '@/components/SharePage/BlockPortal'
import { DropDownMenu } from '@/components/SharePage/DropDownMenu'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { BLOCK, PAGE, TEMPLATE } from '@/constants/blockTypeConstant'
import { type BlockBase, type BlockType, type BlockWith } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import { ModalPortal } from '@/templates/ModalPortal'
import { clip } from '@/utils/copy'
import { Switch } from 'antd'
import classNames from 'classnames'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ConfirmModal } from '../Modal/ConfirmModal'
import styles from './ViewerBlockBase.module.scss'

export interface BlockBaseProps {
  children: ReactNode
  block: BlockBase<BlockType>
}

export function ViewerBlockBase({ block, children }: BlockBaseProps) {
  const [focus, setFocus] = useState(false)
  const { activeBlockId, setActiveBlockId } = useBlockAction()
  const { sharePage, removeBlockById, mode } = useSharePageStore()
  const { setOpenDrawer, setFormType, setDrawerMode, setBlockType } = useBlockAction()
  const [confirmModal, setConfirmModal] = useState(false)

  const items = useMemo(() => {
    const switchItems = []
    let blockName = '블록'
    if (block.type === PAGE) {
      blockName = '페이지'
    } else if (block.type === TEMPLATE) {
      blockName = '템플릿'
    }

    const publickSwitchItem = {
      key: `${block.objectId}-view-block-1`,
      label: (
        <Switch
          className={styles.switchBtn}
          defaultChecked={!block.visible}
          onChange={() => {
            for (let i = 0; i < sharePage.children.length; i++) {
              if (sharePage.children[i].objectId === block.objectId) {
                sharePage.children[i].visible = !sharePage.children[i].visible
                // todo : block visibe상태를 변경하는 API를 호출해야 합니다.
                break
              }
            }
          }}
        />
      ),
      icon: '공개 설정'
    }
    const pageInformationEditItem = {
      key: `${block.objectId}-view-block-2`,
      icon: (
        <button
          className={styles.kebobBtn}
          onClick={() => {
            setDrawerMode('edit')
            setBlockType(block.type)
            if (block.type === TEMPLATE || block.type === PAGE) {
              setFormType(block.type)
            } else {
              setFormType(BLOCK)
            }
            setOpenDrawer(true)
          }}
        >
          {`${blockName} 정보 수정`}
        </button>
      )
    }
    const copyLinkItem = {
      key: `${block.objectId}-view-block-3`,
      icon: (
        <button className={styles.kebobBtn} onClick={() => clip((block as BlockWith<TTemplate>).url)}>
          링크 복사
        </button>
      )
    }
    const templateDetailSettingItem = {
      key: `${block.objectId}-view-block-4`,
      icon: <button className={styles.kebobBtn}>템플릿 상세 설정</button>
    }
    const deleteItem = {
      key: `${block.objectId}-view-block-5`,
      danger: true,
      label: '삭제하기',
      onClick: () => setConfirmModal(true)
    }

    switchItems.push(publickSwitchItem)
    switchItems.push(getUniqueDivierItem(`${block.objectId}-ViewerBlockBase-divier-1`))
    switchItems.push(pageInformationEditItem)
    switchItems.push(getUniqueDivierItem(`${block.objectId}-ViewerBlockBase-divier-2`))

    if (block.type === TEMPLATE) {
      switchItems.push(copyLinkItem)
      switchItems.push(getUniqueDivierItem(`${block.objectId}-ViewerBlockBase-divier-3`))
      switchItems.push(templateDetailSettingItem)
      switchItems.push(getUniqueDivierItem(`${block.objectId}-ViewerBlockBase-divier-4`))
    }
    switchItems.push(deleteItem)

    return switchItems
  }, [])

  useEffect(() => {
    setFocus(activeBlockId === block.objectId)
  }, [activeBlockId])
  return (
    <div className={styles.container}>
      {mode === 'edit' && (
        <aside
          className={classNames(styles.menu, [
            {
              kebobMenu: activeBlockId === block.objectId
            }
          ])}
        >
          <DropDownMenu
            trigger="click"
            items={items}
            statefulKeys={[`${block.objectId}-view-block-1`, `${block.objectId}-view-block-5`]}
          >
            <button id={DROPDOWN_TRIGGER_ICON_ID} className={styles.iconCover}>
              <BsThreeDotsVertical
                id={DROPDOWN_TRIGGER_ICON_ID}
                className={activeBlockId === block.objectId ? styles.activeIcon : styles.inactiveIcon}
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
              if (isConfirm) removeBlockById(block.objectId)
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

function getUniqueDivierItem(key: string) {
  return {
    key,
    type: 'divider'
  }
}
