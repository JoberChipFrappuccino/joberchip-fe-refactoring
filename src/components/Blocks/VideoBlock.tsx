/* eslint-disable multiline-ternary */
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
      {block.src.includes('youtube') ? (
        <iframe className={mode} src={`${block.src}?autoplay=1&mute=1`} />
      ) : (
        <video className={mode} src={block.src} controls autoPlay loop />
      )}
    </div>
  )
}
