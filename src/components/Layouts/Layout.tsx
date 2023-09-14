import { Header } from '@/components/Menus/Header'
import { SideNavBar } from '@/components/Menus/SideNavBar'
import { SpaceListBar } from '@/components/Menus/SpaceListBar'
import { useUserStore } from '@/store/user'
import { Layout as AntdLayout } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Content } = AntdLayout

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn, getUserInfo } = useUserStore()

  const [collapsed, setCollapsed] = useState(false)

  const collapsedChange = (e: boolean) => {
    setCollapsed(e)
  }

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
    // * HMR을 위해 div로 감싸줍니다.
    <div>
      <div id="portal" />
      <AntdLayout>
        <SpaceListBar />
        <AntdLayout>
          <Header collapsedChange={collapsedChange} collapsed={collapsed} />
          <AntdLayout style={{ background: '#fff' }}>
            <SideNavBar collapsed={collapsed} />
            <Content>
              <Outlet />
            </Content>
          </AntdLayout>
        </AntdLayout>
      </AntdLayout>
    </div>
  )
}
