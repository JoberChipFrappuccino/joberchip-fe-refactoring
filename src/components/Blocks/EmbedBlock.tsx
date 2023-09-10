import { type BlockWith } from '@/models/space'
import styles from './EmbedBlock.module.scss'
type Props = {
  block: BlockWith<'embed'>
  mode: SpaceMode
}
export function EmbedBlock({ block, mode }: Props) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''} />
      <iframe className={mode} src={block.src} allowFullScreen />
      <p className={styles.loading}>Loading...</p>
    </div>
  )
}
