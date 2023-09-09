import { BlockWith } from '@/models/space'
import styles from './PageBlock.module.scss'

type Props = {
  block: BlockWith<'page'>
  mode: SpaceMode
}
export function PageBlock({ block, mode }: Props) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''}></div>
      <div className={mode}>
        <a href={block.url}>{block.text}</a>
      </div>
    </div>
  )
}
