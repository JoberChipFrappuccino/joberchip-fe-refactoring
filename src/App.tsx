import { Layout } from 'antd'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import styles from './App.module.scss'
import { NotFoundErrorBoundary } from './components/Common/Errors/NotFoundErrorBoundary'

// import '@/styles/reset.scss'
import '@/styles/toast.scss'
import '@/styles/antd.scss'
import './index.scss'

export default function App() {
  return (
    <div>
      <div id="portal" />
      <ToastContainer />
      <Layout>
        <Layout.Content className={styles.layout}>
          <NotFoundErrorBoundary>
            <Suspense>
              <Outlet />
            </Suspense>
          </NotFoundErrorBoundary>
        </Layout.Content>
      </Layout>
    </div>
  )
}
