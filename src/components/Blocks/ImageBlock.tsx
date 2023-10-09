import classNames from 'classnames'
import { type BlockBaseWithBlockProps } from '../SwitchCase/ViewerBox'
import styles from './ImageBlock.module.scss'

export function ImageBlock({ block, mode }: BlockBaseWithBlockProps<TImage>) {
  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'edit' && 'cover')} />
      <img
        className={block.title?.split('&&')[1]?.includes('contain') ? styles.contain : ''}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src={block.src}
        alt={block.title}
      />
      {block.title && (
        <caption className={styles.caption}>
          <p>{block.title.split('&&')[0]}</p>
        </caption>
      )}
    </div>
  )
}
