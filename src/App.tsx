import loadable from '@loadable/component'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
import '@/styles/reset.scss'
import '@/styles/toast.scss'
import '@/styles/antd.scss'

// * Layouts
const Layout = loadable(() => import('./components/Layouts/Layout'))
const SharePageLayout = loadable(() => import('./components/Layouts/TempSharePageLayout'))

// * Pages
const Space = loadable(() => import('./pages/Space'))
const SignUp = loadable(() => import('./pages/SignUp'))
const SignIn = loadable(() => import('./pages/SignIn'))
const TestSignIn = loadable(() => import('./pages/TestSignIn'))
const SharePage = loadable(() => import('./pages/TempSharePage'))
const NotFound = loadable(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Space />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/test/signin" element={<TestSignIn />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route path="/" element={<SharePageLayout />}>
        <Route path="/space/:pageId" element={<SharePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
