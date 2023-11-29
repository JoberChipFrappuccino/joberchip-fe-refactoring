import { Layout as AntdLayout } from 'antd'

import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { Header } from '@/components/SharePage/Menus/Header'
import styles from './Layout.module.scss'
// HACK : webpack이 node_modules안에있는 css파일 해석하지 못하는 에러가 있어서 임시로 css파일을 카피해서 사용중입니다.
import '@/styles/reactGridLayout.scss'

const { Content } = AntdLayout

export default function TempSpaceLayout() {
  return (
    // * HMR을 위해 div로 감싸줍니다.
    <div>
      <div id="portal" />
      <ToastContainer />
      <AntdLayout className={styles.layout} style={{ background: '#fff', height: '100%' }}>
        <Content>
          <Header />
          <Outlet />
        </Content>
      </AntdLayout>
    </div>
  )
}
