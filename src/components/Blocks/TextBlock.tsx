import { type BlockWith } from '@/models/space'
import styles from './TextBlock.module.scss'

type Props = {
  block: BlockWith<'TEXT'>
  mode: SpaceMode
}
export function TextBlock({ block, mode }: Props) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''} />
      <p className={mode}>{block.text}</p>
    </div>
  )
}
