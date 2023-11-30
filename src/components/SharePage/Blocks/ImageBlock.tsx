import classNames from 'classnames'
import { type BlockBaseWithBlockProps } from '../../Common/SwitchCases/ViewerBox'
import styles from './ImageBlock.module.scss'

export function ImageBlock({ block, mode }: BlockBaseWithBlockProps<TImage>) {
  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'EDIT' && 'cover')} />
      <img
        className={block.title?.split('&&')[1]?.includes('contain') ? styles.contain : styles.cover}
        style={{ width: '100%', height: '100%' }}
        src={block.src}
        alt={block.title}
      />
      {block.title && (
        <div className={styles.caption}>
          <p>{block.title.split('&&')[0]}</p>
        </div>
      )}
    </div>
  )
}
