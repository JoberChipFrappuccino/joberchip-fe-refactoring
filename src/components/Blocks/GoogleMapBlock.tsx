import { BlockWith } from '@/models/space'
import styles from './GoogleMapBlock.module.scss'

type Props = {
  block: BlockWith<'googleMap'>
  mode?: SpaceMode
}

export function GoogleMapBlock({ block, mode = 'view' }: Props) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''} />
      <iframe className={mode} referrerPolicy="no-referrer-when-downgrade" src={block.src} />
      <p className={styles.loading}>Loading...</p>
    </div>
  )
}
