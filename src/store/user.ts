import { ACCESS_TOKEN } from '@/constants'
import { User } from '@/models/user'
import { create } from 'zustand'
import { getUserInfoAPI, signInAPI } from '@/api/user'

type LoginForm = {
  email: string
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
// @ts-ignore ㅎ ㅏ 최선인가..
export const useUserStore = create<UserState>((set) => {
  const store = {
    user: {},
    isFetching: false,
    isSignedIn: false,
    signIn: async (user: User) => {
      set((state) => ({ ...state, isFetching: true, isSignedIn: false }))
      const { data, ...res } = await signInAPI(user)
      if (data) {
        set((state) => ({ ...state, user: data, isFetching: false, isSignedIn: true }))

        localStorage.setItem(ACCESS_TOKEN, data.access_token)
      } else {
        set((state) => ({ ...state, isFetching: false, isSignedIn: false }))
        localStorage.removeItem(ACCESS_TOKEN)
      }
      return res
    },
    getUserInfo: async () => {
      set((state) => ({ ...state, isFetching: true, isSignedIn: false }))
      const user = await getUserInfoAPI()
      if (!user) {
        set((state) => ({ ...state, isFetching: false, isSignedIn: false }))
        localStorage.removeItem(ACCESS_TOKEN)
        return false
      }
      set((state) => ({ ...state, user, isFetching: false, isSignedIn: true }))
      return true
    },
    signOut: () => {
      // todo : logout API있다면 호출합니다.
      set((state) => ({ ...state, isFetching: false, isSignedIn: false }))
      localStorage.removeItem(ACCESS_TOKEN)
    },
    auth: async () => {}
  }
  return store
})
