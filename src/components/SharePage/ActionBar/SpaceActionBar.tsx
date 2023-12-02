import { Tooltip } from 'antd'
import classNames from 'classnames'
import { useCallback } from 'react'
import { PAGE, TEMPLATE, TEXT } from '@/constants/blockTypeConstant'
import { type BlockType } from '@/models/space'
import { useBlockActionStore } from '@/store/blockAction'
import styles from './SpaceActionBar.module.scss'

export function SpaceActionBar() {
  const { activeBlockId, formType, setOpenDrawer, setBlockType, setDrawerMode } = useBlockActionStore()

  const changeBlockType = useCallback(
    (type: BlockType) => {
      setDrawerMode('CREATE')
      setBlockType(type)
      setOpenDrawer(true)
    },
    [formType]
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
      <Tooltip title="페이지 추가하기">
        <button className={styles.item} type="button" onClick={() => changeBlockType(PAGE)}>
          <div className={styles.actionicon}>
            <img src={'/page_icon.svg'} alt="page action bar icon" />
          </div>
        </button>
      </Tooltip>
      <Tooltip title="템플릿 추가하기">
        <button className={styles.item} type="button" onClick={() => changeBlockType(TEMPLATE)}>
          <div className={styles.actionicon}>
            <img src={'/templat_icon.svg'} alt="page action bar icon" />
          </div>
        </button>
      </Tooltip>
      <Tooltip title="블럭 추가하기">
        <button className={styles.item} type="button" onClick={() => changeBlockType(TEXT)}>
          <div className={styles.actionicon}>
            <img src={'/block_icon.svg'} alt="page action bar icon" />
          </div>
        </button>
      </Tooltip>
    </div>
  )
}
