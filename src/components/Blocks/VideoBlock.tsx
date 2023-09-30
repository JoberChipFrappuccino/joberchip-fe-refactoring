import { type BlockBaseWithBlockProps } from '../SwitchCase/ViewerBox'
import styles from './VideoBlock.module.scss'

export function VideoBlock({ block, mode }: BlockBaseWithBlockProps<TVideo>) {
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
