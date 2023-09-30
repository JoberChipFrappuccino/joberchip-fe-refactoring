import { type BlockBaseWithBlockProps } from '../SwitchCase/ViewerBox'
import styles from './TextBlock.module.scss'

export function TextBlock({ block, mode }: BlockBaseWithBlockProps<TText>) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''} />
      <p className={mode}>{block.description}</p>
    </div>
  )
}
