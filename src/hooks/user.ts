import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/user'

export const useUser = (loadUserInforErrorCb?: VoidFunction) => {
  const { isSignedIn, loadUserInfo, isFetching, signIn, signOut, user } = useUserStore()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const handleSignOut = () => {
    signOut()
    navigate('/signin')
  }

  useEffect(() => {
    if (isSignedIn) return
    loadUserInfo() //
      .then((isSuccess) => {
        if (isSuccess) return
        typeof loadUserInforErrorCb !== 'undefined' && loadUserInforErrorCb()
      })
  }, [pathname, isSignedIn])

  return { isSignedIn, isFetching, signIn, signOut: handleSignOut, user, loadUserInfo }
}
