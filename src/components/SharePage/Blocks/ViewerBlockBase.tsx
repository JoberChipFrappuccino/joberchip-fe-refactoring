import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'
import { Switch } from 'antd'
import classNames from 'classnames'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { editGoogleMapBlockAPI, editImageBlockAPI, editLinkBlockAPI, editVideoBlockAPI } from '@/apis/blocks'
import { deleteBlockAPI, deletePageAPI } from '@/apis/delete'
import { editPageProfileAPI } from '@/apis/space'
import { editTextBlockAPI } from '@/apis/textblock'
import { BlockCover } from '@/components/SharePage/BlockCover'
import BlockPortal from '@/components/SharePage/BlockPortal'
import { DropDownMenu } from '@/components/SharePage/DropDownMenu'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { BLOCK, IMAGE, LINK, MAP, PAGE, TEMPLATE, TEXT, VIDEO } from '@/constants/blockTypeConstant'
import { type BlockBase, type BlockType, type BlockWith } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import { ModalPortal } from '@/templates/ModalPortal'
import { clip } from '@/utils/copy'
import { toast } from '@/utils/toast'
import { ConfirmModal } from '../Modals/ConfirmModal'
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
          defaultChecked={block.visible}
          onChange={() => {
            switchToggleAPIByBlockType(sharePage.pageId, block)
            for (let i = 0; i < sharePage.children.length; i++) {
              if (sharePage.children[i].objectId === block.objectId) {
                sharePage.children[i].visible = !sharePage.children[i].visible
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
      label: (
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
      label: (
        <button className={styles.kebobBtn} onClick={() => clip((block as BlockWith<TTemplate>).url)}>
          링크 복사
        </button>
      )
    }
    const templateDetailSettingItem = {
      key: `${block.objectId}-view-block-4`,
      label: <button className={styles.kebobBtn}>템플릿 상세 설정</button>
    }
    const deleteItem = {
      key: `${block.objectId}-view-block-5`,
      danger: true,
      label: <p className={styles.delBtn}>삭제하기</p>,
      onClick: () => {
        switchDeleteAPIByBlockType(block, sharePage.pageId)
        setConfirmModal(true)
      }
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
              setActiveBlockId('')
            }}
          >
            <p
              style={{
                margin: 0
              }}
            >
              삭제 시 복구가 어렵습니다.
            </p>
            <p
              style={{
                margin: 0
              }}
            >
              정말 삭제하시겠습니까?
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

function switchToggleAPIByBlockType(pageId: string, block: BlockBase<BlockType>) {
  const form = new FormData()
  switch (block.type) {
    case TEXT:
      return editTextBlockAPI(pageId, block.objectId, { visible: !block.visible })
    case IMAGE:
      form.append('visible', !block.visible ? 'true' : 'false')
      return editImageBlockAPI(pageId, block.objectId, form)
    case LINK:
      return editLinkBlockAPI(pageId, block.objectId, { visible: !block.visible })
    case PAGE:
      form.append('visible', !block.visible ? 'true' : 'false')
      return editPageProfileAPI(pageId, form)
    case VIDEO:
      form.append('visible', !block.visible ? 'true' : 'false')
      return editVideoBlockAPI(pageId, block.objectId, form)
    case MAP:
      return editGoogleMapBlockAPI(pageId, block.objectId, { visible: !block.visible })
    case TEMPLATE:
      return toast('템플릿 공개 설정은 아직 지원하지 않습니다.', 'success')
    default:
      return toast('잘못된 입력입니다.', 'failure')
  }
}

// HACK : 파라메터 상수로 변경 필요
function switchDeleteAPIByBlockType(block: BlockBase<BlockType>, pageId: string) {
  switch (block.type) {
    case TEXT:
      return deleteBlock('textBlock', block.objectId, pageId)
    case IMAGE:
      return deleteBlock('imageBlock', block.objectId, pageId)
    case LINK:
      return deleteBlock('linkBlock', block.objectId, pageId)
    case PAGE:
      return deleteBlock('pageBlock', block.objectId, pageId)
    case VIDEO:
      return deleteBlock('videoBlock', block.objectId, pageId)
    case MAP:
      return deleteBlock('mapBlock', block.objectId, pageId)
    case TEMPLATE:
      return deleteBlock('templateBlock', block.objectId, pageId)
    default:
      return null
  }
}

async function deleteBlock(blockType: string, blockId: string, pageId: string) {
  try {
    if (blockType === 'pageBlock') {
      await deletePageAPI(blockId)
    }
    await deleteBlockAPI(pageId, blockType, blockId)
  } catch (error) {
    console.error(error)
  }
}
