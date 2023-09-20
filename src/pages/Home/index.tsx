import { Search } from '@/components/Home/Search'
import { Link } from 'react-router-dom'
import styles from './Home.module.scss'
import { UserProfile } from './UserProfile'

export default function Home() {
  return (
    <div className={styles.container}>
      <Search />
      <UserProfile />
      <div>
        <Link to="/space/space1">user1의 스페이스로 이동하기</Link>
      </div>
      <div>
        <Link to="/space/space2">user2의 스페이스로 이동하기</Link>
      </div>
    </div>
  )
}
