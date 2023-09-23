import { type ReactNode } from 'react'
import styles from './TemplatePreviewModal.module.scss'

type Props = {
  children: ReactNode
  onClose: () => void
}

export default function TemplatePreviewModal({ onClose, children }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <div className={styles.previewCover}>{children}</div>
        <button
          className={styles.confirmBtn}
          onClick={() => {
            onClose()
          }}
        >
          확인
        </button>
      </div>
    </div>
  )
}
