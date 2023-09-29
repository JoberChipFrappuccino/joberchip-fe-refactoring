import { type BlockWith } from '@/models/space'
import styles from './PageBlock.module.scss'

type Props = {
  block: BlockWith<TPage>
  mode: SpaceMode
}
export function PageBlock({ block, mode }: Props) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''} />
      <div className={mode}>
        <a href={block.url}>{block.title}</a>
      </div>
    </div>
  )
}
