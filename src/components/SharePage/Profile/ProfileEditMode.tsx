import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight'
import { Link, useParams } from 'react-router-dom'
import { useSpaceListQuery } from '@/hooks/queries/useSpaceListQuery'
import MockFollowList from './MockFollowList'
import MockMessageList from './MockMessageList'
import styles from './ProfileEditMode.module.scss'
import { ProfileForm } from './ProfileForm'
import { ProfileImageForm } from './ProfileImageForm'

export default function ProfileEditMode() {
  const { pageId } = useParams()
  const { spaceList } = useSpaceListQuery()
  const rootPage = spaceList?.find((page) => page.mainPageId === pageId)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profileImageCover}>
          <ProfileImageForm />
        </div>
        <div className={styles.profileCover}>
          <ProfileForm />
          {rootPage && <MockFollowList />}
          <nav className={styles.navCover}>
            <Link to="/">
              스페이스 홈 바로가기
              <MdKeyboardArrowRight />
            </Link>
          </nav>
        </div>
      </div>
      {rootPage && <MockMessageList />}
    </>
  )
}
