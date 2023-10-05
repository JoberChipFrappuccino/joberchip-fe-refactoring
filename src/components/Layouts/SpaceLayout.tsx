import { Header } from '@/components/Menus/Header'
import { useUserStore } from '@/store/user'
import { Layout as AntdLayout } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import styles from './Layout.module.scss'

const { Content } = AntdLayout

export default function SpaceLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const { isSignedIn, getUserInfo } = useUserStore()

  useEffect(() => {
    if (!isSignedIn) getUserInfo()
  }, [location.pathname, isSignedIn])

  const collapsedChange = (e: boolean) => {
    setCollapsed(e)
  }

  return (
    // * HMR을 위해 div로 감싸줍니다.
    <div>
      <div id="portal" />
      <ToastContainer />
      <AntdLayout className={styles.layout}>
        <Content>
          <Header collapsedChange={collapsedChange} collapsed={collapsed} />
          <Outlet />
        </Content>
      </AntdLayout>
    </div>
  )
}
