import { TemplatePreviewModal } from '@/components/Modal/TemplatePreviewModal'
import { type BlockBaseWithBlockProps } from '@/components/SwitchCase/ViewerBox'
import { ModalPortal } from '@/templates/ModalPortal'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './TemplateBlock.module.scss'

interface TemplateBlockProps extends BlockBaseWithBlockProps<TTemplate> {
  preview?: boolean
}
export function TemplateBlock({ block, mode, preview = false }: TemplateBlockProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <aside className={classNames(mode === 'edit' && 'cover')} />
      <div className={styles.contentCover}>
        <div className={styles.cover}>
          <img className={styles.img} src={block.iconUrl} alt="template icon" />
          <div className={styles.contentBox}>
            <h3>{block.title}</h3>
            <p>{block.description}</p>
          </div>
        </div>
      </div>
      {preview ? (
        <button className={styles.preview} type="button" onClick={() => setOpen(true)}>
          템플릿 미리 보기
        </button>
      ) : (
        <div className={styles.direct}>
          <a href="/">바로 가기</a>
        </div>
      )}
      {open && (
        <ModalPortal>
          <TemplatePreviewModal onClose={() => setOpen(false)}>
            <img className={styles.img} src={block.previewURL} alt="template preciew Image" />
          </TemplatePreviewModal>
        </ModalPortal>
      )}
    </div>
  )
}
