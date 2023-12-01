import { type BlockPortalProps } from '../BlockPortal'
import styles from './ConfirmModal.module.scss'

interface ConfirmModalProps extends BlockPortalProps {
  onClose: VoidFunction
  onConfirm: (isConfimed: boolean) => void
  cancelBtnText?: string
  confirmBtnText?: string
}

export function ConfirmModal({
  onConfirm,
  onClose,
  children,
  cancelBtnText = '취소 하기',
  confirmBtnText = '확인'
}: ConfirmModalProps) {
  return (
    <div
      className={styles.container}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.cover}>
        <div className={styles.contentCover}>{children}</div>
        <div className={styles.btnCover}>
          <button className={styles.cancelBtn} onClick={() => onConfirm(false)}>
            {cancelBtnText}
          </button>
          <button className={styles.confirmBtn} onClick={() => onConfirm(true)}>
            {confirmBtnText}
          </button>
        </div>
      </div>
    </div>
  )
}
