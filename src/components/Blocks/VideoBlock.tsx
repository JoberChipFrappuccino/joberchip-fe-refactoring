import { type BlockWith } from '@/models/space'
import styles from './VideoBlock.module.scss'

type Props = {
  block: BlockWith<'video'>
  mode: SpaceMode
}
export function VideoBlock({ block, mode }: Props) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''} />
      <video className={mode} src={block.src} controls autoPlay />
      <div className={styles.loading}>Loading...</div>
    </div>
  )
}
