import { create } from 'zustand'
import { getUserInfoAPI, signInAPI } from '@/api/user'
import { BACK_MOCK_ACCESS_TOKEN } from '@/constants'
import { type User } from '@/models/user'
import { to } from '@/utils/api'

type LoginForm = {
  username: string
  password: string
}

type LoginResponse = {
  status: 'success' | 'failure'
  message: string
}

interface UserState {
  user: User
  isFetching: boolean
  isSignedIn: boolean
  signIn: (user: LoginForm) => Promise<LoginResponse>
  getUserInfo: () => Promise<boolean>
  signOut: VoidFunction
}
// TODO : Zustand 타입 정의 필요
// @ts-expect-error
export const useUserStore = create<UserState>((set) => {
  const store = {
    user: {},
    isFetching: false,
    isSignedIn: false,
    signIn: async (form: LoginForm) => {
      set((state) => ({ ...state, isFetching: true, isSignedIn: false }))
      const { data, ...res } = await to(signInAPI(form))
      // * Token이 있다면 localStorage에 저장합니다.
      // * 사용자 정보가 있지 않기 떄문에 ISignedIn은 false로 둡니다.
      if (data?.accessToken) {
        localStorage.setItem(BACK_MOCK_ACCESS_TOKEN, data.accessToken)
      } else {
        set((state) => ({ ...state, isFetching: false, isSignedIn: false }))
        localStorage.removeItem(BACK_MOCK_ACCESS_TOKEN)
      }
      return res
    },
    getUserInfo: async () => {
      if (!localStorage.getItem(BACK_MOCK_ACCESS_TOKEN)) return false
      set((state) => ({ ...state, isFetching: true, isSignedIn: false }))
      const { data: user } = await to(getUserInfoAPI())
      if (!user) {
        set((state) => ({ ...state, isFetching: false, isSignedIn: false }))
        localStorage.removeItem(BACK_MOCK_ACCESS_TOKEN)
        return false
      }
      set((state) => ({ ...state, user, isFetching: false, isSignedIn: true }))
      return true
    },
    signOut: () => {
      localStorage.removeItem(BACK_MOCK_ACCESS_TOKEN)
      set((state) => {
        const user: User = {
          userId: '',
          username: '',
          nickname: '',
          profileImg: '',
          accessToken: ''
        }
        return { ...state, user, isSignedIn: false }
      })
    }
  }
  return store
})
