import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import { useSharePageModeStore } from '@/store/sharePage'
import ProfileDropDownMenu from './ProfileDropDownMenu'
import ProfileEditMode from './ProfileEditMode'
import styles from './ProfileSwitchCase.module.scss'
import ProfileViewMode from './ProfileViewMode'

export default function ProfileSwitchCase() {
  const { mode } = useSharePageModeStore()
  const { sharePage } = useSharePageQuery()
  return (
    <div className={styles.container}>
      <div className={styles.profile}>{switchProfileWithMode(mode)}</div>
      {sharePage.privilege === 'EDIT' && <ProfileDropDownMenu />}
    </div>
  )
}

function switchProfileWithMode(mode: string) {
  switch (mode) {
    case 'VIEW':
      return <ProfileViewMode />
    case 'EDIT':
      return <ProfileEditMode />
    default:
      if (process.env.NODE_ENV === 'development') throw new Error("ProfileSwitchCase: mode is not 'VIEW' or 'EDIT'")
      return null
  }
}
