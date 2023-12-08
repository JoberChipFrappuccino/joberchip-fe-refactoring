import { ErrorBoundary } from 'react-error-boundary'
import { useSharePageModeStore } from '@/store/sharePage'
import ProfileDropDownMenu from './ProfileDropDownMenu'
import ProfileEditMode from './ProfileEditMode'
import styles from './ProfileSwitchCase.module.scss'
import ProfileViewMode from './ProfileViewMode'

export default function ProfileSwitchCase() {
  const { mode } = useSharePageModeStore()

  return (
    <div className={styles.container}>
      <div className={styles.profile}>{switchProfileWithMode(mode)}</div>
      {mode === 'EDIT' && <ProfileDropDownMenu />}
    </div>
  )
}

function NullComponent() {
  return null
}

function switchProfileWithMode(mode: string) {
  switch (mode) {
    case 'VIEW':
      return <ProfileViewMode />
    case 'EDIT':
      return (
        <ErrorBoundary fallback={<NullComponent />}>
          <ProfileEditMode />
        </ErrorBoundary>
      )
    default:
      if (process.env.NODE_ENV === 'development') throw new Error("ProfileSwitchCase: mode is not 'VIEW' or 'EDIT'")
      return null
  }
}
