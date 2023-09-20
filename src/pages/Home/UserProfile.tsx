import { useUserStore } from '@/store/user'

export function UserProfile() {
  const { user } = useUserStore()
  return (
    <div>
      <h1>{user?.username}</h1>
      <p>자버칩 소속</p>
      <button>내 스페이스 바로가기</button>
      <button>내 스페이스 추가하기</button>
    </div>
  )
}
