import { Layout as AntdLayout } from 'antd'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Header } from '@/components/SharePage/Menus/Header'
import { useUserStore } from '@/store/user'
import styles from './Layout.module.scss'

const { Content } = AntdLayout

export default function SpaceLayout() {
  const location = useLocation()
  const { isSignedIn, getUserInfo } = useUserStore()

  useEffect(() => {
    if (!isSignedIn) getUserInfo()
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
