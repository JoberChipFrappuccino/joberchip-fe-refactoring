import { type User } from '@/models/user'
import { type ResponseBase } from '@/utils/api'
import { api, backAuthAPI } from './api'

/**
 * @description 로그인 API
 * @see https://www.notion.so/c70dfd1d2d56400b9f937386c0927639
 */
export const signInAPI = async ({ username, password }: ReqeustUserData): Promise<ResponseBase<SignInAPIResponse>> => {
  const { headers } = await api('/v1/user/login', {
    method: 'POST',
    data: { username, password }
  })
  return {
    data: {
      accessToken: headers.authorization,
      username
    },
    status: 'success',
    message: '로그인을 성공했습니다.'
  }
}
type ReqeustUserData = {
  username: string
  password: string
}
interface SignInAPIResponse {
  accessToken: string
  username: string
}

/**
 * @description 회원가입 API
 * @see https://www.notion.so/a4392cf887be42d8be8c404fb0d76d58
 */
export const signUpAPI = async ({ username, password }: ReqeustUserData): Promise<ResponseBase<User>> => {
  const { data } = await api<User>('/v1/user/join', {
    method: 'POST',
    data: { username, password }
  })
  return {
    data,
    status: 'success',
    message: '회원가입이 완료되었습니다.'
  }
}
interface loadUserInfoAPIResponse {
  response: User
  status: number
  success: boolean
}
/**
 * @description 유저 정보 조회 API
 * @see https://www.notion.so/Back-End-987b88625bae4cae90cf32fee45534b4
 */
export const loadUserInfoAPI = async (): Promise<ResponseBase<User>> => {
  const { data } = await backAuthAPI<loadUserInfoAPIResponse>('/v1/user/profile', {
    method: 'GET'
  })

  return {
    data: data.response,
    status: 'success',
    message: '사용자 정보 조회에 성공했습니다.'
  }
}
