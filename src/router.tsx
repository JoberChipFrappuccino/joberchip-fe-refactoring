import loadable from '@loadable/component'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

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
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/space/:pageId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SharePage />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
