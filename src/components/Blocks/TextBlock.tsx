import { BlockWith } from '@/models/space'
import styles from './TextBlock.module.scss'

type Props = {
  block: BlockWith<'text'>
  mode: SpaceMode
}
export function TextBlock({ block, mode }: Props) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''}></div>
      <p className={mode}>{block.text}</p>
    </div>
  )
}
