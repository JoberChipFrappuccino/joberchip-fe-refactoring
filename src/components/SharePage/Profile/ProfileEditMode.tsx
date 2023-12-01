import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import MockFoolowList from './MockFoolowList'
import MockMessageList from './MockMessageList'
import ProfileDropDownMenu from './ProfileDropDownMenu'
import styles from './ProfileEditMode.module.scss'
import { ProfileForm } from './ProfileForm'
import { ProfileImageForm } from './ProfileImageForm'
interface ProfileEditModeProps {
  rootPage: boolean
}
export default function ProfileEditMode({ rootPage }: ProfileEditModeProps) {
  const { sharePage } = useSharePageQuery()
  return (
    <>
      <div className={styles.container}>
        <div className={styles.profileImageCover}>
          <ProfileImageForm />
        </div>
        <div className={styles.profileCover}>
          <ProfileForm />
          {rootPage && <MockFoolowList />}
          <nav className={styles.navCover}>
            <a href="/">
              스페이스 홈 바로가기
              <MdKeyboardArrowRight />
            </a>
          </nav>
        </div>
        {sharePage.privilege === 'EDIT' && <ProfileDropDownMenu />}
      </div>
      {rootPage && <MockMessageList />}
    </>
  )
}
