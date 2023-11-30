import { Tooltip } from 'antd'
import classNames from 'classnames'
import { useCallback } from 'react'
import { PAGE, TEMPLATE, TEXT } from '@/constants/blockTypeConstant'
import { type BlockType } from '@/models/space'
import { useBlockActionStore } from '@/store/blockAction'
import { useSharePageMode } from '@/hooks/useSharePageMode'
import styles from './SpaceActionBar.module.scss'
export interface ActionBarProps {
  isActive: boolean
}
export function SpaceActionBar({ isActive }: ActionBarProps) {
  const { mode } = useSharePageMode()
  const { formType, setOpenDrawer, setBlockType, setDrawerMode } = useBlockActionStore()

  const changeBlockType = useCallback(
    (type: BlockType) => {
      setDrawerMode('create')
      setBlockType(type)
      setOpenDrawer(true)
    },
    [formType]
  )

  const baseURL =
    process.env.NODE_ENV === 'production' ? process.env.FRONT_SERVER_BASE_URL : `http://localhost:${process.env.PORT}`

  return (
    <div
      className={classNames(styles.container, [
        {
          [styles.visible]: isActive || mode === 'VIEW',
          [styles.hidden]: !isActive
        }
      ])}
    >
      <Tooltip title="페이지 추가하기">
        <button className={styles.item} type="button" onClick={() => changeBlockType(PAGE)}>
          <div className={styles.actionicon}>
            <img src={`${baseURL}/page_icon.svg`} alt="page action bar icon" />
          </div>
        </button>
      </Tooltip>
      <Tooltip title="템플릿 추가하기">
        <button className={styles.item} type="button" onClick={() => changeBlockType(TEMPLATE)}>
          <div className={styles.actionicon}>
            <img src={`${baseURL}/templat_icon.svg`} alt="page action bar icon" />
          </div>
        </button>
      </Tooltip>
      <Tooltip title="블럭 추가하기">
        <button className={styles.item} type="button" onClick={() => changeBlockType(TEXT)}>
          <div className={styles.actionicon}>
            <img src={`${baseURL}/block_icon.svg`} alt="page action bar icon" />
          </div>
        </button>
      </Tooltip>
    </div>
  )
}
