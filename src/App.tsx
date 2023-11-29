import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './App.module.scss'

// import '@/styles/reset.scss'
import '@/styles/toast.scss'
import '@/styles/antd.scss'
import './index.scss'

export default function App() {
  return (
    <div>
      <div id="portal" />
      <Layout>
        <Layout.Content className={styles.layout}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </div>
  )
}
