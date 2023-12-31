import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'
import { Switch } from 'antd'
import classNames from 'classnames'
import { useMemo } from 'react'
import { DropDownMenu } from '@/components/SharePage/DropDownMenu'
import { useBlockActionStore } from '@/store/blockAction'
import styles from './BlockActionBar.module.scss'

/**
 * @deprecated 기획에서 제거된 컴포넌트입니다. 추후 추가될 수 있습니다.
 */
export function BlockActionBar() {
  const { activeBlockId } = useBlockActionStore()

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
      }
    ],
    [activeBlockId]
  )

  return (
    <div
      className={classNames(styles.container, [
        {
          [styles.visible]: !activeBlockId,
          [styles.hidden]: !!activeBlockId
        }
      ])}
    >
      <button className={styles.item}>1X1</button>
      <button className={styles.item}>1X2</button>
      <button className={styles.item}>2X2</button>
      <aside>
        <DropDownMenu items={items}>
          <div className={styles.iconCover}>
            <BsThreeDotsVertical className={styles.icon} />
          </div>
        </DropDownMenu>
      </aside>
    </div>
  )
}
