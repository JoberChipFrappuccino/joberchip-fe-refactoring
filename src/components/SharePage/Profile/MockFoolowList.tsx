import styles from './MockFollowList.module.scss'
export default function MockFoolowList() {
  return (
    <ul className={styles.container}>
      <li>
        <span>팔로워</span>
        <span>0</span>
      </li>
      <li>
        <span>팔로잉</span>
        <span>0</span>
      </li>
    </ul>
  )
}
