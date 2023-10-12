import { ACCESS_TOKEN, BACK_MOCK_ACCESS_TOKEN } from '@/constants'
import { useUserStore } from '@/store/user'
import { useNavigate } from 'react-router-dom'
import styles from './SignIn.module.scss'

/**
 * @description 회원가입 없이 사용할 수 있도록 임시 로그인 기능을 제공하는 페이지입니다.
 */
export default function TestSignIn() {
  const navigate = useNavigate()
  const { getUserInfo, isFetching } = useUserStore()

  const loginById = async (id: '1' | '2' | '3' | '4' | '5') => {
    if (isFetching) return
    const userData = {
      username: '',
      password: ''
    }
    let backMockToken = process.env.BACK_MOCK_TOKEN_1
    let frontMockToken = process.env.FRONT_MOCK_TOKEN_1
    if (id === '1') {
      userData.username = 'test1@google.com'
      userData.password = '1234'
    } else if (id === '2') {
      userData.username = 'test2@google.com'
      userData.password = '1234'
      backMockToken = process.env.BACK_MOCK_TOKEN_2
      frontMockToken = process.env.FRONT_MOCK_TOKEN_2
    } else if (id === '3') {
      userData.username = 'test3@google.com'
      userData.password = '1234'
      backMockToken = process.env.BACK_MOCK_TOKEN_3
      frontMockToken = process.env.FRONT_MOCK_TOKEN_3
    } else if (id === '4') {
      userData.username = 'test4@google.com'
      userData.password = '1234'
      backMockToken = process.env.BACK_MOCK_TOKEN_4
      frontMockToken = process.env.FRONT_MOCK_TOKEN_4
    } else if (id === '5') {
      userData.username = 'test5@google.com'
      userData.password = '1234'
      backMockToken = process.env.BACK_MOCK_TOKEN_5
      frontMockToken = process.env.FRONT_MOCK_TOKEN_5
    }
    localStorage.setItem(BACK_MOCK_ACCESS_TOKEN, backMockToken ?? '')
    localStorage.setItem(ACCESS_TOKEN, frontMockToken ?? '')
    getUserInfo().then(() => navigate('/'))
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
      <div>
        <button className={styles.signInBtn} type="button" onClick={() => loginById('4')}>
          test4 유저로 로그인
        </button>
      </div>
      <div>
        <button className={styles.signInBtn} type="button" onClick={() => loginById('5')}>
          test5 유저로 로그인
        </button>
      </div>
    </div>
  )
}
