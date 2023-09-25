import { type ReactNode } from 'react'
import styles from './ConfirmModal.module.scss'

type Props = {
  children: ReactNode
  onConfirm: (isConfimed: boolean) => void
  cancelBtnText?: string
  confirmBtnText?: string
}

export function ConfirmModal({ onConfirm, children, cancelBtnText = '취소 하기', confirmBtnText = '확인' }: Props) {
  return (
    <div className={styles.container}>
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
