import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>HOME PAGE</h1>
      <div>
        <Link to="/space/space1">user1의 스페이스로 이동하기</Link>
      </div>
      <div>
        <Link to="/space/space2">user2의 스페이스로 이동하기</Link>
      </div>
    </div>
  )
}
