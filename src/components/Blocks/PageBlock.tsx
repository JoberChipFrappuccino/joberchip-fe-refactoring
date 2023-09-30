import classNames from 'classnames'
import { type BlockBaseWithBlockProps } from '../SwitchCase/ViewerBox'
import styles from './PageBlock.module.scss'

export function PageBlock({ block, mode }: BlockBaseWithBlockProps<TPage>) {
  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'edit' && 'cover')} />
      <div className={mode}>
        <a href={block.url}>{block.title}</a>
      </div>
    </div>
  )
}
