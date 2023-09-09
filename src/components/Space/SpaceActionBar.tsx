import { useSpaceModeStore } from '@/store/spaceMode'
import styles from './SpaceActionBar.module.scss'
import { FormType, useDrawerFormType } from '@/store/formMode'

export function SpaceActionBar() {
  const { mode } = useSpaceModeStore()
  const { setOpenDrawer, setFormType } = useDrawerFormType()

  const changeFormType = (type: FormType) => {
    setFormType(type)
    setOpenDrawer(true)
  }

  return (
    <div className={[styles.container, `${mode === 'view' ? styles.hidden : styles.visible}`].join(' ')}>
      <button className={styles.item} onClick={() => changeFormType('page')}>
        Page
      </button>
      <button className={styles.item} onClick={() => changeFormType('template')}>
        Template
      </button>
      <button className={styles.item} onClick={() => changeFormType('block')}>
        Block
      </button>
    </div>
  )
}
