import { useState } from 'react'
import { ConfirmModal } from '@/components/SharePage/Modals/ConfirmModal'
import { ModalPortal } from '@/templates/ModalPortal'
import { toast } from '@/utils'
import { useSharePage } from '@/hooks/useSharePageManager'
import { useUser } from '@/hooks/user'
import ConfirmModalContent from '../Modals/ConfirmModalContent'
import styles from './Profile.module.scss'
import ProfileSwitchCase from './ProfileSwitchCase'

export function Profile() {
  const [openConfirmModal, setConfirmModal] = useState(false)
  const { sharePage, pageId } = useSharePage()
  const { spaceList } = useUser()
  const rootPage = spaceList?.find((page) => page.mainPageId === pageId)

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <ProfileSwitchCase rootPage={!!rootPage?.mainPageId} mode={sharePage.privilege === 'EDIT' ? 'EDIT' : 'VIEW'} />
        {openConfirmModal && (
          <ModalPortal>
            <ConfirmModal
              onConfirm={(isConfirm) => {
                toast(isConfirm ? '삭제 되었습니다.' : '취소 되었습니다.', 'success', { autoClose: 500 })
                setConfirmModal(false)
              }}
              cancelBtnText="취소"
              confirmBtnText="삭제하기"
            >
              <ConfirmModalContent />
            </ConfirmModal>
          </ModalPortal>
        )}
      </div>
    </div>
  )
}
