import loadable from '@loadable/component'
import { Route, Routes, Outlet, Navigate } from 'react-router-dom'

import { useUser } from './hooks/useUserQuery'

const App = loadable(() => import('./App'))
const Space = loadable(() => import('./pages/Space'))
const SignUp = loadable(() => import('./pages/SignUp'))
const SignIn = loadable(() => import('./pages/SignIn'))
const SharePage = loadable(() => import('./pages/Share'))
const NotFound = loadable(() => import('./pages/NotFound'))

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route element={<RedirectToSignIn />}>
          <Route path="/" element={<Space />} />
        </Route>
        <Route element={<RedirectToSpace />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />R
        </Route>
        <Route path="/space/:pageId" element={<SharePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

function RedirectToSpace() {
  const { isSuccess, isLoading } = useUser()
  if (isLoading) return <div>로그인 여부 확인 중...</div>
  if (isSuccess) return <Navigate to="/" />
  return <Outlet />
}

function RedirectToSignIn() {
  const { isSuccess, isLoading } = useUser()
  if (isLoading) return <div>로그인 여부 확인 중...</div>
  if (!isSuccess) return <Navigate to="/signIn" />
  return <Outlet />
}

/**
 * @deprecated renderToString이 Suspense를 지원하지 않기 때문에 createBrowserRouter와 loader를 사용할 수 없습니다.
 */
// export const routes: RouteObject[] = [
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: '/',
//         element: <Space />
//       },
//       {
//         path: '/signin',
//         element: <SignIn />,
//         loader: signInLoader
//       },
//       {
//         path: '/signup',
//         element: <SignUp />,
//         loader: signUpLoader
//       },
//       {
//         path: '/space/:pageId',
//         element: <SharePage />
//       }
//     ]
//   }
// ]
// async function signInLoader() {
//   if (typeof window === 'undefined') return null
//   const { data } = await loadUserInfoAPI()
//   if (data) return redirect('/')
//   return null
// }
// async function signUpLoader() {
//   if (typeof window === 'undefined') return null
//   const { data } = await loadUserInfoAPI()
//   if (data) return redirect('/')
//   return null
// }
