import { Layout as AntdLayout } from 'antd'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Header } from '@/components/Common/Menus/Header'
import styles from './Layout.module.scss'

const { Content } = AntdLayout

export default function SpaceLayout() {
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
