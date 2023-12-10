import { loadUserInfoAPI } from '@/apis/user'
import { to } from '@/utils'
import { useSuspenseQuery } from './queries/useSuspenseQuery'
import { useServerSideProps } from './serverSideProps'

/**
 * 사용자 정보를 조회할 떈 api가 throw를 던지지 않습니다.
 * 비동기 상태 플래그를 통해 로딩 상태를 관리해야합니다.
 * 그 이유는 다음과 같습니다.
 * 1. renderToString이 Suspense를 지원하지 않음
 * 2. 한 페이지에서 회원, 비회원을 모두 처리
 */
export const useUser = () => {
  const { isServerSide } = useServerSideProps()
  const { data, isLoading } = useSuspenseQuery(['user'], () => to(loadUserInfoAPI()), {
    enabled: !isServerSide
  })
  const user = data.data
  return { user, isSuccess: data.status !== 'failure', isLoading }
}
