import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/user'
import { useSpaceList } from './spaceList'

export const useUser = (redirectPath: string = '/signin') => {
  const { isSignedIn, loadUserInfo, signIn, signOut, user } = useUserStore()

  // * 사용자 정보를 조회하면 자주 사용되는 userId에 종속적인 hook입니다. 편의상 내부에 있지만 외부로 빼도 상관없습니다.
  const { spaceList } = useSpaceList(user.userId)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleSignOut = useCallback(() => {
    signOut()
    navigate('/signin')
  }, [])

  useEffect(() => {
    if (isSignedIn) return
    loadUserInfo() //
      .then((isSuccess) => {
        if (isSuccess) return
        navigate(redirectPath)
      })
  }, [pathname, isSignedIn])

  return { user, spaceList, signIn, signOut: handleSignOut, isSignedIn }
}
