import { type BlockWith } from '@/models/space'
import styles from './ImageBlock.module.scss'

type Props = {
  block: BlockWith<'image'>
  mode: SpaceMode
}
export function ImageBlock({ block, mode }: Props) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''} />
      <img className={styles.image} src={block.src} alt={block.alt} />
    </div>
  )
}
