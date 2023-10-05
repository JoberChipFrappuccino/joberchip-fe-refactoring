import { type BlockBaseWithBlockProps } from '../SwitchCase/ViewerBox'
import styles from './GoogleMapBlock.module.scss'

export function GoogleMapBlock({ block, mode }: BlockBaseWithBlockProps<TMap>) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''} />
      {/* <iframe className={mode} referrerPolicy="no-referrer-when-downgrade" src={block.src} /> */}
      <p className={styles.loading}>Loading...</p>
    </div>
  )
}
