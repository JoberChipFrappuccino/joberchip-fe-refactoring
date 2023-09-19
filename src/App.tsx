import loadable from '@loadable/component'
import { Route, Routes } from 'react-router-dom'
import './App.scss'
const NotFound = loadable(async () => await import('./pages/NotFound'))
const Layout = loadable(async () => await import('./components/Layouts/Layout'))
const Home = loadable(async () => await import('./pages/Home'))
const SharePage = loadable(async () => await import('./pages/Space'))
const Detail = loadable(async () => await import('./pages/Detail'))
const SignUp = loadable(async () => await import('./pages/SignUp'))
const SignIn = loadable(async () => await import('./pages/SignIn'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Route>

      <Route path="/" element={<Layout />}>
        {/* todo : edit 페이지 변경 */}
        <Route path="/space/:spaceId" element={<SharePage />} />
        {/* todo : /root 페이지 변경, 외부 로그인, 공개 페이지 처리시 이쪽 라우터로 이동 */}
        <Route path="/detail" element={<Detail />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
