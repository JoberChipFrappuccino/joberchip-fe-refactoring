import axios from 'axios'

// * 404, 500 번대 등 에러는 errorBoundary에서 처리합니다.
// * 그 외 에러는 message를 return 리턴합니다. (브라우저에서 에러 메시지를 띄웁니다.)
export const errorController = async (error: unknown) => {
  if (!axios.isAxiosError(error)) return Promise.reject(error)
  // refresh token 관련 에러 생기면 요기서 처리합니다.
  return Promise.reject(error)
}
