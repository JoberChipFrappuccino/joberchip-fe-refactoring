import { ACCESS_TOKEN, BACK_MOCK_ACCESS_TOKEN } from '@/constants'
import { useUserStore } from '@/store/user'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()
  const { signIn, isFetching } = useUserStore()

  const loginById = async (id: '1' | '2' | '3') => {
    if (isFetching) return
    const userData = {
      email: '',
      password: ''
    }
    if (id === '1') {
      userData.email = 'test1@google.com'
      userData.password = '1234'
    }
    if (id === '2') {
      userData.email = 'test2@google.com'
      userData.password = '1234'
    }
    // ! 3번 ID 유저는 없습니다. 에러 확인용 입니다.
    if (id === '3') {
      userData.email = 'test3@google.com'
      userData.password = '1234'
    }
    const res = await signIn(userData)

    // * 임시로 mock Token을 추가합니다.
    const mock1Token =
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyUm9sZXMiOiJST0xFX1VTRVIiLCJleHAiOjE2OTczNDE4ODQsInVzZXJJZCI6MSwidXNlcm5hbWUiOiJtb2NrMSJ9.EboJRpNYzMn_PjFQoKrkwe08ZvgAUwCATOVLbwF2nHv9OlUU-trD8BKE3EVRglgW3-K3ktMnkjDgh1mGUA0zsA'
    localStorage.setItem(BACK_MOCK_ACCESS_TOKEN, mock1Token)
    // * 로그인 API 구현 전 까지 아래 토큰으로 대체합니다.
    const frontMockToken = 'token-example:test1@google.com'
    localStorage.setItem(ACCESS_TOKEN, frontMockToken)

    if (res.status === 'success') {
      alert(res.message)
      navigate('/')
      return
    }
    alert(res.message)
  }

  return (
    <div>
      <h1>SignIn</h1>
      <div>
        <button
          onClick={async () => {
            await loginById('1')
          }}
        >
          test1 유저로 로그인
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            await loginById('2')
          }}
        >
          test2 유저로 로그인
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            await loginById('3')
          }}
        >
          test3 유저로 로그인 (에러)
        </button>
      </div>
    </div>
  )
}
