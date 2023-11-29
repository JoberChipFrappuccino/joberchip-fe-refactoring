import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { useBlockAction } from '@/store/blockAction'
import { type BlockBaseWithBlockProps } from '../../Common/SwitchCases/ViewerBox'
import styles from './PageBlock.module.scss'

export function PageBlock({ block, mode }: BlockBaseWithBlockProps<TPage>) {
  const navigate = useNavigate()
  const { setActiveBlockId } = useBlockAction()
  return (
    <div className={styles.container}>
      <aside className={classNames(mode === 'edit' && 'cover')} />
      <div className={styles.contentCover}>
        <div className={styles.cover}>
          <img className={styles.img} src={'/page_icon.png'} alt="page block icon" />
          <div className={styles.contentBox}>
            <h3>{block.title}</h3>
            <p>{block.description}</p>
          </div>
        </div>
      </div>
      <button
        type="button"
        className={styles.footer}
        onClick={() => {
          setActiveBlockId('')
          navigate(`/space/${block.objectId}`)
        }}
      >
        <div className={styles.footerLeft}>바로가기</div>
        <div className={styles.footerright} />
      </button>
    </div>
  )
}
