import { Header } from '@/components/Menus/Header'
import { useUserStore } from '@/store/user'
import { Layout as AntdLayout } from 'antd'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import styles from './Layout.module.scss'

const { Content } = AntdLayout

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn, getUserInfo } = useUserStore()

  useEffect(() => {
    if (isSignedIn) {
      return navigate('/')
    }

    getUserInfo().then((isSuccess) => {
      if (isSuccess) return navigate('/')
      if (location.pathname === '/' || location.pathname.includes('space')) navigate('/signin')
    })
  }, [location.pathname, isSignedIn])

  return (
    // * HMR을 위해 div로 감싸줍니다.
    <div>
      <div id="portal" />
      <ToastContainer />
      <AntdLayout className={styles.layout}>
        <Content>
          <Header />
          <Outlet />
        </Content>
      </AntdLayout>
    </div>
  )
}
