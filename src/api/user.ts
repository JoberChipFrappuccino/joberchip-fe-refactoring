import { type User } from '@/models/user'
import axios from 'axios'
import { authAPI } from './api'

type LoginResponse = {
  status: 'success' | 'failure'
  message: string
  data?: User
}

type ReqeustUserData = {
  username: string
  password: string
}

export const signInAPI = async (user: ReqeustUserData): Promise<LoginResponse> => {
  try {
    const { data } = await authAPI<User>('/v1/login', {
      method: 'POST',
      data: JSON.stringify(user)
    })
    return {
      data,
      status: 'success',
      message: '로그인에 성공했습니다.'
    }
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      return {
        status: 'failure',
        message: error.response?.data.message
      }
    }
    return {
      status: 'failure',
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
    }
  }
}

export const getUserInfoAPI = async (): Promise<User | null> => {
  try {
    const { data } = await authAPI<User>('/api/auth', {
      method: 'GET'
    })
    return data
  } catch (err) {
    return null
  }
}
