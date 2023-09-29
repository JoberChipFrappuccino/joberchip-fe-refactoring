import { type BlockWith } from '@/models/space'
import styles from './TextBlock.module.scss'

type Props = {
  block: BlockWith<TText>
  mode: SpaceMode
}
export function TextBlock({ block, mode }: Props) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''} />
      <p className={mode}>{block.description}</p>
    </div>
  )
}
