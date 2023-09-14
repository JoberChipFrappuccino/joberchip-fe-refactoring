import { useDrawerFormType, type FormType } from '@/store/formMode'
import { useSpaceModeStore } from '@/store/spaceMode'
import { useCallback } from 'react'
import styles from './SpaceActionBar.module.scss'

type Props = {
  isActive: boolean
}
export function SpaceActionBar({ isActive }: Props) {
  const { mode } = useSpaceModeStore()
  const { setOpenDrawer, setFormType } = useDrawerFormType()

  const changeFormType = useCallback((type: FormType) => {
    setFormType(type)
    setOpenDrawer(true)
  }, [])

  let additionalClassName = isActive ? styles.visible : styles.hidden
  if (mode === 'view') additionalClassName = styles.hidden

  return (
    <div className={[styles.container, additionalClassName].join(' ')}>
      <button
        className={styles.item}
        onClick={() => {
          changeFormType('page')
        }}
      >
        Page
      </button>
      <button
        className={styles.item}
        onClick={() => {
          changeFormType('template')
        }}
      >
        Template
      </button>
      <button
        className={styles.item}
        onClick={() => {
          changeFormType('block')
        }}
      >
        Block
      </button>
    </div>
  )
}
