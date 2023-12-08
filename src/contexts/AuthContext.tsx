import type { Dispatch, PropsWithChildren } from 'react'
import { createContext, useMemo } from 'react'
import { BACK_MOCK_ACCESS_TOKEN } from '@/constants'
import usePersistedState from '../hooks/usePersistedState'

interface AuthContextValue {
  accessToken: string | null
  setAccessToken: Dispatch<string | null>
  identity: {
    header: string | null
    payload: string | null
    signature: string | null
  }
}

const AuthContext = createContext<AuthContextValue | null>(null)

/**
 * @deprecated 소셜 로그인 기능이 없기 떄문에 사용하지 않습니다.
 */
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [accessToken, setAccessToken] = usePersistedState(BACK_MOCK_ACCESS_TOKEN)

  const identity = useMemo(() => {
    localStorage.setItem(BACK_MOCK_ACCESS_TOKEN, accessToken ?? '')
    const [header, payload, signature] = (accessToken ?? '').split('.')
    return { header, payload, signature }
  }, [accessToken])

  const contextValue = useMemo(
    () => ({ accessToken, setAccessToken, identity }),
    [accessToken, setAccessToken, identity]
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export default AuthContext
