import loadable, { loadableReady } from '@loadable/component'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.scss'
import '@/styles/reset.scss'
import '@/styles/toast.scss'
import '@/styles/antd.scss'
// * Layouts
const Layout = loadable(() => import('./components/Common/layouts/Layout'))
const SharePageLayout = loadable(() => import('./components/Common/layouts/SharePageLayout'))
// * Pages
const Space = loadable(() => import('./pages/Space'))
const SignUp = loadable(() => import('./pages/SignUp'))
const SignIn = loadable(() => import('./pages/SignIn'))
const TestSignIn = loadable(() => import('./pages/TestSignIn'))
const SharePage = loadable(() => import('./pages/Share'))
const NotFound = loadable(() => import('./pages/NotFound'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Space /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/test/signin', element: <TestSignIn /> },
      { path: '/signin', element: <SignIn /> }
    ]
  },
  {
    path: '/',
    element: <SharePageLayout />,
    children: [{ path: '/space/:pageId', element: <SharePage /> }]
  },
  { path: '*', element: <NotFound /> }
])

void loadableReady(() => {
  hydrateRoot(
    document.getElementById('root') as HTMLDivElement,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
})

// https://webpack.kr/api/hot-module-replacement/
if (module.hot) {
  if (process.env.NODE_ENV === 'development') {
    module.hot.accept()
    document.querySelector('#root > *')?.remove()
  }
}
