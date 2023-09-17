import { useDrawerFormType, type FormType } from '@/store/formMode'
import { useSpaceModeStore } from '@/store/spaceMode'
import { useCallback } from 'react'
import styles from './SpaceActionBar.module.scss'

type Props = {
  isActive: boolean
}
export function SpaceActionBar({ isActive }: Props) {
  const { mode } = useSpaceModeStore()
  const { formType, setOpenDrawer, setFormType, setMode } = useDrawerFormType()

  const changeFormType = useCallback(
    (type: FormType) => {
      setMode('create')
      setFormType(type)
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
      <button
        className={styles.item}
        onClick={() => {
          changeFormType('page')
        }}
      >
        <img src={`${baseURL}/page_action_bar_icon.png`} alt="page action bar icon" />
      </button>
      <button
        className={styles.item}
        onClick={() => {
          changeFormType('template')
        }}
      >
        <img src={`${baseURL}/template_action_bar_icon.png`} alt="page action bar icon" />
      </button>
      <button
        className={styles.item}
        onClick={() => {
          changeFormType('block')
        }}
      >
        <img src={`${baseURL}/block_action_bar_icon.png`} alt="page action bar icon" />
      </button>
    </div>
  )
}
