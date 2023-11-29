import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { createSpaceAPI } from '@/apis/space'
import { SPACE_LIST } from '@/constants/queryKeyConstant'
import { toast } from '@/utils/toast'
import { useSpaceList } from '@/hooks/spaceList'
import { useUser } from '@/hooks/user'
import styles from './UserProfile.module.scss'

export function UserProfile() {
  const { user, signOut } = useUser()
  const { data } = useSpaceList(user.userId)
  const queryClient = useQueryClient()

  const handleOnClickCreateSpace = () => {
    createSpaceAPI()
      .then((res) => {
        toast(res.message, res.status, { autoClose: 500 })
        // TODO : invalidate query, refetch query 등 정리
        queryClient.refetchQueries([SPACE_LIST])
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') console.error(err)
        toast(err.message, 'failure', { autoClose: 500 })
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
          로그아웃
        </button>
        <Link to={`/space/${myPersonalSpace?.mainPageId}` ?? '/'} className={styles.mySpaceBtn}>
          내 스페이스 바로가기
        </Link>
        <button type="button" className={styles.addSpaceBtn} onClick={handleOnClickCreateSpace}>
          <img src="/add_circle.png" alt="add circle icon" />
          <span>스페이스 추가하기</span>
        </button>
      </div>
    </div>
  )
}
