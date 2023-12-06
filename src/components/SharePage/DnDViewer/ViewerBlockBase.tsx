import type { BlockBase, BlockType } from '@/models/block'
import classNames from 'classnames'
import { useState, type ReactNode, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { ModalPortal } from '@/components/Common/Portal/ModalPortal'
import BlockPortal from '@/components/SharePage/BlockPortal'
import { BlockCover } from '@/components/SharePage/Blocks/BlockCover'
import { BlockDropDown } from '@/components/SharePage/DnDViewer/BlockDropDown'
import { ConfirmModal } from '@/components/SharePage/Modals/ConfirmModal'
import { useBlockActionStore } from '@/store/blockAction'
import { useSharePageModeStore } from '@/store/sharePage'
import ConfirmModalContent from '../Modals/ConfirmModalContent'
import styles from './ViewerBlockBase.module.scss'

export interface BlockBaseProps {
  children: ReactNode
  block: BlockBase<BlockType>
}

export const ViewerBlockBase = ({ block, children }: BlockBaseProps) => {
  const { pageId } = useParams()
  const { activeBlockId, setActiveBlockId } = useBlockActionStore()
  const { mode } = useSharePageModeStore()
  const [confirmModal, setConfirmModal] = useState(false)
  const { objectId } = block

  const handleOnClickBlockCover = useCallback(() => {
    setActiveBlockId('')
  }, [])

  const handleOnConfirm = useCallback(() => {
    setConfirmModal(false)
    setActiveBlockId('')
  }, [])

  return (
    <div className={styles.container}>
      {mode === 'EDIT' && (
        <aside className={classNames(styles.menu, [{ kebobMenu: activeBlockId === objectId }])}>
          <BlockDropDown pageId={pageId} block={block} />
        </aside>
      )}
      {activeBlockId === objectId && (
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
