import { HiOutlinePlus } from 'react-icons/hi2'
import styles from './MainBlockInfo.module.scss'

const icons = [
  { title: '페이지', url: '/page_white_icon.svg' },
  { title: '템플릿', url: '/templat_white_icon.svg' },
  { title: '블록', url: '/block_white_icon.svg' }
]

export default function MainBlockInfo() {
  return (
    <div className={styles.mainbg}>
      <div className={styles.blockcontainer}>
        <div className={styles.blockinfobox}>
          <div className={styles.plus}>
            <HiOutlinePlus />
          </div>
          <div className={styles.iconbox}>
            {icons.map((e) => (
              <div key={e.title}>
                <div className={styles.iconsvg}>
                  <img src={e.url} />
                </div>
                <div className={styles.itemtitle}>{e.title}</div>
              </div>
            ))}
          </div>
          <div className={styles.footertitle}>하단 디자인탭에서 추가해보세요</div>
        </div>
      </div>
    </div>
  )
}
