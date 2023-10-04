import loadable from '@loadable/component'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
const NotFound = loadable(() => import('./pages/NotFound'))
const Layout = loadable(() => import('./components/Layouts/Layout'))
const SharePageLayout = loadable(() => import('./components/Layouts/SpaceLayout'))
const Space = loadable(() => import('./pages/Space'))
const SharePage = loadable(() => import('./pages/SharePage'))
const SignUp = loadable(() => import('./pages/SignUp'))
const SignIn = loadable(() => import('./pages/SignIn'))
const TempSharePageLayout = loadable(() => import('./components/Layouts/TempSharePageLayout'))
const TempSharePage = loadable(() => import('./pages/TempSharePage'))

export default function App() {
  return (
    <Routes>
      <Route path="/temp" element={<TempSharePageLayout />}>
        <Route path="/temp/space/:pageId" element={<TempSharePage />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Space />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>
      <Route path="/" element={<SharePageLayout />}>
        <Route path="/space/:pageId" element={<SharePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
