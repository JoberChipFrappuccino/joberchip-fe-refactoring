import { useUserStore } from '@/store/user'
import styles from './UserProfile.module.scss'
export function UserProfile() {
  const { user } = useUserStore()
  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <h1>{user?.username}</h1>
        <p>자버칩 소속</p>
      </div>
      <div className={styles.buttonCover}>
        <a href="/space/space1" className={styles.mySpaceBtn}>
          내 스페이스 바로가기
        </a>
        <button className={styles.addSpaceBtn}>내 스페이스 추가하기</button>
      </div>
    </div>
  )
}
