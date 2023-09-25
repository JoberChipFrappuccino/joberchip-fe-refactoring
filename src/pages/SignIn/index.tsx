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
      userData.email = 'mock1'
      userData.password = '1234'
    }
    if (id === '2') {
      userData.email = '정태욱'
      userData.password = '1234'
    }
    // ! 3번 ID 유저는 없습니다. 에러 확인용 입니다.
    if (id === '3') {
      userData.email = 'test1@google.com'
      userData.password = '1234'
    }
    const res = await signIn(userData)
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
          mock1 유저로 로그인
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            await loginById('2')
          }}
        >
          정태욱 유저로 로그인
        </button>
      </div>
      <div>
        <button
          onClick={async () => {
            await loginById('3')
          }}
        >
          front mock user로 로그인
        </button>
      </div>
    </div>
  )
}
