import { useState } from 'react'
import { ModalPortal } from '@/components/Common/Portal/ModalPortal'
import { ConfirmModal } from '@/components/SharePage/Modals/ConfirmModal'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useSpaceListQuery } from '@/queries/useSpaceListQuery'
import { toast } from '@/utils'
import { useUser } from '@/hooks/useUserQuery'
import ConfirmModalContent from '../Modals/ConfirmModalContent'
import styles from './Profile.module.scss'
import ProfileSwitchCase from './ProfileSwitchCase'

export function Profile() {
  const [openConfirmModal, setConfirmModal] = useState(false)
  const { pageId } = useSharePageQuery()
  const { user } = useUser()
  const { spaceList } = useSpaceListQuery(user.userId)
  const rootPage = spaceList?.find((page) => page.mainPageId === pageId)

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <ProfileSwitchCase rootPage={!!rootPage?.mainPageId} />
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
