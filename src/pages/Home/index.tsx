import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>HOME PAGE</h1>
      <Link to="/space">space 이동하기</Link>
    </div>
  )
}
