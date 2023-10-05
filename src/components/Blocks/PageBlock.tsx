import { useBlockAction } from '@/store/blockAction'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { type BlockBaseWithBlockProps } from '../SwitchCase/ViewerBox'
import styles from './PageBlock.module.scss'

export function PageBlock({ block, mode }: BlockBaseWithBlockProps<TPage>) {
  const navigate = useNavigate()
  const { setActiveBlockId } = useBlockAction()
  return (
    <div className={styles.container}>
      <aside className={classNames(mode === 'edit' && 'cover')} />
      <div className={styles.contentCover}>
        <div className={styles.cover}>
          <img className={styles.img} src={'/template_icon_1.png'} alt="template icon" />
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

          navigate(`/temp/space/${block.objectId}`)
        }}
      >
        <div className={styles.footerLeft}>바로가기</div>
        <div className={styles.footerright} />
      </button>
    </div>
  )
}
