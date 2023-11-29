import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/user'

export const useUser = () => {
  const { isSignedIn, getUserInfo, isFetching, signIn, signOut, user } = useUserStore()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut()
    navigate('/signin')
  }

  useEffect(() => {
    if (isSignedIn) return
    getUserInfo() //
      .then((isSuccess) => {
        if (!isSuccess && !pathname.includes('/sign')) navigate('/signin')
      })
  }, [pathname, isSignedIn])

  return { isSignedIn, isFetching, signIn, signOut: handleSignOut, user, getUserInfo }
}
