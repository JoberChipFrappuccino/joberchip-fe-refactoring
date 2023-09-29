import { type BlockType } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import { Tooltip } from 'antd'
import { useCallback } from 'react'
import styles from './SpaceActionBar.module.scss'

type Props = {
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

  let additionalClassName = isActive ? styles.visible : styles.hidden
  if (mode === 'view') additionalClassName = styles.hidden

  const baseURL =
    process.env.NODE_ENV === 'production' ? 'http://ec2-34-228-10-85.compute-1.amazonaws.com' : 'http://localhost:5173/'
  return (
    <div className={[styles.container, additionalClassName].join(' ')}>
      <Tooltip title="페이지 생성하기">
        <button
          className={styles.item}
          onClick={() => {
            changeBlockType('PAGE')
          }}
        >
          <div className={styles.actionicon}>
            <img src={`${baseURL}/page_icon.svg`} alt="page action bar icon" />
          </div>
        </button>
      </Tooltip>
      <Tooltip title="템플릿 생성하기">
        <button
          className={styles.item}
          onClick={() => {
            changeBlockType('TEMPLATE')
          }}
        >
          <div className={styles.actionicon}>
            <img src={`${baseURL}/templat_icon.svg`} alt="page action bar icon" />
          </div>
        </button>
      </Tooltip>
      <Tooltip title="블럭 생성하기">
        <button
          className={styles.item}
          onClick={() => {
            changeBlockType('TEXT')
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
