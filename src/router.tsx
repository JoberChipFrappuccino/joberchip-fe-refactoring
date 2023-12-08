import loadable from '@loadable/component'
import { useEffect, useState } from 'react'
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom'
import { loadUserInfoAPI } from './apis/user'

import { to } from './utils'

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
        <Route path="/" element={<Space />} />
        <Route element={<RedirectRouter />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="/space/:pageId" element={<SharePage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

/**
 * @description renderToString이 Suspense를 지원하지 않기 때문에 Effect 내에서 redirect처리 합니다.
 */
function RedirectRouter() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    to(loadUserInfoAPI()).then((res) => {
      if (res.data) navigate('/')
      else setIsLoading(false)
    })
  }, [])

  if (isLoading) return <div>로그인 여부 확인 중...</div>
  return <Outlet />
}

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
