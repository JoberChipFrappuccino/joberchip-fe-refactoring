import axios from 'axios'

export type APIResponseStatus = 'success' | 'failure'

export interface ResponseBase<T> {
  status: string
  message: string
  data?: T
}
/**
 * @description 성공, 실패 여부 메시지를 포함한 API 응답을 반환합니다.
 */
export async function to<T>(promise: Promise<ResponseBase<T>> | ResponseBase<T>): Promise<ResponseBase<T>> {
  try {
    return await promise
  } catch (error) {
    if (process.env.NODE_ENV === 'development') console.error(error)
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message ??
        error.response?.data.error.message ??
        '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
      return {
        status: 'failure',
        message
      }
    }
    return {
      status: 'failure',
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
    }
  }
}

export function JSONToForm<T>(body: T) {
  type TKey = keyof T
  const form = new FormData()
  for (const key in body) {
    const value = body[key as TKey]
    if (typeof value === 'string') {
      form.append(key, value)
    } else if (value instanceof Blob) {
      form.append(key, value, 'image.png')
    } else {
      form.append(key, String(value))
    }
  }
  return form
}

export function getAccessToken(key: string) {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(key)
}
export function setAccessToken(key: string, value: string | null) {
  if (typeof window === 'undefined' || value === null) return
  localStorage.setItem(key, value)
}
export function resetAccessToken(key: string) {
  if (typeof window === 'undefined') return
  localStorage.removeItem(key)
}
