import classNames from 'classnames'
import { type BlockBaseWithBlockProps } from '../SwitchCase/ViewerBox'
import styles from './ImageBlock.module.scss'

export function ImageBlock({ block, mode }: BlockBaseWithBlockProps<TImage>) {
  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'edit' && 'cover')} />
      <img
        // * 이상하게 이미지는 css module이 적용이 안됨 ㅠㅠ 이유를 모르곘음 ㅠㅠㅠ 흑흑
        // className={mode}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src={block.src}
        alt={block.alt}
      />
    </div>
  )
}
