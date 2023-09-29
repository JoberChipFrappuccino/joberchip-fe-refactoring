import loadable from '@loadable/component'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
// import TempSharePageLayout from './components/Layouts/TempSharePageLayout'
// import TempSharePage from './pages/Temp/Space'
const NotFound = loadable(() => import('./pages/NotFound'))
const Layout = loadable(() => import('./components/Layouts/Layout'))
const SharePageLayout = loadable(() => import('./components/Layouts/SpaceLayout'))
const Home = loadable(() => import('./pages/Home'))
const SharePage = loadable(() => import('./pages/SharePage'))
const Detail = loadable(() => import('./pages/Detail'))
const SignUp = loadable(() => import('./pages/SignUp'))
const SignIn = loadable(() => import('./pages/SignIn'))
const TempSharePageLayout = loadable(() => import('./components/Layouts/TempSharePageLayout'))
const TempSharePage = loadable(() => import('./pages/TempSharePage'))

export default function App() {
  return (
    <Routes>
      <Route path="/temp" element={<TempSharePageLayout />}>
        <Route path="/temp/space/:spaceId" element={<TempSharePage />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/detail" element={<Detail />} />
      </Route>
      <Route path="/" element={<SharePageLayout />}>
        <Route path="/space/:spaceId" element={<SharePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
