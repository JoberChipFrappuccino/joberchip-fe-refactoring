import { useUserStore } from '@/store/user'
import { useEffect, useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn, isFetching, getUserInfo } = useUserStore()

  useEffect(() => {
    if (isSignedIn) {
      if (location.pathname === '/signup' || location.pathname === '/signin') {
        navigate('/')
      }
    }

    if (!isSignedIn) {
      getUserInfo().then((res) => {
        if (!res) {
          if (location.pathname !== '/signup') {
            navigate('/signin')
          }
        }
      })
    }
  }, [location.pathname])

  return (
    <div>
      <div className="m-4">
        <Link className="m-2" to="/">
          Home
        </Link>
        <Link className="m-2" to="/detail">
          Detail
        </Link>
      </div>
      {isFetching && <div> loading... </div>}
      <Outlet />
    </div>
  )
}
