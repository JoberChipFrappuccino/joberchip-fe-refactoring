import classNames from 'classnames'
import { useEffect, useState, type ReactNode, useCallback } from 'react'
// import { deleteBlockAPI, deletePageAPI } from '@/apis/delete'
import { BlockCover } from '@/components/SharePage/BlockCover'
import BlockPortal from '@/components/SharePage/BlockPortal'
import EditorDropDownMenu from '@/components/SharePage/DnDViewer/EditorDropDownMenu'
import { ConfirmModal } from '@/components/SharePage/Modals/ConfirmModal'
// import { IMAGE, LINK, MAP, PAGE, TEMPLATE, TEXT, VIDEO } from '@/constants/blockTypeConstant'
import { type BlockBase, type BlockType } from '@/models/space'
import { useBlockActionStore } from '@/store/blockAction'
import { useSharePageModeStore } from '@/store/sharePage'
import { ModalPortal } from '@/templates/ModalPortal'
import ConfirmModalContent from '../Modals/ConfirmModalContent'
import styles from './ViewerBlockBase.module.scss'

export interface BlockBaseProps {
  children: ReactNode
  block: BlockBase<BlockType>
}

export function ViewerBlockBase({ block, children }: BlockBaseProps) {
  const { activeBlockId, setActiveBlockId } = useBlockActionStore()
  const { mode } = useSharePageModeStore()

  const [focus, setFocus] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)

  useEffect(() => {
    setFocus(activeBlockId === block.objectId)
  }, [activeBlockId])

  const handleDelete = useCallback(() => {}, [])

  const handleOnClickBlockCover = useCallback(() => {
    setActiveBlockId('')
    setFocus(() => false)
  }, [])

  const handleOnConfirm = useCallback(() => {
    // if (isConfirm) removeBlockById(block.objectId)
    setConfirmModal(false)
    setActiveBlockId('')
  }, [])

  return (
    <div className={styles.container}>
      {mode === 'EDIT' && (
        <aside
          className={classNames(styles.menu, [
            {
              kebobMenu: activeBlockId === block.objectId
            }
          ])}
        >
          <EditorDropDownMenu block={block} onDelete={handleDelete} />
        </aside>
      )}
      {focus && (
        <BlockPortal>
          <BlockCover onClick={handleOnClickBlockCover} />
        </BlockPortal>
      )}
      {confirmModal && (
        <ModalPortal>
          <ConfirmModal
            onClose={() => setConfirmModal(false)}
            cancelBtnText="취소"
            confirmBtnText="삭제하기"
            onConfirm={handleOnConfirm}
          >
            <ConfirmModalContent />
          </ConfirmModal>
        </ModalPortal>
      )}
      {children}
    </div>
  )
}

// HACK : 파라메터 상수로 변경 필요
// function switchDeleteAPIByBlockType(pageId: string | undefined, block: BlockBase<BlockType>) {
//   if (!pageId) return null
//   switch (block.type) {
//     case TEXT:
//       return deleteBlock('textBlock', block.objectId, pageId)
//     case IMAGE:
//       return deleteBlock('imageBlock', block.objectId, pageId)
//     case LINK:
//       return deleteBlock('linkBlock', block.objectId, pageId)
//     case PAGE:
//       return deleteBlock('pageBlock', block.objectId, pageId)
//     case VIDEO:
//       return deleteBlock('videoBlock', block.objectId, pageId)
//     case MAP:
//       return deleteBlock('mapBlock', block.objectId, pageId)
//     case TEMPLATE:
//       return deleteBlock('templateBlock', block.objectId, pageId)
//     default:
//       return null
//   }
// }

// async function deleteBlock(blockType: string, blockId: string, pageId: string) {
//   try {
//     if (blockType === 'pageBlock') {
//       await deletePageAPI(blockId)
//     }
//     await deleteBlockAPI(pageId, blockType, blockId)
//   } catch (error) {
//     console.error(error)
//   }
// }
