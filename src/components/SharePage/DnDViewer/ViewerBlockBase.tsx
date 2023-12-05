import type { BlockBase, BlockType } from '@/models/block'
import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useEffect, useState, type ReactNode, useCallback } from 'react'
import BlockPortal from '@/components/SharePage/BlockPortal'
import { BlockCover } from '@/components/SharePage/Blocks/BlockCover'
import EditorDropDownMenu from '@/components/SharePage/DnDViewer/EditorDropDownMenu'
import { ConfirmModal } from '@/components/SharePage/Modals/ConfirmModal'
import { deleteBlockMutation } from '@/queries/mutates/sharePageMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { useSharePageModeStore } from '@/store/sharePage'
import { ModalPortal } from '@/templates/ModalPortal'
import { toast } from '@/utils'
import ConfirmModalContent from '../Modals/ConfirmModalContent'
import styles from './ViewerBlockBase.module.scss'

export interface BlockBaseProps {
  children: ReactNode
  block: BlockBase<BlockType>
}

export function ViewerBlockBase({ block, children }: BlockBaseProps) {
  const { activeBlockId, setActiveBlockId } = useBlockActionStore()
  const { mode } = useSharePageModeStore()
  const { pageId } = useSharePageQuery()
  const queryClient = useQueryClient()
  const deleteMutation = deleteBlockMutation(queryClient)

  const [focus, setFocus] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const { objectId } = block

  useEffect(() => {
    setFocus(activeBlockId === objectId)
  }, [activeBlockId])

  const handleDelete = () => {
    deleteMutation.mutate({ pageId, block })
    setActiveBlockId('')
    setFocus(() => false)
    toast('블록이 삭제되었습니다.', 'success')
  }

  const handleOnClickBlockCover = useCallback(() => {
    setActiveBlockId('')
    setFocus(() => false)
  }, [])

  const handleOnConfirm = useCallback(() => {
    setConfirmModal(false)
    setActiveBlockId('')
  }, [])

  return (
    <div className={styles.container}>
      {mode === 'EDIT' && (
        <aside className={classNames(styles.menu, [{ kebobMenu: activeBlockId === objectId }])}>
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
