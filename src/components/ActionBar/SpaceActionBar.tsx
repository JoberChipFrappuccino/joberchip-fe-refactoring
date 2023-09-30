import { PAGE, TEMPLATE, TEXT } from '@/constants/blockTypeConstant'
import { type BlockType } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import { Tooltip } from 'antd'
import classNames from 'classnames'
import { useCallback } from 'react'
import styles from './SpaceActionBar.module.scss'

interface Props {
  isActive: boolean
}
export function SpaceActionBar({ isActive }: Props) {
  const { mode } = useSharePageStore()
  const { formType, setOpenDrawer, setBlockType, setDrawerMode } = useBlockAction()

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
          [styles.visible]: isActive || mode === 'view',
          [styles.hidden]: !isActive
        }
      ])}
    >
      <Tooltip title="페이지 추가하기">
        <button
          className={styles.item}
          onClick={() => {
            changeBlockType(PAGE)
          }}
        >
          <div className={styles.actionicon}>
            <img src={`${baseURL}/page_icon.svg`} alt="page action bar icon" />
          </div>
        </button>
      </Tooltip>
      <Tooltip title="템플릿 추가하기">
        <button
          className={styles.item}
          onClick={() => {
            changeBlockType(TEMPLATE)
          }}
        >
          <div className={styles.actionicon}>
            <img src={`${baseURL}/templat_icon.svg`} alt="page action bar icon" />
          </div>
        </button>
      </Tooltip>
      <Tooltip title="블럭 추가하기">
        <button
          className={styles.item}
          onClick={() => {
            changeBlockType(TEXT)
          }}
        >
          <div className={styles.actionicon}>
            <img src={`${baseURL}/block_icon.svg`} alt="page action bar icon" />
          </div>
        </button>
      </Tooltip>
    </div>
  )
}
