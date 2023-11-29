import { type BlockPortalProps } from '../BlockPortal'
import styles from './TemplatePreviewModal.module.scss'

interface TemplatePreviewModalProps extends BlockPortalProps {
  onClose: () => void
}

export function TemplatePreviewModal({ onClose, children }: TemplatePreviewModalProps) {
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
