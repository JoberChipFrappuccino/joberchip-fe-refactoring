import { type User } from '@/models/user'
import { type ResponseBase } from '@/utils/api'
import { authAPI, backAuthAPI } from './api'

type ReqeustUserData = {
  username: string
  password: string
}

/**
 * @description 로그인 API
 * @see https://www.notion.so/c70dfd1d2d56400b9f937386c0927639
 */
export const signInAPI = async ({ username, password }: ReqeustUserData): Promise<ResponseBase<User>> => {
  const { data } = await backAuthAPI<User>('/v1/user/login', {
    method: 'POST',
    data: { username, password }
  })
  return {
    data,
    status: 'success',
    message: '로그인을 성공했습니다.'
  }
}

/**
 * @description 회원가입 API
 * @see https://www.notion.so/a4392cf887be42d8be8c404fb0d76d58
 */
export const signUpAPI = async ({ username, password }: ReqeustUserData): Promise<ResponseBase<User>> => {
  const { data } = await backAuthAPI<User>('/v1/user/join', {
    method: 'POST',
    data: { username, password }
  })
  return {
    data,
    status: 'success',
    message: '회원가입이 완료되었습니다.'
  }
}

// https://www.notion.so/Back-End-987b88625bae4cae90cf32fee45534b4
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
