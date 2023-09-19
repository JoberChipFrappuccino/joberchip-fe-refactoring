import { Header } from '@/components/Menus/Header'
import { SideNavBar } from '@/components/Menus/SideNavBar'
import { SpaceListBar } from '@/components/Menus/SpaceListBar'
import { Layout as AntdLayout } from 'antd'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.scss'

const { Content } = AntdLayout

export default function SpaceLayout() {
  const [collapsed, setCollapsed] = useState(false)

  const collapsedChange = (e: boolean) => {
    setCollapsed(e)
  }

  return (
    // * HMR을 위해 div로 감싸줍니다.
    <div>
      <div id="portal" />
      <AntdLayout style={{ background: '#fff' }}>
        <SpaceListBar />
        <AntdLayout>
          <Header collapsedChange={collapsedChange} collapsed={collapsed} />
          <AntdLayout className={styles.layout}>
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
