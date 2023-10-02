import { Header } from '@/components/Menus/Header'
import { useUserStore } from '@/store/user'
import { Layout as AntdLayout } from 'antd'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styles from './Layout.module.scss'

const { Content } = AntdLayout

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn, getUserInfo } = useUserStore()

  useEffect(() => {
    if (isSignedIn) {
      navigate('/')
      return
    }

    if (!isSignedIn) {
      getUserInfo().then((isSuccess) => {
        !isSuccess && navigate('/signin')
      })
    }
  }, [location.pathname, isSignedIn])

  return (
    // * HMR을 위해 div로 감싸줍니다.
    <div>
      <div id="portal" />
      <AntdLayout className={styles.layout} style={{ background: '#fff', height: '100%' }}>
        <Content>
          <Header />
          <Outlet />
        </Content>
      </AntdLayout>
    </div>
  )
}
