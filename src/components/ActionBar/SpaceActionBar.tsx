import { type BlockType } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useSpaceStore } from '@/store/space'
import { Tooltip } from 'antd'
import { useCallback } from 'react'
import styles from './SpaceActionBar.module.scss'

type Props = {
  isActive: boolean
}
export function SpaceActionBar({ isActive }: Props) {
  const { mode } = useSpaceStore()
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
            changeBlockType('page')
          }}
        >
          <img src={`${baseURL}/page_action_bar_icon.png`} alt="page action bar icon" />
        </button>
      </Tooltip>
      <Tooltip title="템플릿 생성하기">
        <button
          className={styles.item}
          onClick={() => {
            changeBlockType('template')
          }}
        >
          <img src={`${baseURL}/template_action_bar_icon.png`} alt="page action bar icon" />
        </button>
      </Tooltip>
      <Tooltip title="블럭 생성하기">
        <button
          className={styles.item}
          onClick={() => {
            changeBlockType('text')
          }}
        >
          <img src={`${baseURL}/block_action_bar_icon.png`} alt="page action bar icon" />
        </button>
      </Tooltip>
    </div>
  )
}
