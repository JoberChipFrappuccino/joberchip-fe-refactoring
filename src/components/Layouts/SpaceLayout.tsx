import { Header } from '@/components/Menus/Header'
import { useUserStore } from '@/store/user'
import { Layout as AntdLayout } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import styles from './Layout.module.scss'

const { Content } = AntdLayout

export default function SpaceLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const { signIn } = useUserStore()

  const collapsedChange = (e: boolean) => {
    setCollapsed(e)
  }

  // * 로그인 임시 유지 기능
  useEffect(() => {
    // 무조건 1번 유저로 로그인됩니다.
    signIn({
      email: 'test1@google.com',
      password: '1234'
    })
  }, [])

  return (
    // * HMR을 위해 div로 감싸줍니다.
    <div>
      <div id="portal" />
      <AntdLayout className={styles.layout} style={{ background: '#fff', height: '100%' }}>
        <Content>
          <Header collapsedChange={collapsedChange} collapsed={collapsed} />
          <Outlet />
        </Content>
      </AntdLayout>
    </div>
  )
}
