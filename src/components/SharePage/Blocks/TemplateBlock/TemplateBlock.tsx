import classNames from 'classnames'
import { useState } from 'react'
import { ModalPortal } from '@/components/Common/Portal/ModalPortal'
import { type BlockBaseWithBlockProps } from '@/components/Common/SwitchCases/ViewerBox'
import { TemplatePreviewModal } from '@/components/SharePage/Modals/TemplatePreviewModal'
import styles from './TemplateBlock.module.scss'

interface TemplateBlockProps extends BlockBaseWithBlockProps<TTemplate> {
  preview?: boolean
}
export function TemplateBlock({ block, mode, preview = false }: TemplateBlockProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <aside className={classNames(mode === 'EDIT' && 'cover')} />
      <div className={styles.contentCover}>
        <div className={styles.cover}>
          <img className={styles.img} src={'/template_action_bar_icon.png'} alt="template icon" />
          <div className={styles.contentBox}>
            <h3>{block.title}</h3>
            <p>{block.description}</p>
          </div>
        </div>
      </div>
      {preview ? (
        <div className={styles.previewBtnCover}>
          <button className={styles.preview} type="button" onClick={() => setOpen(true)}>
            템플릿 미리 보기
          </button>
        </div>
      ) : (
        <div className={styles.direct}>
          <a href="/">바로 가기</a>
        </div>
      )}
      {open && (
        <ModalPortal>
          <TemplatePreviewModal onClose={() => setOpen(false)}>
            {/* HACK : 기업측에서 템플릿을 제공하지 않도록 정했기 때문에 임시 이미지로 대체합니다. */}
            <img src={'/newbie_profile_form.png'} alt="template preview Image" />
          </TemplatePreviewModal>
        </ModalPortal>
      )}
    </div>
  )
}
