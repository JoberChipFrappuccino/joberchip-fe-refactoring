import { GroupSpace } from '@/components/Home/GroupSpace'
import { GroupSpaceItem } from '@/components/Home/GroupSpaceItem'
import { Search } from '@/components/Home/Search'
import { UserProfile } from '@/components/Home/UserProfile'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <Search />
        <UserProfile />
        <GroupSpace>
          <GroupSpaceItem text="user 2의 개인 스페이스" link="/space/space2" />
          <GroupSpaceItem
            style={{ borderBottom: '1px solid grey', borderTop: '1px solid grey' }}
            text="user 3의 개인 스페이스"
            link="/space/space3"
          />
          <GroupSpaceItem text="user 4의 개인 스페이스" link="/space/space4" />
        </GroupSpace>
      </div>
    </div>
  )
}
