import { ACCESS_TOKEN, BACK_MOCK_ACCESS_TOKEN } from '@/constants'
import { useUserStore } from '@/store/user'
import { toast } from '@/utils/toast'
import { useNavigate } from 'react-router-dom'
import styles from './SignIn.module.scss'

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn, isFetching } = useUserStore()

  const loginById = async (id: '1' | '2' | '3') => {
    if (isFetching) return
    const userData = {
      username: '',
      password: ''
    }
    if (id === '1') {
      userData.username = 'test1@google.com'
      userData.password = '1234'
    }
    if (id === '2') {
      userData.username = 'test2@google.com'
      userData.password = '1234'
    }
    // ! 3번 ID 유저는 없습니다. 에러 확인용 입니다.
    if (id === '3') {
      userData.username = 'test3@google.com'
      userData.password = '1234'
    }
    const res = await signIn(userData)

    // * 임시로 mock Token을 추가합니다.
    const mock1Token =
      id === '1'
        ? process.env.BACK_MOCK_TOKEN_1
        : id === '2'
        ? process.env.BACK_MOCK_TOKEN_2
        : process.env.BACK_MOCK_TOKEN_3
    localStorage.setItem(BACK_MOCK_ACCESS_TOKEN, mock1Token ?? '')
    // * 로그인 API 구현 전 까지 아래 토큰으로 대체합니다.
    const frontMockToken = process.env.FRONT_MOCK_TOKEN_1
    localStorage.setItem(ACCESS_TOKEN, frontMockToken ?? '')

    if (res.status === 'success') {
      toast(res.message)
      navigate('/')
      return
    }
    toast(res.message, 'failure')
  }

  return (
    <div>
      <h1>SignIn</h1>
      <div>
        <button className={styles.signInBtn} type="button" onClick={() => loginById('1')}>
          test1 유저로 로그인
        </button>
      </div>
      <div>
        <button className={styles.signInBtn} type="button" onClick={() => loginById('2')}>
          test2 유저로 로그인
        </button>
      </div>
      <div>
        <button className={styles.signInBtn} type="button" onClick={() => loginById('3')}>
          test3 유저로 로그인
        </button>
      </div>
    </div>
  )
}
