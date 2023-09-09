import loadable from '@loadable/component'
import './App.css'
import { Route, Routes } from 'react-router-dom'
const NotFound = loadable(() => import('./pages/NotFound'))
const Layout = loadable(() => import('./components/Layouts/Layout'))
const SharePage = loadable(() => import('./pages/SharePage'))
const Detail = loadable(() => import('./pages/Detail'))
const SignUp = loadable(() => import('./pages/SignUp'))
const SignIn = loadable(() => import('./pages/SignIn'))

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* todo : edit 페이지 변경 */}
        <Route path="/" element={<SharePage />}></Route>
        {/* todo : /root 페이지 변경, 외부 로그인, 공개 페이지 처리시 이쪽 라우터로 이동 */}
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  )
}
