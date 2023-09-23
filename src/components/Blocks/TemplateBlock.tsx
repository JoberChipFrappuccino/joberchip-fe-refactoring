import { type BlockWith } from '@/models/space'
import styles from './TemplateBlock.module.scss'

type Props = {
  block: BlockWith<'template'>
  mode: SpaceMode
  preview?: boolean
}
export function TemplateBlock({ block, mode, preview = false }: Props) {
  return (
    <div className={styles.container}>
      <aside className={mode === 'edit' ? 'cover' : ''} />
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
        <div className={styles.preview}>템플릿 미리 보기</div>
      ) : (
        <div className={styles.direct}>
          <a href="/">바로 가기</a>
        </div>
      )}
    </div>
  )
}
