import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight'
import MockFoolowList from './MockFoolowList'
import MockMessageList from './MockMessageList'
import styles from './ProfileEditMode.module.scss'
import { ProfileForm } from './ProfileForm'
import { ProfileImageForm } from './ProfileImageForm'
interface ProfileEditModeProps {
  rootPage: boolean
}
export default function ProfileEditMode({ rootPage }: ProfileEditModeProps) {
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
      </div>
      {rootPage && <MockMessageList />}
    </>
  )
}
