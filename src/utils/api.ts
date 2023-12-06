import axios from 'axios'

export type APIResponseStatus = 'success' | 'failure'

export interface ResponseBase<T> {
  status: APIResponseStatus
  message: string
  data: T | null
}
/**
 * @description 성공, 실패 여부 메시지를 포함한 API 응답을 반환합니다.
 */
export async function to<T>(promise: Promise<ResponseBase<T>>): Promise<ResponseBase<T>> {
  try {
    return await promise
  } catch (error) {
    console.error(error)
    if (axios.isAxiosError(error)) {
      console.error(error)
      const message =
        error.response?.data.message ??
        error.response?.data.error.message ??
        '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
      return {
        status: 'failure',
        message,
        data: null
      }
    }
    return {
      status: 'failure',
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
      data: null
    }
  }
}
