import ProfileEditMode from './ProfileEditMode'
import ProfileViewMode from './ProfileViewMode'

interface ProfileSwitchCaseProps {
  rootPage: boolean
  mode: SharePageMode
}
export default function ProfileSwitchCase({ rootPage, mode }: ProfileSwitchCaseProps) {
  if (rootPage && mode === 'VIEW') return <ProfileViewMode />
  else if (rootPage && mode === 'EDIT') return <ProfileEditMode rootPage={rootPage} />
  else if (mode === 'VIEW') return <ProfileViewMode />
  else if (mode === 'EDIT') return <ProfileEditMode rootPage={rootPage} />

  if (process.env.NODE_ENV === 'development') throw new Error("ProfileSwitchCase: mode is not 'VIEW' or 'EDIT'")
  return null
}
