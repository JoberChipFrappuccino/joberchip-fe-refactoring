import { useState } from 'react'
import { ModalPortal } from '@/components/Common/Portal/ModalPortal'
import { ConfirmModal } from '@/components/SharePage/Modals/ConfirmModal'
import { toast } from '@/utils'
import ConfirmModalContent from '../Modals/ConfirmModalContent'
import styles from './Profile.module.scss'
import ProfileSwitchCase from './ProfileSwitchCase'

export function Profile() {
  const [openConfirmModal, setConfirmModal] = useState(false)

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <ProfileSwitchCase />
        {openConfirmModal && (
          <ModalPortal>
            <ConfirmModal
              onConfirm={(isConfirm) => {
                toast(isConfirm ? '삭제 되었습니다.' : '취소 되었습니다.', 'success', { autoClose: 500 })
                setConfirmModal(false)
              }}
              onClose={() => setConfirmModal(false)}
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
