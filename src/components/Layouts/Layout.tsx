import { Header } from '@/components/Menus/Header'
import { SideNavBar } from '@/components/Menus/SideNavBar'
import { SpaceListBar } from '@/components/Menus/SpaceListBar'
import { useUserStore } from '@/store/user'
import { Layout as AntdLayout } from 'antd'
import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Content } = AntdLayout

export default function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isSignedIn, isFetching, getUserInfo } = useUserStore()

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
    <div>
      <div id="portal" />
      <div className="m-4">
        <Link className="m-2" to="/">
          Home
        </Link>
        <Link className="m-2" to="/detail">
          Detail
        </Link>
      </div>
      {isFetching && <div> loading... </div>}
      <AntdLayout>
        <SpaceListBar />
        <AntdLayout>
          <Header collapsedChange={collapsedChange} collapsed={collapsed} />
          <AntdLayout>
            <SideNavBar collapsed={collapsed} />
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280
              }}
            >
              <Outlet />
            </Content>
          </AntdLayout>
        </AntdLayout>
      </AntdLayout>
    </div>
  )
}
