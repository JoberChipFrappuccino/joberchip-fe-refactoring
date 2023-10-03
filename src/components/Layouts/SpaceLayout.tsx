import { Header } from '@/components/Menus/Header'
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
      <AntdLayout className={styles.layout}>
        <Content>
          <Header collapsedChange={collapsedChange} collapsed={collapsed} />
          <Outlet />
        </Content>
      </AntdLayout>
    </div>
  )
}
