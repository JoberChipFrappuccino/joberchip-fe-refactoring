import { createSpaceAPI } from '@/api/space'
import { SPACE_LIST } from '@/constants/queryKeyConstant'
import { useSpaceList } from '@/hooks/spaceList'
import { useUserStore } from '@/store/user'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import styles from './UserProfile.module.scss'

export function UserProfile() {
  const { user, signOut } = useUserStore()
  const { data } = useSpaceList(user.userId)
  const queryClient = useQueryClient()

  const handleOnClickCreateSpace = () => {
    createSpaceAPI()
      .then(({ message }) => {
        alert(message)
        queryClient.refetchQueries([SPACE_LIST])
      })
      .catch(({ message }) => {
        alert(message)
      })
  }

  /**
   * @description myPersonalSpace는 사용자의 최상위 공유 페이지 정보로 유저마다 단 하나만 존재합니다.
   */
  const myPersonalSpace = data?.find((space) => space.participationType === 'DEFAULT')

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <h1>{user?.username}</h1>
        <p>자버칩 소속</p>
      </div>
      <div className={styles.buttonCover}>
        <button
          className={styles.mySpaceBtn}
          type="button"
          onClick={() => {
            signOut()
            window.location.reload()
          }}
        >
          임시 로그아웃 버튼
        </button>
        <Link to="/space/space1" className={styles.mySpaceBtn}>
          내 스페이스 바로가기 (프론트 서버 API를 호출)
        </Link>
        <Link to={`/temp/space/${myPersonalSpace?.mainPageId}` ?? '/'} className={styles.mySpaceBtn}>
          내 스페이스 바로가기 (백엔드 서버 API를 호출)
        </Link>
        <button type="button" className={styles.addSpaceBtn} onClick={handleOnClickCreateSpace}>
          <img src="/add_circle.png" alt="add circle icon" />
          <span>스페이스 추가하기</span>
        </button>
      </div>
    </div>
  )
}
