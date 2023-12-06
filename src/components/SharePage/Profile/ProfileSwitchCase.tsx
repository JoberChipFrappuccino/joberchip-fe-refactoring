import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import { useSharePageModeStore } from '@/store/sharePage'
import ProfileDropDownMenu from './ProfileDropDownMenu'
import ProfileEditMode from './ProfileEditMode'
import styles from './ProfileSwitchCase.module.scss'
import ProfileViewMode from './ProfileViewMode'
interface ProfileSwitchCaseProps {
  rootPage: boolean
}
export default function ProfileSwitchCase({ rootPage }: ProfileSwitchCaseProps) {
  const { sharePage } = useSharePageQuery()
  const { mode } = useSharePageModeStore()

  return (
    <div className={styles.container}>
      <div className={styles.profile}>{switchProfileWithMode(mode, rootPage)}</div>
      {sharePage.privilege === 'EDIT' && <ProfileDropDownMenu />}
    </div>
  )
}

function switchProfileWithMode(mode: string, rootPage: boolean) {
  switch (mode) {
    case 'VIEW':
      return <ProfileViewMode />
    case 'EDIT':
      return <ProfileEditMode rootPage={rootPage} />
    default:
      if (process.env.NODE_ENV === 'development') throw new Error("ProfileSwitchCase: mode is not 'VIEW' or 'EDIT'")
      return null
  }
}
