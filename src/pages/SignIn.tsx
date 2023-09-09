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
    if (res.status === 'success') {
      alert(res.message)
      return navigate('/')
    }
    alert(res.message)
  }

  return (
    <div>
      <h1>SignIn</h1>
      <div>
        <button onClick={() => loginById('1')}>1번 유저로 로그인</button>
      </div>
      <div>
        <button onClick={() => loginById('2')}>2번 유저로 로그인</button>
      </div>
      <div>
        <button onClick={() => loginById('3')}>3번 유저로 로그인</button>
      </div>
    </div>
  )
}
