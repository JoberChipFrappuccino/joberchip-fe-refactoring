import { DropDownMenu } from '@/components/Space/DropDownMenu'
import { useActiveBlock } from '@/store/activeBlock'
import { Switch } from 'antd'
import { useMemo } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import styles from './BlockActionBar.module.scss'

type Props = {
  isActive: boolean
}
export function BlockActionBar({ isActive }: Props) {
  const { activeBlockId } = useActiveBlock()
  const additionalClassName = isActive ? styles.visible : styles.hidden

  const items = useMemo(
    () => [
      {
        key: `${activeBlockId}-view-block-1`,
        label: <Switch onChange={() => {}} />,
        icon: <p>공개 설정</p>
      },
      {
        key: `${activeBlockId}-view-block-2`,
        icon: <button>페이지 정보 수정</button>
      },
      {
        key: `${activeBlockId}-view-block-3`,
        danger: true,
        label: '삭제하기'
        // icon: <RemoveBlockBtn/>
      }
    ],
    [activeBlockId]
  )

  return (
    <div className={[styles.container, additionalClassName].join(' ')}>
      <button className={styles.item}>1X1</button>
      <button className={styles.item}>1X2</button>
      <button className={styles.item}>2X2</button>
      <aside className={styles.menu}>
        <DropDownMenu items={items}>
          <div className={styles.iconCover}>
            <BsThreeDotsVertical className={styles.icon} />
          </div>
        </DropDownMenu>
      </aside>
    </div>
  )
}
