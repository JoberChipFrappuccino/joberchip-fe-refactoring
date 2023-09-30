import classNames from 'classnames'
import { type BlockBaseWithBlockProps } from '../SwitchCase/ViewerBox'
import styles from './EmbedBlock.module.scss'

export function EmbedBlock({ block, mode }: BlockBaseWithBlockProps<TEmbed>) {
  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'edit' && 'cover')} />
      <iframe className={mode} src={block.src} allowFullScreen />
      <p className={styles.loading}>Loading...</p>
    </div>
  )
}
