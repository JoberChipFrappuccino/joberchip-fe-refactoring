import classNames from 'classnames'
import { type BlockBaseWithBlockProps } from '@/components/Common/SwitchCases/ViewerBox'
import BlockLogo from './BlockLogo'
import styles from './LinkBlock.module.scss'

export function LinkBlock({ block, mode }: BlockBaseWithBlockProps<TLink>) {
  return (
    <div className={styles.container}>
      <div className={classNames(mode === 'EDIT' && 'cover')} />
      <div className={styles.contentCover}>
        <div className={styles.itemBox}>
          <BlockLogo logo={block.src} />
          <div className={styles.titleUrl}>
            <span>{block.title}</span>
            <a style={{ display: block.w === 1 ? 'none' : 'inline' }} href={block.src}>
              {block.src}
            </a>
          </div>
        </div>
      </div>
      <a type="button" className={styles.footer} href={block.src} target="_blank" rel="noreferrer">
        <div className={styles.footerLeft}>바로가기</div>
        <div className={styles.footerright} />
      </a>
    </div>
  )
}
